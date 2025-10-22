import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: "Sistem Bisnis Kustom", href: "#services" },
      { name: "Optimasi Alur Kerja", href: "#services" },
      { name: "Integrasi Teknologi", href: "#services" },
      { name: "Konsultasi Digital", href: "#services" },
    ],
    Company: [
      { name: "Tentang Kami", href: "#about" },
      { name: "Langkah Kami", href: "#approach" },
      { name: "Dampak Nyata", href: "#impact" },
      { name: "Portfolio", href: "#portfolio" },
    ],
    Contact: [
      { name: "Hubungi Kami", href: "#contact" },
      { name: "WhatsApp", href: "https://wa.me/6281234567890" },
      { name: "Email", href: "mailto:hello@wednesdev.com" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@wednesdev.com", label: "Email" },
  ];

  return (
    <footer className="bg-[#0A0031] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
              src="/src/assets/LOGO WEDNESDEV-04.png" 
              alt="WednesDev Logo" 
              className="h-20 w-auto"
            />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Agensi untuk solusi sistem yang berdampak. Kami membantu bisnis berkembang melalui analisis, optimasi, dan sistem yang tepat sasaran.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.name}
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
                      className="text-gray-300 hover:text-accent transition-colors"
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
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © 2024 WednesDev. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
