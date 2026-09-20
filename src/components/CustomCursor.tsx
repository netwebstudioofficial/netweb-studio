import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only initialize on desktop devices with fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Event delegation for clickable and interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor="hover"]'
      );

      const projectCard = target.closest('[id^="project-card-"], #view-case-study-btn');

      if (projectCard) {
        setIsHovered(true);
        setCursorText("VIEW");
      } else if (interactive) {
        setIsHovered(true);
        setCursorText(null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Trailing Outer Animated Fluid Ring / Loop */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(163, 255, 18, 0.9)" : "rgba(163, 255, 18, 0.45)",
          backgroundColor: isHovered ? "rgba(163, 255, 18, 0.12)" : "rgba(163, 255, 18, 0.02)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#A3FF12]/40 backdrop-blur-[0.5px] flex items-center justify-center pointer-events-none"
      >
        {/* Optional text inside cursor on project hover */}
        {cursorText && (
          <span className="text-[8px] font-mono font-bold text-[#A3FF12] tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* 2. Inner Sharp Dot Tracker */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovered ? 0.4 : 1,
          opacity: cursorText ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12] pointer-events-none"
      />

      {/* 3. Subtle Ambient Light Halo Loop */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovered ? 0.35 : 0.15,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-[#A3FF12] blur-xl pointer-events-none"
      />
    </div>
  );
};

export default CustomCursor;
