import { Github, Linkedin, Instagram, Mail } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    [t('footer.links.services')]: [
      { name: t('footer.items.customSystem'), href: "#services" },
      { name: t('footer.items.workflowOptimization'), href: "#services" },
      { name: t('footer.items.techIntegration'), href: "#services" },
      { name: t('footer.items.digitalConsulting'), href: "#services" },
    ],
    [t('footer.links.company')]: [
      { name: t('footer.items.about'), href: "#about" },
      { name: t('footer.items.approach'), href: "#approach" },
      { name: t('footer.items.impact'), href: "#impact" },
      { name: t('footer.items.portfolio'), href: "#portfolio" },
    ],
    [t('footer.links.contact')]: [
      { name: t('footer.items.contact'), href: "#contact" },
      { name: "WhatsApp", href: "https://wa.me/6282241598077" },
      { name: "Email", href: "mailto:wednesdev.id@gmail.com" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/wednesdev-id", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: "mailto:wednesdev.id@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-[#0A0031] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/LOGO WEDNESDEV-04.png"
                alt="WednesDev Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
