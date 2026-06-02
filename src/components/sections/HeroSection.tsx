import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Linkedin } from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";

export const HeroSection = () => {
  const typingText = useTypingEffect();

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      {/* Background Glow Effect */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(199 89% 58% / 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* LEFT SIDE - TEXT CONTENT */}
          <div className="max-w-3xl">
            
            {/* Greeting */}
            <motion.p
              className="text-primary text-lg font-medium mb-2 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-4 gradient-text-light leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Bhanu Pratap Singh
            </motion.h1>

            {/* Headline */}
            <motion.h2
              className="text-xl md:text-2xl font-semibold mb-4 text-foreground/90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Computer Science Undergraduate | Aspiring Software Engineer
            </motion.h2>

            {/* Typing Effect */}
            <motion.div
              className="text-2xl md:text-4xl font-bold mb-6 min-h-[3rem] md:min-h-[3.5rem] flex items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="gradient-text">{typingText}</span>
              <motion.span
                className="text-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
            Cloud Developer and AI enthusiast with Full-Stack development skills, focused on building intelligent systems, interactive dashboards, and data-driven applications that transform complex data into real-world solutions.
          </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Social Links */}
              <div className="flex gap-3 mb-4 sm:mb-0">
                <motion.a
                  href="https://github.com/bhanupratap30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground border border-primary/30 shadow-[0_0_12px_rgba(34,197,94,0.15)] hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/bhanupratap3008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground border border-primary/30 shadow-[0_0_12px_rgba(34,197,94,0.15)] hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>

              <motion.button
                onClick={handleScrollToProjects}
                className="btn-gradient px-8 py-4 text-primary-foreground flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <ArrowRight size={18} />
              </motion.button>

              <motion.button
                onClick={handleScrollToContact}
                className="btn-outline-gradient px-8 py-4 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT SIDE - PROFILE IMAGE */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <img
              src="/Profile.jpeg"
              alt="Bhanu Pratap Singh"
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-primary/30"
            />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="text-muted-foreground cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={handleScrollToProjects}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};
