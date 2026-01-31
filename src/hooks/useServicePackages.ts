import { useQuery } from '@tanstack/react-query';
import { ServicePackageService } from '@/services/service-package.service';

export function useServicePackages() {
    return useQuery({
        queryKey: ['service_packages'],
        queryFn: () => ServicePackageService.getAll(),
    });
}
