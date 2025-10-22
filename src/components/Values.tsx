import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, BarChart3, Layers } from "lucide-react";

const Values = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: "Impact-Driven",
      description: "Setiap solusi dirancang untuk memberikan dampak langsung pada pertumbuhan dan efisiensi bisnis Anda."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Kami percaya pada kemitraan sejati. Tim kami bekerja bersama tim Anda untuk mencapai tujuan bersama."
    },
    {
      icon: BarChart3,
      title: "Data-Oriented",
      description: "Keputusan berbasis data, bukan asumsi. Setiap rekomendasi didukung oleh analisis mendalam dan metrics."
    },
    {
      icon: Layers,
      title: "Scalable Systems",
      description: "Sistem yang kami bangun dirancang untuk tumbuh bersama bisnis Anda, dari startup hingga enterprise."
    }
  ];

  return (
    <section id="values" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nilai & <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prinsip-prinsip yang memandu setiap keputusan dan tindakan kami
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 h-full border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 transition-colors">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before & After Infographic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-gradient-primary rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Impact Optimization</h3>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Before */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                  <span className="text-red-400">✕</span>
                </div>
                Before Optimization
              </h4>
              {[
                "Sistem lambat & tidak responsif",
                "Frequent downtime & bugs",
                "Unclear scalability path",
                "High operational costs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <span className="text-red-400 mr-3">▪</span>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* After */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <span className="text-green-400">✓</span>
                </div>
                After Optimization
              </h4>
              {[
                "Fast & reliable performance",
                "99.9% uptime guaranteed",
                "Future-proof architecture",
                "Reduced costs by 40%+"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <span className="text-green-400 mr-3">▪</span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
