import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Users, Calendar, Copy, X } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Product = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data: products, isLoading } = useProducts();

  const handleActionClick = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (product.product_url) {
      window.open(product.product_url, "_blank");
      return;
    }
    const message = encodeURIComponent(`Halo WednesDev, saya tertarik untuk melihat demo dari ${product.name}. Bisakah kita jadwalkan presentasi?`);
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  const selectedProductData = selectedProductId !== null ? products?.find(p => p.id === selectedProductId) : null;

  return (
    <section id="products" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('products.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('products.subtitle')}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
            {products?.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProductId(product.id)}
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
                        {product.status === "available" ? t('products.status.available') : t('products.status.comingSoon')}
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
                      {product.features && product.features.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                          +{product.features.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        {/* Price removed */}
                      </div>
                      <Button
                        onClick={(e) => handleActionClick(e, product)}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                        disabled={product.status === "coming_soon"}
                        size="sm"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {product.status === "available"
                          ? (product.product_url ? t('products.visit') || "Visit Product" : t('products.requestDemo'))
                          : t('products.notifyMe')}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => window.location.href = "/products"}
            size="lg"
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-primary/30 hover:shadow-accent/30 transition-all duration-300 hover:scale-105 mb-8"
          >
            {t('products.showMore')}
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={selectedProductId !== null} onOpenChange={() => setSelectedProductId(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-card border-border">
          {selectedProductData && (
            <div className="flex flex-col h-[90vh] md:h-auto max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-border flex justify-between items-center bg-card z-10">
                <DialogTitle className="text-xl md:text-2xl font-bold">{selectedProductData.name}</DialogTitle>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-primary font-medium flex items-center gap-2 hover:underline">
                    <Copy className="w-4 h-4" /> Copy link
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column: Details */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">{t('products.category')}</h4>
                      <p className="font-medium text-foreground">{selectedProductData.role}</p>
                    </div>

                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">{t('products.description')}</h4>
                      <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                        {selectedProductData.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm text-muted-foreground mb-3">{t('products.keyFeatures')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProductData.features?.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-secondary-foreground">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats & Review */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/20 p-4 rounded-xl border border-border/50">
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">{t('products.rating')}</h4>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                          <span className="font-bold">{selectedProductData.rating}</span>
                        </div>
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-xl border border-border/50">
                        <h4 className="text-xs font-medium text-muted-foreground mb-1">{t('products.activeUsers')}</h4>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-bold">{selectedProductData.users}</span>
                        </div>
                      </div>
                    </div>

                    {selectedProductData.review && (
                      <div className="bg-secondary/20 p-5 rounded-xl border border-border/50">
                        <h4 className="text-sm font-medium text-primary mb-2">{t('products.userFeedback')}</h4>
                        <p className="text-sm italic text-muted-foreground">"{selectedProductData.review}"</p>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground pt-4 border-t border-border/50">
                      {t('products.releasedIn')} {selectedProductData.release_date}
                    </div>
                  </div>

                  {/* Right Column: Image */}
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden border border-border bg-muted shadow-sm">
                      <img
                        src={selectedProductData.image_url}
                        alt={selectedProductData.name}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={(e) => handleActionClick(e, selectedProductData)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-full md:w-auto px-8"
                        disabled={selectedProductData.status === "coming_soon"}
                      >
                        {selectedProductData.status === "available"
                          ? (selectedProductData.product_url ? t('products.visit') || "Visit Product" : t('products.consult'))
                          : t('products.notifyMe')}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                {selectedProductData.gallery && selectedProductData.gallery.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <h4 className="font-semibold text-lg mb-4">Gallery</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProductData.gallery.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-border bg-muted relative group">
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: More Products */}
              <div className="p-6 border-t border-border bg-secondary/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">{t('products.moreProducts')}</h4>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {products?.map((p, idx) => (
                    p.id !== selectedProductId && (
                      <div
                        key={p.id}
                        className="flex-shrink-0 w-48 cursor-pointer group"
                        onClick={() => setSelectedProductId(p.id)}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden border border-border mb-2 relative">
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <p className="text-xs font-medium truncate group-hover:text-primary dark:group-hover:text-[#07F0A2] transition-colors">{p.name}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section >
  );
};

export default Product;