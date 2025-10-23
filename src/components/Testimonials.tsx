import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "CTO",
      company: "TechCorp Indonesia",
      testimonial: "Wedness Dev tidak hanya membantu kami membangun sistem, tapi juga mengajarkan best practices yang membuat tim kami lebih produktif. ROI yang kami dapatkan melebihi ekspektasi.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Wijaya",
      role: "Founder & CEO",
      company: "StartupHub",
      testimonial: "Pendekatan mereka yang data-driven dan kolaboratif membuat kami merasa benar-benar dipahami. Sistem yang dibangun scalable dan mudah dimaintain. Highly recommended!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Andi Prasetyo",
      role: "Product Manager",
      company: "E-Commerce Plus",
      testimonial: "Tim yang sangat responsif dan professional. Mereka berhasil mengoptimasi sistem kami yang awalnya sering down menjadi 99.9% uptime. Impact langsung terasa pada revenue.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Linda Kusuma",
      role: "Operations Director",
      company: "LogisTech Solutions",
      testimonial: "Wedness Dev membantu kami mengidentifikasi bottleneck yang tidak kami sadari selama ini. Setelah optimasi, operational cost turun 35% dan kecepatan proses meningkat drastis.",
      rating: 5,
      avatar: "👩‍🔬"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kata Mereka <span className="text-gradient">Tentang Kami</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kepercayaan klien adalah bukti nyata kualitas kerja kami
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="p-8 h-full rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 card-dark-accent">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{testimonial.avatar}</div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">Dipercaya oleh perusahaan terkemuka</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["TechCorp", "StartupHub", "E-Commerce Plus", "LogisTech"].map((company, idx) => (
              <div key={idx} className="text-xl font-bold">{company}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
