import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
    const { data: products, isLoading, error } = useProducts();

    const handleActionClick = (product: any) => {
        if (product.product_url) {
            window.open(product.product_url, "_blank");
            return;
        }
        const message = encodeURIComponent(`Halo WednesDev, saya tertarik untuk melihat demo dari ${product.name}. Bisakah kita jadwalkan presentasi?`);
        window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
    };

    if (error) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-red-500">Failed to load products. Please try again later.</p>
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
                            Product <span className="text-gradient">Showcase</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Jelajahi koleksi lengkap solusi teknologi kami yang dirancang untuk mempercepat pertumbuhan bisnis Anda.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-[400px] rounded-xl overflow-hidden border border-border bg-card">
                                    <Skeleton className="h-[200px] w-full" />
                                    <div className="p-5 space-y-4">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-20 w-full" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products?.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="group h-full bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col cursor-pointer">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3">
                                                <Badge
                                                    variant={product.status === "available" ? "default" : "secondary"}
                                                    className={product.status === "available" ? "bg-primary text-primary-foreground" : "bg-background/80 backdrop-blur text-foreground"}
                                                >
                                                    {product.status === "available" ? "Available" : "Coming Soon"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="mb-2">
                                                <Badge variant="outline" className="text-xs mb-2">
                                                    {product.category}
                                                </Badge>
                                                <h3 className="text-lg font-bold group-hover:text-primary dark:group-hover:text-[#07F0A2] transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                                {product.description}
                                            </p>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {product.features?.slice(0, 3).map((feature, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Footer */}
                                            <div className="pt-4 border-t border-border mt-auto">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="font-bold text-primary text-price-dark-accent">{product.price}</p>
                                                </div>
                                                <Button
                                                    onClick={() => handleActionClick(product)}
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                                                    disabled={product.status === "coming_soon"}
                                                    size="sm"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    {product.status === "available"
                                                        ? (product.product_url ? "Visit Product" : "Request Demo")
                                                        : "Notify Me"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
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

export default Products;
