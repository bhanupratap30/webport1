import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Code, BookOpen } from "lucide-react";
import { FadeInLeft } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "manzansh3008@gmail.com",
    href: "mailto:manzansh3008@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/bhanupratap3008",
    href: "https://linkedin.com/in/bhanupratap3008"
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/bhanupratap30", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/bhanupratap3008", label: "LinkedIn" },
  { icon: BookOpen, href: "https://www.geeksforgeeks.org/profile/manzans6vwp", label: "GeeksforGeeks" },
  { icon: Code, href: "https://leetcode.com/u/manzansh30/", label: "LeetCode" },
];

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !message) {
      setStatus("Please fill in all fields before submitting.");
      setIsSubmitting(false);
      return;
    }

    // Create a hidden form and submit it to FormSubmit
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/manzansh3008@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';

    // Add form fields
    const fields = [
      { name: 'name', value: name },
      { name: 'email', value: email },
      { name: 'message', value: message },
      { name: '_subject', value: `Portfolio Contact: Message from ${name}` },
      { name: '_captcha', value: 'false' },
      { name: '_template', value: 'table' },
      { name: '_next', value: window.location.href }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    // Show success message
    setStatus("Thank you! Your message has been sent successfully. I will get back to you shortly.");
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(0 0% 10% / 0.3) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">08.</span>
            Get In Touch
          </h2>
        </FadeInLeft>

        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
          </motion.p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-left mb-10">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input border border-border/40 bg-background text-foreground rounded-lg px-4 py-3"
              placeholder="Your name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border border-border/40 bg-background text-foreground rounded-lg px-4 py-3"
              placeholder="Your email"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="textarea border border-border/40 bg-background text-foreground rounded-lg px-4 py-3"
              placeholder="Your message"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground rounded-lg py-3 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <div className="mb-6 text-sm text-primary/90">{status}</div>
          )}

          {/* Contact Cards */}
          <div className="flex flex-col gap-4 mb-10">
            {contactInfo.map((info, index) => (
              <AnimatedCard
                key={info.label}
                index={index}
                hoverEffect="lift"
                className="glass rounded-2xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500"
              >
                <div className="flex items-center gap-4 sm:flex-row flex-col text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="text-primary" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                      {info.label}
                    </span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-foreground font-semibold hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-foreground font-semibold">{info.value}</span>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground border border-primary/30 shadow-[0_0_12px_rgba(34,197,94,0.15)] hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_25px_rgba(34,197,94,0.45)] transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
