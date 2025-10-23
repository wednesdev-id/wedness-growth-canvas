import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0031]/95 backdrop-blur-md shadow-soft border-b border-border"
            : "bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 px-4 md:px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img 
                src="/LOGO WEDNESDEV-04.png" 
                alt="WednesDev Logo" 
                className="h-16 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`font-medium transition-colors hover:text-accent ${
                    isScrolled ? "text-white" : "text-white"
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Dark Mode Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${
                  isScrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                onClick={() => handleNavClick("#contact")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-6 rounded-xl shadow-lg"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Dark Mode Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${
                  isScrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className={`h-6 w-6 ${isScrolled ? "text-white" : "text-white"}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isScrolled ? "text-white" : "text-white"}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-background/98 backdrop-blur-md shadow-soft md:hidden"
          >
            <div className="container-custom px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block py-3 px-4 rounded-xl font-medium hover:bg-accent/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button
                onClick={() => handleNavClick("#contact")}
                className="w-full bg-accent hover:bg-[hsl(var(--accent-hover))] text-white font-semibold py-6 rounded-xl"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
