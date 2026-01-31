import { useQuery } from '@tanstack/react-query';
import { LearningService } from '@/services/learning.service';

export function useLearningResources() {
    return useQuery({
        queryKey: ['learning_resources'],
        queryFn: () => LearningService.getAll(),
    });
}
