import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, TrendingUp } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Target,
      title: "Misi Kami",
      description: "Memberdayakan bisnis dengan solusi teknologi yang tepat sasaran dan berdampak langsung pada pertumbuhan."
    },
    {
      icon: Eye,
      title: "Visi Kami",
      description: "Menjadi mitra teknologi terpercaya yang menghadirkan transformasi digital berkelanjutan."
    },
    {
      icon: TrendingUp,
      title: "Pendekatan Kami",
      description: "Kolaboratif, data-driven, dan fokus pada impact bisnis yang terukur."
    }
  ];

  return (
    <section id="about" className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tentang <span className="text-gradient">WednesDev</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            WednesDev adalah agensi yang berfokus pada pendampingan solusi dan pembuatan sistem 
            untuk membantu perusahaan tumbuh secara signifikan. Fokus utama kami adalah analisis risiko, 
            mitigasi masalah, dan optimasi sistem yang berorientasi pada impact terhadap bisnis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-primary/20 hover:border-primary/50"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-primary rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Nilai Utama Kami</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              "Analisis Risiko Mendalam",
              "Mitigasi Masalah Strategis",
              "Optimasi Sistem Berkelanjutan",
              "Kolaborasi Data-Driven"
            ].map((value, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
