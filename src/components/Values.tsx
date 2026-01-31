import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Users, BarChart3, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Values = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const valuesData = t('values.items') || [];
  const icons = [Target, Users, BarChart3, Layers];

  const values = valuesData.map((val: any, index: number) => ({
    ...val,
    icon: icons[index] || Target
  }));

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
            {t('values.title').split('&')[0]} & <span className="text-gradient">{t('values.title').split('&')[1] || 'Impact'}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('values.subtitle')}
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
              <div className="bg-card rounded-2xl p-8 h-full border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow card-dark-accent">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-primary icon-dark-accent" />
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
          <h3 className="text-3xl font-bold text-center mb-12">{t('values.impactOptimization.title')}</h3>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Before */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center mr-3">
                  <span className="text-destructive">✕</span>
                </div>
                {t('values.impactOptimization.before.title')}
              </h4>
              {(t('values.impactOptimization.before.items') || []).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <span className="text-destructive mr-3">▪</span>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* After */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <span className="text-accent">✓</span>
                </div>
                {t('values.impactOptimization.after.title')}
              </h4>
              {(t('values.impactOptimization.after.items') || []).map((item: string, idx: number) => (
                <div key={idx} className="flex items-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <span className="text-accent mr-3">▪</span>
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
