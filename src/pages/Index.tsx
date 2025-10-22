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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Values />
      <Portfolio />
      <Product />
      <Impact />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
