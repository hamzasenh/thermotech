"use client";
import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Respecte « réduire les animations » du système pour toutes les animations Framer du site. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

/** Apparition douce à l'entrée dans le viewport. Réservé au contenu sous la ligne de flottaison. */
export function Reveal({ children, delay = 0, className, y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Lévitation continue (visuels produits / technicien), comme le hero de la homepage. */
export function Float({
  children,
  className,
  distance = 10,
  duration = 3,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ translateY: [-distance, distance] }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
