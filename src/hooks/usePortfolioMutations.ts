import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PortfolioService } from '@/services/portfolio.service';
import { PortfolioProject } from '@/types/database.types';

export function useCreatePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newProject: Omit<PortfolioProject, 'id' | 'created_at'>) => PortfolioService.create(newProject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio_projects'] });
        },
    });
}

export function useUpdatePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<PortfolioProject, 'id' | 'created_at'>> }) =>
            PortfolioService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio_projects'] });
        },
    });
}

export function useDeletePortfolioProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => PortfolioService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio_projects'] });
        },
    });
}
