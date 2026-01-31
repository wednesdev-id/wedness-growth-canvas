import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BlogService } from '@/services/blog.service';
import { BlogPost } from '@/types/database.types';

export function useCreateBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newPost: Omit<BlogPost, 'id' | 'created_at'>) => BlogService.create(newPost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
        },
    });
}

export function useUpdateBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<BlogPost, 'id' | 'created_at'>> }) =>
            BlogService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
        },
    });
}

export function useDeleteBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => BlogService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
        },
    });
}
