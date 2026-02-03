import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/SEO";

const Blog = () => {
    const navigate = useNavigate();
    const { data: posts, isLoading, error } = useBlogPosts();

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Blog"
                description="Wawasan, tips, dan berita terbaru seputar teknologi, desain, dan pengembangan bisnis dari Wedness Dev."
            />
            <Navigation />

            <main className="pt-24 pb-16">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Our <span className="text-gradient">Blog</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Wawasan, tips, dan berita terbaru seputar teknologi, desain, dan pengembangan bisnis.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[400px] rounded-xl overflow-hidden border border-border bg-card">
                                    <Skeleton className="h-[200px] w-full" />
                                    <div className="p-6 space-y-4">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts?.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                >
                                    <Card className="h-full overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col group cursor-pointer">
                                        <div className="relative aspect-video overflow-hidden bg-muted">
                                            {post.image_url ? (
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-background/80 backdrop-blur text-foreground hover:bg-background">
                                                    {post.tags?.[0] || 'Article'}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {post.author}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-border">
                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto text-primary font-semibold group-hover:translate-x-1 transition-transform"
                                                >
                                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main >

            <Footer />
        </div >
    );
};

export default Blog;
