import { supabase } from "@/lib/supabase";
import { ServicePackage } from "@/types/database.types";

export const ServicePackageService = {
    getAll: async (): Promise<ServicePackage[]> => {
        const { data, error } = await supabase
            .from('service_packages')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return data ?? [];
    },

    getById: async (id: number): Promise<ServicePackage | null> => {
        const { data, error } = await supabase
            .from('service_packages')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (pkg: Omit<ServicePackage, 'id' | 'created_at'>): Promise<ServicePackage> => {
        const { data, error } = await supabase
            .from('service_packages')
            .insert(pkg)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: number, pkg: Partial<Omit<ServicePackage, 'id' | 'created_at'>>): Promise<ServicePackage> => {
        const { data, error } = await supabase
            .from('service_packages')
            .update(pkg)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('service_packages')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
