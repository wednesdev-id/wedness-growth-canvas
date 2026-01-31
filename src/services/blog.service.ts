import { supabase } from "@/lib/supabase";
import { BlogPost } from "@/types/database.types";

export const BlogService = {
    getAll: async (): Promise<BlogPost[]> => {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data ?? [];
    },

    getById: async (id: number): Promise<BlogPost | null> => {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    getBySlug: async (slug: string): Promise<BlogPost | null> => {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> => {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert(post)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: number, post: Partial<Omit<BlogPost, 'id' | 'created_at'>>): Promise<BlogPost> => {
        const { data, error } = await supabase
            .from('blog_posts')
            .update(post)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
