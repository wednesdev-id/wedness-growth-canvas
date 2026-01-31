import { useQuery } from '@tanstack/react-query';
import { PortfolioService } from '@/services/portfolio.service';

export function usePortfolioProjects() {
    return useQuery({
        queryKey: ['portfolio_projects'],
        queryFn: () => PortfolioService.getAll(),
    });
}
