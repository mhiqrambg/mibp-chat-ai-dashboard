"use client";

import { motion } from "motion/react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.globeContainer}>
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={styles.globe}
        >
          {/* Futuristic AI Skull Icon - Electric Yellow Glow Theme */}
          <svg
            className={styles.aiSkullSvg}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffea00" />
                <stop offset="50%" stopColor="#ffb700" />
                <stop offset="100%" stopColor="#ff8800" />
              </linearGradient>
              <linearGradient id="glowEye" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffea00" />
              </linearGradient>
              <filter id="skullNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Neural Circuit Lines Background */}
            <path
              d="M50 10 V25 M30 20 L40 30 M70 20 L60 30 M20 50 H30 M80 50 H70"
              stroke="#ffea00"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.75"
            />

            {/* Skull Outline */}
            <path
              d="M50 18 C32 18 22 30 22 46 C22 56 26 62 30 68 C34 74 36 78 38 84 H62 C64 78 66 74 70 68 C74 62 78 56 78 46 C78 30 68 18 50 18 Z"
              fill="url(#skullGrad)"
              fillOpacity="0.25"
              stroke="url(#skullGrad)"
              strokeWidth="2.5"
              filter="url(#skullNeonGlow)"
            />

            {/* Glowing Eye Sockets */}
            <ellipse cx="38" cy="46" rx="8" ry="10" fill="#0c0a02" stroke="url(#skullGrad)" strokeWidth="2" />
            <circle cx="38" cy="46" r="3.5" fill="url(#glowEye)" filter="url(#skullNeonGlow)" />

            <ellipse cx="62" cy="46" rx="8" ry="10" fill="#0c0a02" stroke="url(#skullGrad)" strokeWidth="2" />
            <circle cx="62" cy="46" r="3.5" fill="url(#glowEye)" filter="url(#skullNeonGlow)" />

            {/* Triangular Cyber Nose */}
            <polygon points="50,54 45,62 55,62" fill="url(#skullGrad)" opacity="0.9" />

            {/* Cybernetic Teeth & Jaw Details */}
            <path d="M40 76 V82 M45 76 V82 M50 76 V82 M55 76 V82 M60 76 V82" stroke="#ffea00" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="76" x2="62" y2="76" stroke="#ffea00" strokeWidth="2" />

            {/* Forehead Tech Emblem */}
            <polygon points="50,26 44,34 56,34" fill="none" stroke="#ffea00" strokeWidth="1.5" />
            <circle cx="50" cy="30" r="1.5" fill="#ffffff" />
          </svg>
        </motion.div>
        <div className={styles.globeGlow} />
      </div>

      <p className={styles.heroLabel}>W E L C O M E &nbsp; B A C K</p>
      <h1 className={styles.heroTitle}>Bring your ideas to life today</h1>
    </section>
  );
}
