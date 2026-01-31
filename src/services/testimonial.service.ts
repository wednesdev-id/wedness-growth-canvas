import { supabase } from "@/lib/supabase";
import { Testimonial } from "@/types/database.types";

export const TestimonialService = {
    getAll: async (): Promise<Testimonial[]> => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data ?? [];
    },

    getById: async (id: number): Promise<Testimonial | null> => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> => {
        const { data, error } = await supabase
            .from('testimonials')
            .insert(testimonial)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id: number, testimonial: Partial<Omit<Testimonial, 'id' | 'created_at'>>): Promise<Testimonial> => {
        const { data, error } = await supabase
            .from('testimonials')
            .update(testimonial)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
