import { useQuery } from '@tanstack/react-query';
import { ProductService } from '@/services/product.service';
import type { Product } from '@/types/database.types';

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => ProductService.getAll(),
    });
}
