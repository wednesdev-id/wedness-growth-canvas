import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useServicePackages } from "@/hooks/useServicePackages";
import { Skeleton } from "@/components/ui/skeleton";

const ServicePackages = () => {
  const { t } = useLanguage();
  const { data: packages, isLoading } = useServicePackages();

  return (
    <section id="service-packages" className="section-padding bg-background relative overflow-hidden">
      {/* Section Header */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('packages.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] border border-border rounded-2xl p-8 bg-card">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="space-y-3 mt-8">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Packages Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages?.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="group relative h-full p-8 border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow cursor-pointer bg-card card-dark-accent flex flex-col">
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3 right-4 bg-[rgba(7,240,162,0.12)] text-accent border border-accent/40 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur">
                      POPULAR
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold group-hover-dark-accent">{pkg.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <p className="text-2xl md:text-3xl font-extrabold text-price-dark-accent">
                      {pkg.price_label}
                    </p>
                  </div>

                  {/* Target */}
                  <p className="text-sm text-muted-foreground mb-4">{pkg.target}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {pkg.features?.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.optional_note && (
                    <p className="-mt-4 mb-6 text-xs text-muted-foreground italic">
                      {pkg.optional_note}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="mb-6 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Durasi</p>
                      <p className="font-semibold">{pkg.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Kategori</p>
                      <p className="font-semibold">{pkg.target ?? "—"}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <a href="#contact" className="inline-flex items-center justify-center w-full font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg transition-colors">
                      Order Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicePackages;