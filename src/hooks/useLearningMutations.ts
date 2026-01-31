import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LearningService } from '@/services/learning.service';
import { LearningResource } from '@/types/database.types';

export function useCreateLearningResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newResource: Omit<LearningResource, 'id' | 'created_at'>) => LearningService.create(newResource),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['learning_resources'] });
        },
    });
}

export function useUpdateLearningResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<LearningResource, 'id' | 'created_at'>> }) =>
            LearningService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['learning_resources'] });
        },
    });
}

export function useDeleteLearningResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => LearningService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['learning_resources'] });
        },
    });
}
