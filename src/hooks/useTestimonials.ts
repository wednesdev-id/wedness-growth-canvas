import { useQuery } from '@tanstack/react-query';
import { TestimonialService } from '@/services/testimonial.service';

export function useTestimonials() {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: () => TestimonialService.getAll(),
    });
}
