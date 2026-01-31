import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.portfolio"), href: "/#portfolio" },
    { name: t("nav.products"), href: "/products" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.learn"), href: "/learn" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // Check if it's a hash link
    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      // If we are already on the home page
      if (location.pathname === "/" || location.pathname === "") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home with hash
        navigate(href);
        // We need to wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      // Normal page navigation
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
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
              className="flex items-center cursor-pointer"
              onClick={() => handleNavClick("/")}
            >
              <img
                src="/LOGO WEDNESDEV-04.png"
                alt="WednesDev Logo"
                className="h-16 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
                  className={`font-medium transition-colors text-sm lg:text-base text-white`}
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Dark Mode Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${isScrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
                  }`}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <div className="flex items-center bg-white/10 rounded-lg p-1 ml-4 border border-white/10">
                <button
                  onClick={() => setLanguage('ID')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${language === 'ID'
                    ? 'bg-accent text-[#111218] shadow-sm'
                    : 'text-white hover:text-accent'
                    }`}
                >
                  ID
                </button>
                <div className="w-[1px] h-4 bg-white/20 mx-1"></div>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${language === 'EN'
                    ? 'bg-accent text-[#111218] shadow-sm'
                    : 'text-white hover:text-accent'
                    }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Dark Mode Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${isScrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
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
              <div className="flex w-full items-center justify-center bg-accent/10 rounded-xl p-2 mt-4">
                <button
                  onClick={() => setLanguage('ID')}
                  className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${language === 'ID'
                    ? 'bg-accent text-[#111218] shadow-md'
                    : 'text-foreground hover:text-accent'
                    }`}
                >
                  Indonesian
                </button>
                <button
                  onClick={() => setLanguage('EN')}
                  className={`flex-1 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${language === 'EN'
                    ? 'bg-accent text-[#111218] shadow-md'
                    : 'text-foreground hover:text-accent'
                    }`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
