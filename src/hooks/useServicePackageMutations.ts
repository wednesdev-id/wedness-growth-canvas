import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ServicePackageService } from '@/services/service-package.service';
import { ServicePackage } from '@/types/database.types';

export function useCreateServicePackage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newPackage: Omit<ServicePackage, 'id' | 'created_at'>) => ServicePackageService.create(newPackage),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service_packages'] });
        },
    });
}

export function useUpdateServicePackage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<ServicePackage, 'id' | 'created_at'>> }) =>
            ServicePackageService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service_packages'] });
        },
    });
}

export function useDeleteServicePackage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => ServicePackageService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service_packages'] });
        },
    });
}
