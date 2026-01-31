import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BlogPost, PostStatus, UserRole } from "@/types/database.types";
import { useCreateBlogPost, useUpdateBlogPost } from "@/hooks/useBlogMutations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { useEffect, useState, useRef, type ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StorageService } from "@/services/storage.service";

// Extended Schema for RBAC
const blogSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    content: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    author: z.string().optional(), // Display Name Override (optional)
    tags: z.string().min(1, "At least one tag is required"),
    read_time: z.string().optional(),
    image_url: z.string().optional(), // Cover image URL
    status: z.enum(['draft', 'pending_review', 'published', 'rejected'] as const),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
    initialData?: BlogPost;
    onSuccess: () => void;
}

export function BlogForm({ initialData, onSuccess }: BlogFormProps) {
    const createPost = useCreateBlogPost();
    const updatePost = useUpdateBlogPost();
    const [currentUser, setCurrentUser] = useState<{ id: string; role: UserRole; display_name: string | null } | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string>(initialData?.image_url || '');
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const coverInputRef = useRef<HTMLInputElement>(null);

    // Fetch current user details
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('users')
                    .select('id, role, display_name')
                    .eq('id', user.id)
                    .single();

                // Explicit casting to handle potential Partial or unknown inference
                const profile = data as { id: string; role: string; display_name: string | null } | null;

                if (profile) {
                    setCurrentUser({
                        id: profile.id,
                        role: (profile.role as UserRole) || 'writer',
                        display_name: profile.display_name
                    });
                }
            }
        };
        fetchUser();
    }, []);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
            date: new Date().toISOString().split('T')[0],
            author: "", // Will be placeholder or override
            tags: "",
            read_time: "",
            image_url: "",
            status: "draft",
        },
    });

    // Populate form with initial data
    useEffect(() => {
        if (initialData) {
            setCoverImageUrl(initialData.image_url || '');
            form.reset({
                title: initialData.title,
                content: initialData.content || "",
                date: initialData.date,
                author: initialData.author || "",
                tags: initialData.tags ? initialData.tags.join(', ') : "",
                read_time: initialData.read_time || "",
                image_url: initialData.image_url || "",
                status: initialData.status,
            });
        }
    }, [initialData, form]);

    const isSubmitting = createPost.isPending || updatePost.isPending;
    const isGhostWriter = currentUser?.role === 'ghost_writer';
    const canPublish = ['owner', 'admin', 'editor', 'writer', 'team'].includes(currentUser?.role || '');

    const onSubmit = async (data: BlogFormValues) => {
        if (!currentUser) return;

        try {
            // Auto-generate excerpt
            const excerpt = data.content
                ? data.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                : '';

            const tagsArray = data.tags
                .split(',')
                .map(t => t.trim())
                .filter(t => t.length > 0)
                .slice(0, 5);

            // Logic: 
            // - If Ghost Writer: Force status to 'pending_review' unless saving as 'draft'
            // - If Others: Respect selected status
            // - Author ID is always current user ID
            // - Author Display Name: Use override if typed, else user's display_name, else 'Unknown'

            let finalStatus: PostStatus = data.status;
            if (isGhostWriter && data.status === 'published') {
                finalStatus = 'pending_review';
            }

            const authorDisplayName = data.author || currentUser.display_name || 'WednesDev Team';

            // Auto-calculate read time (approx 200 words per minute)
            const wordCount = (data.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
            const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
            const calculatedReadTime = `${readTimeMinutes} min read`;

            // Auto-extract first image from content if no cover image set
            let finalImageUrl = coverImageUrl;
            if (!finalImageUrl && data.content) {
                // Try HTML img tag first
                const imgTagMatch = data.content.match(/<img[^>]+src=["']([^"']+)["']/);
                if (imgTagMatch && imgTagMatch[1]) {
                    finalImageUrl = imgTagMatch[1];
                } else {
                    // Try JSON format (Tiptap stores as JSON sometimes)
                    const jsonSrcMatch = data.content.match(/"src"\s*:\s*"([^"]+)"/);
                    if (jsonSrcMatch && jsonSrcMatch[1]) {
                        finalImageUrl = jsonSrcMatch[1];
                    }
                }
                console.log('Auto-extracted image URL:', finalImageUrl);
            }

            // Debug log
            console.log('Saving post with image_url:', finalImageUrl);
            console.log('Content preview:', data.content?.substring(0, 200));

            // Generate slug from title
            const generateSlug = (title: string): string => {
                return title
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '') // Remove special characters
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/-+/g, '-') // Replace multiple hyphens with single
                    .trim();
            };

            const slug = initialData?.slug || generateSlug(data.title);

            const submitData = {
                title: data.title,
                slug,
                content: data.content || null,
                date: data.date,
                author_id: currentUser.id,
                author: authorDisplayName, // Display Name
                read_time: calculatedReadTime,
                excerpt,
                image_url: finalImageUrl || '', // Ensure it's not undefined
                tags: tagsArray,
                status: finalStatus,
                reviewed_by: initialData?.reviewed_by || null,
                reviewed_at: initialData?.reviewed_at || null,
                rejection_reason: initialData?.rejection_reason || null,
                published_at: finalStatus === 'published' ? (initialData?.published_at || new Date().toISOString()) : null,
            };

            if (initialData) {
                await updatePost.mutateAsync({ id: initialData.id, updates: submitData });
            } else {
                await createPost.mutateAsync(submitData);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit blog post", error);
        }
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        try {
            const result = await StorageService.upload(file, 'blog-images');
            return result.url;
        } catch (error: any) {
            console.error("Upload error:", error);
            throw new Error(error.message || "Upload failed");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Post Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Cover Image Upload */}
                <div className="space-y-2">
                    <FormLabel>Cover Image</FormLabel>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            ref={coverInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                try {
                                    setIsUploadingCover(true);
                                    const result = await StorageService.upload(file, 'cover-images');
                                    setCoverImageUrl(result.url);
                                } catch (error) {
                                    console.error("Cover upload failed:", error);
                                } finally {
                                    setIsUploadingCover(false);
                                    if (coverInputRef.current) coverInputRef.current.value = "";
                                }
                            }}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => coverInputRef.current?.click()}
                            disabled={isUploadingCover}
                        >
                            {isUploadingCover ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                "Upload Cover Image"
                            )}
                        </Button>
                        {coverImageUrl && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setCoverImageUrl('')}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                    {coverImageUrl && (
                        <div className="mt-2 relative rounded-lg overflow-hidden border border-border aspect-video max-w-xs">
                            <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <FormDescription>This image appears as the blog post thumbnail.</FormDescription>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags (Max 5)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tech, Design, AI (Comma separated)" {...field} />
                                </FormControl>
                                <FormDescription>Separate tags with commas.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Author Display Name Override */}
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Author Name
                                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                                        (Default: {currentUser?.display_name || 'Your Profile Name'})
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Override display name (optional)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Read Time is now auto-calculated */}
                </div>

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <MarkdownEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                    onImageUpload={handleImageUpload}
                                    placeholder="Write your blog post... Use the image button to add images."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Status Selection */}
                <div className="bg-muted/30 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium mb-3">Publication Status</h3>
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex gap-4">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="draft"
                                                checked={field.value === 'draft'}
                                                onChange={() => field.onChange('draft')}
                                                className="accent-primary"
                                            />
                                            <span className="text-sm">Save as Draft</span>
                                        </label>

                                        {/* Logic: Ghost Writers show "Submit for Review", Others show "Publish Now" */}
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="published" // Maps to 'pending_review' for GW in onSubmit
                                                checked={field.value === 'published' || field.value === 'pending_review'}
                                                onChange={() => field.onChange('published')}
                                                className="accent-primary"
                                            />
                                            <span className="text-sm font-medium text-primary">
                                                {isGhostWriter ? 'Submit for Review' : 'Publish Now'}
                                            </span>
                                        </label>
                                    </div>
                                </FormControl>
                                <FormDescription className="mt-2 text-xs">
                                    {field.value === 'draft'
                                        ? "Post will be saved but not visible to the public."
                                        : isGhostWriter
                                            ? "Post will be sent to Editors for approval."
                                            : "Post will be live immediately."}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting || !currentUser}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Post" : "Create Post"}
                </Button>
            </form>
        </Form>
    );
}
