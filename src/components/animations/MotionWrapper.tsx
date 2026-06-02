import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const FadeInUp = ({ children, className, delay = 0 }: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    custom={delay}
  >
    {children}
  </motion.div>
);

export const FadeInLeft = ({ children, className, delay = 0 }: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInLeft}
    custom={delay}
  >
    {children}
  </motion.div>
);

export const FadeInRight = ({ children, className, delay = 0 }: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInRight}
    custom={delay}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, className, delay = 0 }: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={scaleIn}
    custom={delay}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className }: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
  >
    {children}
  </motion.div>
);
