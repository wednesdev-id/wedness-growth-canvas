import { supabase } from "@/lib/supabase";

export interface DashboardStats {
    products: number;
    blogPosts: number;
    learningResources: number;
    portfolioProjects: number;
    testimonials: number;
    servicePackages: number;
}

export const DashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        const [
            { count: products },
            { count: blogPosts },
            { count: learningResources },
            { count: portfolioProjects },
            { count: testimonials },
            { count: servicePackages }
        ] = await Promise.all([
            supabase.from('products').select('*', { count: 'exact', head: true }),
            supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
            supabase.from('learning_resources').select('*', { count: 'exact', head: true }),
            supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
            supabase.from('testimonials').select('*', { count: 'exact', head: true }),
            supabase.from('service_packages').select('*', { count: 'exact', head: true })
        ]);

        return {
            products: products || 0,
            blogPosts: blogPosts || 0,
            learningResources: learningResources || 0,
            portfolioProjects: portfolioProjects || 0,
            testimonials: testimonials || 0,
            servicePackages: servicePackages || 0
        };
    }
};
