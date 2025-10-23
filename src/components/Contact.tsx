import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nama harus diisi").max(100, "Nama terlalu panjang"),
  email: z.string().trim().email("Email tidak valid").max(255, "Email terlalu panjang"),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(1000, "Pesan terlalu panjang")
});

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = contactSchema.parse(formData);
      setIsSubmitting(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Pesan Terkirim! ✓",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validasi Gagal",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Halo WednesDev, saya ${formData.name || '[Nama]'}. ${formData.message || 'Saya ingin konsultasi tentang sistem teknologi.'}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap untuk <span className="text-gradient">Berkembang?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Konsultasikan kebutuhan sistem Anda dengan tim ahli kami. Gratis dan tanpa komitmen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Hubungi Kami</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Tim kami siap mendengarkan kebutuhan Anda dan memberikan solusi terbaik 
                untuk tantangan teknologi yang Anda hadapi.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary icon-dark-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">WhatsApp</h4>
                  <p className="text-muted-foreground text-sm">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary icon-dark-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">hello@wednesdev.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary icon-dark-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Lokasi</h4>
                  <p className="text-muted-foreground text-sm">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Button */}
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat Langsung via WhatsApp
            </Button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-soft card-dark-accent">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Nama Lengkap
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  placeholder="Ceritakan tentang project atau tantangan yang Anda hadapi..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-32 rounded-xl resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-300"
                size="lg"
              >
                {isSubmitting ? (
                  "Mengirim..."
                ) : (
                  <>
                    Kirim Pesan
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
