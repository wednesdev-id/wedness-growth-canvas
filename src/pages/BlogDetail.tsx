import { useParams, useNavigate } from "react-router-dom";
import { useBlogPostBySlug } from "@/hooks/useBlogPosts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentRenderer } from "@/components/ui/content-renderer";

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading, error } = useBlogPostBySlug(slug);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <main className="pt-24 pb-16 container-custom max-w-2xl mx-auto">
                    <Skeleton className="h-8 w-32 mb-6" />
                    <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-8" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Button variant="outline" onClick={() => navigate('/blog')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-16">
                <article className="container-custom max-w-2xl mx-auto">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        className="mb-8 hover:bg-transparent hover:text-primary p-0"
                        onClick={() => navigate('/blog')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
                    </Button>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex gap-2 mb-6">
                            {post.tags?.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border pb-8">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-foreground">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            {post.read_time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.read_time}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Hero Image */}
                    {post.image_url && (
                        <div className="rounded-2xl overflow-hidden mb-12 border border-border bg-muted shadow-lg relative group">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <ContentRenderer content={post.content || ''} coverImageUrl={post.image_url} />

                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetail;
