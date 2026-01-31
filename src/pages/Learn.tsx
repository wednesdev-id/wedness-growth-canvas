import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearningResources } from "@/hooks/useLearningResources";
import { Skeleton } from "@/components/ui/skeleton";

const Learn = () => {
    const { data: resources, isLoading, error } = useLearningResources();

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">Failed to load learning resources. Please try again later.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
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
                            Learning <span className="text-gradient">Hub</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Tingkatkan skill Anda dengan koleksi materi pembelajaran terkurasi dari para ahli kami.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[400px] rounded-xl overflow-hidden border border-border bg-card">
                                    <Skeleton className="h-[200px] w-full" />
                                    <div className="p-6 space-y-4">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {resources?.map((resource, index) => (
                                <motion.div
                                    key={resource.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="h-full overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col group cursor-pointer">
                                        <div className="relative aspect-video overflow-hidden bg-muted">
                                            <img
                                                src={resource.image_url}
                                                alt={resource.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-primary text-primary-foreground">
                                                    {resource.type}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-4 right-4">
                                                <Badge variant="secondary" className="backdrop-blur bg-background/80">
                                                    {resource.level}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                                <Clock className="w-3 h-3" />
                                                {resource.duration}
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {resource.title}
                                            </h3>

                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                                                {resource.description}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-border">
                                                <Button className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground transition-colors group-hover:shadow-md">
                                                    Start Learning <PlayCircle className="w-4 h-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Learn;
