import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const handleConsultation = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/6281234567890?text=Halo%20Wedness%20Dev,%20saya%20ingin%20konsultasi%20tentang%20sistem%20teknologi", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--accent)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--accent)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="container-custom section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Grow Your Business with{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Impact-Driven System Solutions
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Kami bantu bisnis Anda berkembang melalui analisis, optimasi, dan sistem yang berdampak nyata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleConsultation}
              className="bg-accent hover:bg-[hsl(var(--accent-hover))] text-[#111218] hover:text-white font-semibold px-8 py-6 text-lg rounded-2xl btn-glow group"
            >
              Konsultasi Sekarang
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              className="border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-6 text-lg rounded-2xl backdrop-blur-sm"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat via WhatsApp
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 mb-16 max-w-2xl mx-auto"
          >
            {[
              { number: "10+", label: "Projects Delivered" },
              { number: "5+", label: "Industries Served" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
