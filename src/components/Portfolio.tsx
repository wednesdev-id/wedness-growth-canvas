import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "E-Commerce Platform Optimization",
      category: "Retail",
      description: "Optimized checkout flow and database queries, resulting in 60% faster load times.",
      results: ["60% faster load times", "40% increase in conversions", "Reduced server costs by 35%"],
      tech: ["React", "Node.js", "PostgreSQL", "Redis"],
      image: "🛒"
    },
    {
      title: "Financial Analytics Dashboard",
      category: "Finance",
      description: "Built real-time analytics dashboard for investment tracking and risk assessment.",
      results: ["Real-time data processing", "99.9% uptime", "Handled 1M+ transactions/day"],
      tech: ["Next.js", "Python", "MongoDB", "AWS"],
      image: "💹"
    },
    {
      title: "Healthcare Management System",
      category: "Healthcare",
      description: "Developed secure patient management system with appointment scheduling and records.",
      results: ["HIPAA compliant", "50% admin time saved", "Zero security breaches"],
      tech: ["Vue.js", "Django", "MySQL", "Docker"],
      image: "🏥"
    },
    {
      title: "EdTech Learning Platform",
      category: "Education",
      description: "Created interactive learning platform with video streaming and progress tracking.",
      results: ["10K+ active users", "95% completion rate", "4.8/5 user rating"],
      tech: ["React", "Firebase", "WebRTC", "Stripe"],
      image: "📚"
    },
    {
      title: "IoT Fleet Management",
      category: "Tech",
      description: "Real-time vehicle tracking and maintenance prediction system for logistics company.",
      results: ["30% reduction in downtime", "Real-time GPS tracking", "Predictive maintenance"],
      tech: ["Angular", "FastAPI", "TimescaleDB", "MQTT"],
      image: "🚚"
    },
    {
      title: "Restaurant POS System",
      category: "Retail",
      description: "Cloud-based point-of-sale system with inventory management and analytics.",
      results: ["5x faster checkout", "Inventory waste reduced 45%", "Multi-location sync"],
      tech: ["React Native", "Node.js", "PostgreSQL", "Vercel"],
      image: "🍽️"
    }
  ];

  const categories = ["All", "Retail", "Finance", "Healthcare", "Education", "Tech"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Portfolio <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Beberapa proyek yang telah kami kerjakan untuk berbagai industri
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-primary text-white shadow-glow"
                    : "bg-card text-foreground hover:bg-primary/10 border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(index)}
            >
              <Card className="group cursor-pointer h-full p-6 rounded-2xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                <div className="text-6xl mb-4">{project.image}</div>
                <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                  {project.category}
                </Badge>
                <h3 className="text-xl font-bold mb-3 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject !== null && (
            <>
              <DialogHeader>
                <div className="text-6xl mb-4">{projects[selectedProject].image}</div>
                <DialogTitle className="text-2xl">{projects[selectedProject].title}</DialogTitle>
                <DialogDescription className="text-base">
                  {projects[selectedProject].description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Key Results</h4>
                  <ul className="space-y-2">
                    {projects[selectedProject].results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-lg">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
