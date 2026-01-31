import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@/services/product.service';
import { Product } from '@/types/database.types';

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newProduct: Omit<Product, 'id' | 'created_at'>) => ProductService.create(newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Omit<Product, 'id' | 'created_at'>> }) =>
            ProductService.update(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => ProductService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
