import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: TrendingUp,
      value: "+200%",
      label: "Efisiensi Operasional",
      description: "Peningkatan rata-rata efisiensi operasional klien kami"
    },
    {
      icon: Clock,
      value: "40%",
      label: "Penghematan Waktu",
      description: "Waktu produksi yang berhasil dihemat melalui optimasi sistem"
    },
    {
      icon: DollarSign,
      value: "35%",
      label: "Pengurangan Biaya",
      description: "Biaya operasional yang berhasil ditekan dengan sistem yang tepat"
    },
    {
      icon: Users,
      value: "50+",
      label: "Klien Puas",
      description: "Perusahaan yang telah merasakan dampak positif solusi kami"
    }
  ];

  const testimonials = [
    {
      quote: "Solusi kami membantu klien menghemat waktu dan biaya produksi hingga 40%.",
      author: "Tim WednesDev",
      role: "Impact Analysis"
    },
    {
      quote: "Sistem yang dibangun tidak hanya efisien, tapi juga scalable untuk pertumbuhan jangka panjang.",
      author: "Client Feedback",
      role: "System Implementation"
    }
  ];

  return (
    <section id="impact" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Dampak Nyata</span> untuk Bisnis Anda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hasil terukur yang telah kami capai bersama klien-klien kami
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative h-full p-8 border border-border hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow text-center card-dark-accent">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-primary icon-dark-accent" />
                  </div>

                  {/* Value */}
                  <h3 className="text-4xl font-bold mb-2 text-primary number-dark-accent transition-colors">
                    {stat.value}
                  </h3>
                  
                  {/* Label */}
                  <h4 className="text-xl font-semibold mb-3 transition-colors">
                    {stat.label}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 card-dark-accent">
                <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Siap merasakan dampak yang sama untuk bisnis Anda?
          </p>
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
          >
            Mulai Konsultasi Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;