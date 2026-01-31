import { supabase } from "@/lib/supabase";
import { LearningResource } from "@/types/database.types";

export const LearningService = {
    getAll: async (): Promise<LearningResource[]> => {
        const { data, error } = await supabase
            .from('learning_resources')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return data ?? [];
    },

    getAllByType: async (type: string): Promise<LearningResource[]> => {
        const { data, error } = await supabase
            .from('learning_resources')
            .select('*')
            .eq('type', type)
            .order('id', { ascending: true });

        if (error) throw error;
        return data ?? [];
    },

    create: async (resource: Omit<LearningResource, 'id' | 'created_at'>): Promise<LearningResource> => {
        const { data, error } = await supabase
            .from('learning_resources')
            .insert(resource)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: number, resource: Partial<Omit<LearningResource, 'id' | 'created_at'>>): Promise<LearningResource> => {
        const { data, error } = await supabase
            .from('learning_resources')
            .update(resource)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('learning_resources')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
