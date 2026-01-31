import { supabase } from "@/lib/supabase";
import { PortfolioProject } from "@/types/database.types";

export const PortfolioService = {
    getAll: async (): Promise<PortfolioProject[]> => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;
        return data ?? [];
    },

    getById: async (id: number): Promise<PortfolioProject | null> => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (project: Omit<PortfolioProject, 'id' | 'created_at'>): Promise<PortfolioProject> => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .insert(project)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: number, project: Partial<Omit<PortfolioProject, 'id' | 'created_at'>>): Promise<PortfolioProject> => {
        const { data, error } = await supabase
            .from('portfolio_projects')
            .update(project)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('portfolio_projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
