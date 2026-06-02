import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#training", label: "Training" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["contact", "achievements", "certifications", "skills", "training", "projects", "education", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg"
          : "bg-background/30 backdrop-blur-xl border-b border-border/10"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BPS
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`text-muted-foreground hover:text-foreground font-medium text-sm py-2 nav-link-underline transition-colors ${
                      activeSection === link.href.substring(1) ? "text-foreground active" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Resume Button */}
            <motion.a
              href="./bhanuspecializedcv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 + 0.4 }}
            >
              Resume
              <span className="text-lg">→</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <ul className="flex flex-col p-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      activeSection === link.href.substring(1)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 pt-3 border-t border-border/20"
              >
                <a
                  href="./bhanuspecializedcv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Download Resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
