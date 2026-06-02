import { motion } from "framer-motion";
import {
  Cpu,
  Building2,
  BarChart,
  Database,
  Zap,
  MessageCircle,
  Car,
  BookOpen,
  CreditCard,
  Github,
  ExternalLink,
} from "lucide-react";
import { FadeInLeft } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const staticProjects = [
  {
    icon: Zap,
    image: "/yoursarthi.png",
    title: "Your Sarthi: A Stress Management System",
    duration: "2026",
    description: [
      "Developed a stress management system using React and Node.js. Implemented a conversational interface with natural language understanding to provide stress management techniques and resources. Enhanced user experience with interactive prompts and responsive data presentation.",
    ],
    technologies: ["React", "AI Chatbot", "Google Gemini API","NodeJs","Vercel","Postman"],
    github: "https://github.com/bhanupratap30/your-sarthi",
    //demo:
  },
  {
    icon: Github,
    image: "/smartspendai.png",
    title: "Smart Spend AI",
    duration: "2026",
    description: [
      "Built an AI-powered personal finance management platform that enables users to track income and expenses, visualize spending patterns, and manage budgets efficiently. Integrated intelligent financial insights and analytics to help users make informed financial decisions and improve overall money management.",
    ],
    technologies: ["React","SpringBoot","Docker", "Maven","Frame Motion", "JWT","Redux Toolkit"],
    github: "https://github.com/bhanupratap30/smartspendai",
    //demo:
  },
  {
    icon: Zap,
    image: "/cloud-wise.png",
    title: "Cloud Wise Chatbot",
    duration: "2024",
    description: [
      "Developed a Cloud Wise Chatbot using Node.js and Express.js for the backend, integrating with OpenWeatherMap API for real-time weather data. Implemented a conversational interface with natural language understanding to provide weather forecasts, temperature, humidity, and wind speed information. Enhanced user experience with interactive prompts and responsive data presentation.",
    ],
    technologies: ["API","Python","React","AI Chatbot","Supervised","Unsupervised"],
    github: "https://github.com/bhanupratap30/cloud-wise-bot.git",
    //demo: "https://app.powerbi.com/links/v5a14HEnja?ctid=e14e73eb-5251-4388-8d67-8f9f2e2d5a46&pbi_source=linkShare",
  },
  
];

export const ProjectsSection = () => {
  const handleGithubClick = (githubUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (githubUrl && githubUrl !== "#") {
      window.open(githubUrl, "_blank");
    }
  };

  const handleDemoClick = (demoUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (demoUrl && demoUrl !== "#") {
      window.open(demoUrl, "_blank");
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 10% / 0.3) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">03.</span>
            Featured Projects
          </h2>
        </FadeInLeft>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticProjects.map((project, index) => {
            const { icon: Icon, title, duration, description, technologies, github: githubUrl, demo: demoUrl } = project;

            return (
              <AnimatedCard
                key={title + index}
                index={index}
                hoverEffect="glow"
                className="glass rounded-2xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500"
              >
                {project.image && (
                  <div className="mb-4 overflow-hidden rounded-xl h-40 bg-muted/10">
                    <img
                      src={project.image}
                      alt={`${title} screenshot`}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <motion.div
                  className="text-primary text-4xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon size={34} />
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{duration}</p>

                <p className="text-sm text-muted-foreground mb-6">{description.join(" ")}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {technologies.map((tech) => (
                    <span key={tech} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={githubUrl}
                    onClick={(e) => handleGithubClick(githubUrl, e)}
                    className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github size={18} />
                  </motion.a>

                  <motion.a
                    href={demoUrl}
                    onClick={(e) => handleDemoClick(demoUrl, e)}
                    className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
