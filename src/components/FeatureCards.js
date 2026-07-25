"use client";

import { useChatStore } from "@/store/useChatStore";
import { Image, Video, Code, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import styles from "./FeatureCards.module.css";

const CARDS = [
  {
    id: "card-image-gen",
    key: "image",
    title: "Image Generator",
    desc: "Turn ideas into stunning visuals in seconds.",
    prompt: "Buatkan gambar konsep lanskap futuristik dengan gaya Cyberpunk",
    icon: Image,
  },
  {
    id: "card-video-gen",
    key: "video",
    title: "Video Generator",
    desc: "Create cinematic videos from simple prompts.",
    prompt: "Buatkan animasi video 3D gerakan kamera melintasi kota neon",
    icon: Video,
  },
  {
    id: "card-dev-assistant",
    key: "dev",
    title: "Dev Assistant",
    desc: "Accelerate development with intelligent assistance.",
    prompt: "Buatkan function JavaScript async untuk integrasi API Mibp.dev AI",
    icon: Code,
  },
];

export default function FeatureCards() {
  const sendMessage = useChatStore((state) => state.sendMessage);

  return (
    <section className={styles.cards}>
      {CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
            whileHover={{ y: -4 }}
            className={styles.card}
            id={card.id}
            onClick={() => sendMessage(card.prompt)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <Icon className="w-5 h-5" />
              </div>
              <button className={styles.cardArrow} aria-label={`Open ${card.title}`}>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
          </motion.div>
        );
      })}
    </section>
  );
}
