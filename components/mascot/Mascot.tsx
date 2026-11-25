"use client";

import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { CamelSvg, type Pose } from "./CamelSvg";

/** Имя PNG-файла в public/images/mascots для каждого раздела. */
export type MascotSlot = "hero" | "about" | "groups" | "nutrition" | "gallery" | "documents" | "contacts";

const POSE_BY_SLOT: Record<MascotSlot, Pose> = {
  hero: "greet",
  about: "wave",
  groups: "blocks",
  nutrition: "fruits",
  gallery: "camera",
  documents: "book",
  contacts: "phone",
};

const MascotFiles = createContext<Partial<Record<MascotSlot, string>>>({});

export function MascotProvider({ files, children }: { files: Partial<Record<MascotSlot, string>>; children: React.ReactNode }) {
  return <MascotFiles.Provider value={files}>{children}</MascotFiles.Provider>;
}

/**
 * Верблюжонок «Жанбота». Если в public/images/mascots есть <slot>.png — показывается PNG,
 * иначе аккуратный SVG того же персонажа. Появление — squash & stretch с лёгким «отскоком».
 */
export function Mascot({ slot, alt, className = "", delay = 0.1 }: { slot: MascotSlot; alt: string; className?: string; delay?: number }) {
  const files = useContext(MascotFiles);
  const src = files[slot];

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: "50% 100%" }}
      initial={{ opacity: 0, y: 28, scaleX: 1.12, scaleY: 0.78 }}
      whileInView={{ opacity: 1, y: [28, -10, 0], scaleX: [1.12, 0.94, 1], scaleY: [0.78, 1.08, 1] }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay, times: [0, 0.6, 1], ease: [0.34, 1.3, 0.64, 1] }}
    >
      <div className="animate-bob">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading={slot === "hero" ? "eager" : "lazy"} decoding="async" className="h-auto w-full object-contain" />
        ) : (
          <CamelSvg pose={POSE_BY_SLOT[slot]} title={alt} className="h-auto w-full overflow-visible" />
        )}
      </div>
    </motion.div>
  );
}
