import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";

export interface RevealOnScrollProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  threshold?: number;
  scale?: boolean;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  xOffset = 24,
  direction = "up",
  once = true,
  threshold = 0.15,
  scale = false,
  ...rest
}) => {
  let initialY = 0;
  let initialX = 0;

  if (direction === "up") initialY = yOffset;
  else if (direction === "down") initialY = -yOffset;
  else if (direction === "left") initialX = xOffset;
  else if (direction === "right") initialX = -xOffset;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: initialY,
        x: initialX,
        ...(scale ? { scale: 0.97 } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(scale ? { scale: 1 } : {}),
      }}
      viewport={{
        once,
        amount: threshold,
        margin: "-50px 0px -50px 0px",
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface RevealGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

const groupContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export const revealChildVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.1,
  once = true,
  ...rest
}) => {
  return (
    <motion.div
      variants={groupContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: "-40px" }}
      custom={{ staggerDelay, delayChildren }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const RevealChild: React.FC<HTMLMotionProps<"div">> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <motion.div variants={revealChildVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
