export interface Database {
    public: {
        Tables: {
            products: {
                Row: Product;
                Insert: Omit<Product, 'id' | 'created_at'>;
                Update: Partial<Omit<Product, 'id'>>;
            };
            blog_posts: {
                Row: BlogPost;
                Insert: Omit<BlogPost, 'id' | 'created_at'>;
                Update: Partial<Omit<BlogPost, 'id'>>;
            };
            learning_resources: {
                Row: LearningResource;
                Insert: Omit<LearningResource, 'id' | 'created_at'>;
                Update: Partial<Omit<LearningResource, 'id'>>;
            };
            portfolio_projects: {
                Row: PortfolioProject;
                Insert: Omit<PortfolioProject, 'id' | 'created_at'>;
                Update: Partial<Omit<PortfolioProject, 'id'>>;
            };
            testimonials: {
                Row: Testimonial;
                Insert: Omit<Testimonial, 'id' | 'created_at'>;
                Update: Partial<Omit<Testimonial, 'id'>>;
            };
            service_packages: {
                Row: ServicePackage;
                Insert: Omit<ServicePackage, 'id' | 'created_at'>;
                Update: Partial<Omit<ServicePackage, 'id'>>;
            };
            users: {
                Row: User;
                Insert: User; // ID is usually provided from auth
                Update: Partial<User>;
            };
            blog_post_collaborators: {
                Row: BlogPostCollaborator;
                Insert: Omit<BlogPostCollaborator, 'id' | 'created_at'>;
                Update: Partial<Omit<BlogPostCollaborator, 'id'>>;
            };
            edit_requests: {
                Row: EditRequest;
                Insert: Omit<EditRequest, 'id' | 'created_at'>;
                Update: Partial<Omit<EditRequest, 'id'>>;
            };
        };
    };
}

export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: string;
    rating: number;
    users: string;
    release_date: string;
    features: string[];
    gallery: string[];
    image_url: string;
    product_url: string | null;
    status: 'available' | 'coming_soon';
    role: string;
    review: string | null;
    created_at: string;
}

export type UserRole = 'owner' | 'editor' | 'writer' | 'ghost_writer' | 'team';
export type PostStatus = 'draft' | 'pending_review' | 'published' | 'rejected';
export type CollaboratorRole = 'co_author' | 'contributor' | 'mentioned';
export type EditRequestStatus = 'pending' | 'approved' | 'rejected';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    display_name: string | null;
    avatar_url: string | null;
    created_at: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string; // URL-friendly slug
    excerpt: string;
    content: string | null;
    date: string;
    author_id: string | null; // Nullable for legacy posts until migrated
    author: string;           // Display name (from user or override)
    tags: string[] | null;
    image_url: string;
    read_time: string | null;
    status: PostStatus;
    reviewed_by: string | null;
    reviewed_at: string | null;
    rejection_reason: string | null;
    published_at: string | null;
    created_at: string;
}

export interface BlogPostCollaborator {
    id: number;
    post_id: number;
    user_id: string;
    role: CollaboratorRole;
    can_edit: boolean;
    edit_requested: boolean;
    edit_requested_at: string | null;
    created_at: string;
    // Joined fields
    user?: User;
}

export interface EditRequest {
    id: number;
    post_id: number;
    requester_id: string;
    status: EditRequestStatus;
    message: string | null;
    reviewed_by: string | null;
    reviewed_at: string | null;
    created_at: string;
    // Joined fields
    requester?: User;
    post?: BlogPost;
}

export interface LearningResource {
    id: number;
    title: string;
    description: string;
    type: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    instructor: string | null;
    image_url: string;
    link_url: string | null;
    tags: string[];
    created_at: string;
}

export interface PortfolioProject {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    gallery: string[];
    results: string[];
    tech: string[];
    rating: number;
    publish_date: string;
    link: string;
    review: string | null;
    created_at: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    testimonial: string;
    rating: number;
    avatar: string;
    created_at: string;
}

export interface ServicePackage {
    id: number;
    name: string;
    price_label: string;
    target: string | null;
    features: string[];
    duration: string;
    optional_note: string | null;
    popular: boolean;
    sort_order: number;
    created_at: string;
}
