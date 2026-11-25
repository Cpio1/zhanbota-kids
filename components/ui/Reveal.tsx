"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** Плавное появление при прокрутке (slow in / slow out). Срабатывает один раз. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
  ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" } & Omit<HTMLMotionProps<"div">, "children">) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}
