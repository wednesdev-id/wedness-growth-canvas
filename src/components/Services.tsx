import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Workflow, Database, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Settings,
      title: "Sistem Bisnis Kustom",
      description: "Pembuatan sistem yang disesuaikan dengan kebutuhan spesifik bisnis Anda untuk meningkatkan efisiensi operasional.",
      features: [
        "Custom Software Development",
        "Business Process Automation",
        "System Integration",
        "API Development"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Workflow,
      title: "Optimasi Alur Kerja & Operasional",
      description: "Analisis dan perbaikan proses bisnis untuk menghilangkan bottleneck dan meningkatkan produktivitas.",
      features: [
        "Process Analysis",
        "Workflow Optimization",
        "Performance Monitoring",
        "Efficiency Enhancement"
      ],
      color: "from-accent to-green-600"
    },
    {
      icon: Database,
      title: "Integrasi Teknologi dan Data",
      description: "Menghubungkan berbagai sistem dan platform untuk menciptakan ekosistem teknologi yang terintegrasi.",
      features: [
        "System Integration",
        "Data Migration",
        "API Integration",
        "Cloud Solutions"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Konsultasi & Pendampingan Digital Transformation",
      description: "Bimbingan strategis untuk transformasi digital yang berkelanjutan dan berorientasi pada hasil bisnis.",
      features: [
        "Digital Strategy",
        "Technology Consulting",
        "Change Management",
        "Training & Support"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="services" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Solusi Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empat pilar utama yang kami tawarkan untuk memastikan sistem Anda siap berkembang
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group relative h-full p-8 border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow cursor-pointer card-dark-accent">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`bg-gradient-to-br ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-4 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
