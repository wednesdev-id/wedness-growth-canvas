import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Users, Calendar } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Product = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      id: 1,
      name: "ERP System Pro",
      description: "Sistem manajemen sumber daya perusahaan yang komprehensif untuk mengoptimalkan operasional bisnis Anda.",
      category: "Enterprise Software",
      price: "Mulai dari Rp 15.000.000",
      rating: 4.9,
      users: "500+",
      releaseDate: "2024",
      features: ["Multi-user Access", "Real-time Analytics", "Cloud Integration", "Mobile App"],
      image: "🏢",
      demoUrl: "#",
      status: "Available"
    },
    {
      id: 2,
      name: "Smart Inventory Manager",
      description: "Solusi manajemen inventori cerdas dengan AI untuk prediksi stok dan otomatisasi pemesanan.",
      category: "Inventory Management",
      price: "Mulai dari Rp 8.500.000",
      rating: 4.8,
      users: "300+",
      releaseDate: "2024",
      features: ["AI Prediction", "Barcode Scanner", "Auto Reorder", "Multi-warehouse"],
      image: "📦",
      demoUrl: "#",
      status: "Available"
    },
    {
      id: 3,
      name: "Customer Analytics Suite",
      description: "Platform analitik pelanggan untuk memahami perilaku dan meningkatkan engagement.",
      category: "Analytics",
      price: "Mulai dari Rp 12.000.000",
      rating: 4.7,
      users: "250+",
      releaseDate: "2024",
      features: ["Behavior Tracking", "Segmentation", "Predictive Analytics", "Dashboard"],
      image: "📊",
      demoUrl: "#",
      status: "Available"
    },
    {
      id: 4,
      name: "Digital Workflow Automation",
      description: "Otomatisasi alur kerja digital untuk meningkatkan efisiensi dan mengurangi kesalahan manual.",
      category: "Automation",
      price: "Mulai dari Rp 10.000.000",
      rating: 4.9,
      users: "400+",
      releaseDate: "2024",
      features: ["Process Automation", "Integration APIs", "Custom Workflows", "Monitoring"],
      image: "⚡",
      demoUrl: "#",
      status: "Available"
    },
    {
      id: 5,
      name: "E-Commerce Platform Plus",
      description: "Platform e-commerce lengkap dengan fitur advanced untuk bisnis online modern.",
      category: "E-Commerce",
      price: "Mulai dari Rp 20.000.000",
      rating: 4.8,
      users: "600+",
      releaseDate: "2024",
      features: ["Multi-vendor", "Payment Gateway", "SEO Optimized", "Mobile Responsive"],
      image: "🛒",
      demoUrl: "#",
      status: "Available"
    },
    {
      id: 6,
      name: "AI Business Intelligence",
      description: "Sistem business intelligence dengan AI untuk insight mendalam dan decision making yang lebih baik.",
      category: "Business Intelligence",
      price: "Coming Soon",
      rating: 0,
      users: "0",
      releaseDate: "Q2 2025",
      features: ["AI Insights", "Predictive Models", "Data Visualization", "Real-time Reports"],
      image: "🤖",
      demoUrl: "#",
      status: "Coming Soon"
    }
  ];

  const handleDemoClick = (productName: string) => {
    const message = encodeURIComponent(`Halo WednesDev, saya tertarik untuk melihat demo dari ${productName}. Bisakah kita jadwalkan presentasi?`);
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

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
            Katalog <span className="text-gradient">Produk Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Jelajahi koleksi lengkap solusi teknologi yang telah kami kembangkan untuk berbagai kebutuhan bisnis. 
            Setiap produk dirancang dengan teknologi terdepan dan telah terbukti memberikan hasil nyata.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <Badge 
                    variant={product.status === "Available" ? "default" : "secondary"}
                    className={product.status === "Available" ? "bg-green-100 text-green-800" : ""}
                  >
                    {product.status}
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <Badge variant="outline" className="mb-3 text-xs">
                    {product.category}
                  </Badge>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Stats */}
                  {product.status === "Available" && (
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{product.users} users</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{product.releaseDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Footer */}
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-primary">{product.price}</p>
                      {product.status === "Coming Soon" && (
                        <p className="text-xs text-muted-foreground">Expected: {product.releaseDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDemoClick(product.name)}
                      className="flex-1 bg-blue-600 hover:bg-[#07f29c] text-white shadow-lg shadow-blue-600/30 hover:shadow-[#07f29c]/30 transition-all duration-300"
                      disabled={product.status === "Coming Soon"}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {product.status === "Available" ? "Request Demo" : "Notify Me"}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Tidak menemukan produk yang sesuai? Kami juga menyediakan solusi kustom!
          </p>
          <Button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-blue-600 hover:bg-[#07f29c] text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-[#07f29c]/30 transition-all duration-300 hover:scale-105"
          >
            Konsultasi Solusi Kustom
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Product;