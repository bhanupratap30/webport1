import { motion, type TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
  hoverEffect?: "lift" | "tilt" | "glow";
}

export const AnimatedCard = ({
  children,
  className = "",
  index = 0,
  hoverEffect = "lift",
}: AnimatedCardProps) => {
  const getHoverAnimation = (): TargetAndTransition => {
    switch (hoverEffect) {
      case "tilt":
        return {
          scale: 1.02,
          rotateX: -5,
          rotateY: 5,
          transition: { duration: 0.3 },
        };
      case "glow":
        return {
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(74, 222, 128, 0.3)",
          transition: { duration: 0.3 },
        };
      case "lift":
      default:
        return {
          y: -10,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={getHoverAnimation()}
    >
      {children}
    </motion.div>
  );
};
