import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TestimonialService } from '@/services/testimonial.service';
import { Testimonial } from '@/types/database.types';

export function useCreateTestimonial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTestimonial: Omit<Testimonial, 'id' | 'created_at'>) => TestimonialService.create(newTestimonial),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        },
    });
}

export function useUpdateTestimonial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<Testimonial, 'id' | 'created_at'>> }) =>
            TestimonialService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        },
    });
}

export function useDeleteTestimonial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => TestimonialService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] });
        },
    });
}
