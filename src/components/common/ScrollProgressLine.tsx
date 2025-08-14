"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressLine = () => {
  const { scrollYProgress } = useScroll();

  // Use spring animation for a smooth, natural effect
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // The line will be positioned on the left side of the page
    <motion.div
      className='fixed left-4 top-0 bottom-0 w-1 bg-brand-accent origin-top'
      style={{ scaleY }}
    />
  );
};
