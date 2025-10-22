import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, AlertTriangle, Settings, Rocket } from "lucide-react";

const Approach = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Analisis Risiko & Kebutuhan",
      description: "Deep dive ke dalam sistem Anda untuk memahami konteks bisnis, identifikasi bottleneck, dan mapping potensi risiko."
    },
    {
      icon: AlertTriangle,
      number: "02",
      title: "Rencana & Mitigasi Masalah",
      description: "Rancang strategi penyelesaian masalah yang tepat sasaran dengan meminimalkan disruption pada operasional bisnis."
    },
    {
      icon: Settings,
      number: "03",
      title: "Pembuatan & Implementasi Sistem",
      description: "Implementasi solusi dan fine-tuning sistem untuk mencapai performa optimal yang mendukung skalabilitas."
    },
    {
      icon: Rocket,
      number: "04",
      title: "Optimasi & Monitoring Dampak",
      description: "Monitoring berkelanjutan dan iterasi untuk memastikan sistem terus berkembang sejalan dengan pertumbuhan bisnis."
    }
  ];

  return (
    <section id="approach" className="section-padding bg-secondary relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Langkah Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Metodologi terstruktur untuk memastikan setiap proyek mencapai hasil yang terukur
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-primary/20 hover:border-primary/50 relative z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mt-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop Only */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
