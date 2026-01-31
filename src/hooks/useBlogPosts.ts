import { useQuery } from '@tanstack/react-query';
import { BlogService } from '@/services/blog.service';

export function useBlogPosts() {
    return useQuery({
        queryKey: ['blog_posts'],
        queryFn: () => BlogService.getAll(),
    });
}

export function useBlogPost(id: number) {
    return useQuery({
        queryKey: ['blog_posts', id],
        queryFn: () => BlogService.getById(id),
        enabled: !!id,
    });
}

export function useBlogPostBySlug(slug: string | undefined) {
    return useQuery({
        queryKey: ['blog_posts', 'slug', slug],
        queryFn: () => BlogService.getBySlug(slug!),
        enabled: !!slug,
    });
}
