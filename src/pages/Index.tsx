import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Values from "@/components/Values";
import Portfolio from "@/components/Portfolio";
import Product from "@/components/Product";
import Impact from "@/components/Impact";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ServicePackages from "@/components/ServicePackages";
import ServiceAddons from "@/components/ServiceAddons";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <ServicePackages />
      <ServiceAddons />
      <Approach />
      <Values />
      <Portfolio />
      <Product />
      <Impact />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
