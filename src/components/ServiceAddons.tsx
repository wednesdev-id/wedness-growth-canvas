import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
    FileText,
    Palette,
    Code,
    CreditCard,
    Wrench,
    PenTool,
    Server,
    ClipboardList,
    Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceAddons = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLanguage();

    const icons = [
        <FileText className="w-6 h-6" />,
        <Palette className="w-6 h-6" />,
        <Code className="w-6 h-6" />,
        <CreditCard className="w-6 h-6" />,
        <Wrench className="w-6 h-6" />,
        <PenTool className="w-6 h-6" />,
        <Server className="w-6 h-6" />,
        <ClipboardList className="w-6 h-6" />
    ];

    const categories = (t('addons.categories') || []).map((cat: any, index: number) => ({
        ...cat,
        icon: icons[index]
    }));

    return (
        <section id="addons" className="section-padding bg-secondary/30" ref={ref}>
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="text-gradient">{t('addons.title')}</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t('addons.subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Card className="h-full p-6 border border-border/50 bg-card/50 backdrop-blur hover:bg-card hover:border-primary/30 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-[#07F0A2]/10 dark:text-[#07F0A2]">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{category.title}</h3>
                                </div>

                                <div className="space-y-4">
                                    {category.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-foreground">{item.name}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="outline" className="whitespace-nowrap bg-background font-semibold border-primary/20 text-primary dark:border-[#07F0A2]/20 dark:text-[#07F0A2]">
                                                    {item.price}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {category.note && (
                                    <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <p>{category.note}</p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceAddons;
