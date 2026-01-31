import { supabase } from "@/lib/supabase";

// Storage provider type
type StorageProvider = 'supabase' | 's3';

const STORAGE_PROVIDER = (import.meta.env.VITE_STORAGE_PROVIDER || 'supabase') as StorageProvider;
const S3_ENDPOINT = import.meta.env.VITE_S3_ENDPOINT;
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET || 'blog-content';
const S3_REGION = import.meta.env.VITE_S3_REGION || 'ap-southeast-1';
const S3_ACCESS_KEY = import.meta.env.VITE_S3_ACCESS_KEY;
const S3_SECRET_KEY = import.meta.env.VITE_S3_SECRET_KEY;

interface UploadResult {
    url: string;
    path: string;
}

/**
 * Storage Service - Supports both Supabase Storage and S3-compatible storage
 */
export const StorageService = {
    /**
     * Upload a file to the configured storage provider
     */
    async upload(file: File, folder: string = 'blog-images'): Promise<UploadResult> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

        if (STORAGE_PROVIDER === 's3') {
            return this.uploadToS3(file, fileName);
        }
        return this.uploadToSupabase(file, fileName);
    },

    /**
     * Upload to Supabase Storage
     */
    async uploadToSupabase(file: File, fileName: string): Promise<UploadResult> {
        const { error: uploadError } = await supabase.storage
            .from('blog-content')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            throw new Error(`Supabase upload failed: ${uploadError.message}`);
        }

        const { data } = supabase.storage
            .from('blog-content')
            .getPublicUrl(fileName);

        return {
            url: data.publicUrl,
            path: fileName
        };
    },

    /**
     * Upload to S3-compatible storage (AWS S3, LocalStack, MinIO, etc.)
     */
    async uploadToS3(file: File, fileName: string): Promise<UploadResult> {
        if (!S3_ENDPOINT || !S3_ACCESS_KEY || !S3_SECRET_KEY) {
            throw new Error('S3 configuration missing. Check VITE_S3_* environment variables.');
        }

        // Generate pre-signed URL or use direct upload
        // For simplicity, we'll use a direct PUT request with basic auth
        // In production, you'd want to use AWS SDK or generate presigned URLs from backend

        const url = `${S3_ENDPOINT}/${S3_BUCKET}/${fileName}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
                // Basic S3 auth headers (for LocalStack/development)
                // For production AWS, use proper AWS4 signing
                'x-amz-acl': 'public-read',
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error(`S3 upload failed: ${response.statusText}`);
        }

        // Construct public URL
        const publicUrl = `${S3_ENDPOINT}/${S3_BUCKET}/${fileName}`;

        return {
            url: publicUrl,
            path: fileName
        };
    },

    /**
     * Delete a file from storage
     */
    async delete(path: string): Promise<void> {
        if (STORAGE_PROVIDER === 's3') {
            return this.deleteFromS3(path);
        }
        return this.deleteFromSupabase(path);
    },

    async deleteFromSupabase(path: string): Promise<void> {
        const { error } = await supabase.storage
            .from('blog-content')
            .remove([path]);

        if (error) {
            throw new Error(`Supabase delete failed: ${error.message}`);
        }
    },

    async deleteFromS3(path: string): Promise<void> {
        if (!S3_ENDPOINT) {
            throw new Error('S3 endpoint not configured');
        }

        const url = `${S3_ENDPOINT}/${S3_BUCKET}/${path}`;
        const response = await fetch(url, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`S3 delete failed: ${response.statusText}`);
        }
    },

    /**
     * Get the current storage provider
     */
    getProvider(): StorageProvider {
        return STORAGE_PROVIDER;
    }
};
