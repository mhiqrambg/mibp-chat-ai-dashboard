"use client";

import styles from "./FeatureCards.module.css";

const CARDS = [
  {
    id: "card-image-gen",
    key: "image",
    title: "Image Generator",
    desc: "Turn ideas into stunning visuals in seconds.",
    prompt: "Buatkan gambar konsep lanskap futuristik dengan gaya Cyberpunk",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: "card-video-gen",
    key: "video",
    title: "Video Generator",
    desc: "Create cinematic videos from simple prompts.",
    prompt: "Buatkan animasi video 3D gerakan kamera melintasi kota neon",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    id: "card-dev-assistant",
    key: "dev",
    title: "Dev Assistant",
    desc: "Accelerate development with intelligent assistance.",
    prompt: "Buatkan function JavaScript async untuk integrasi API Mibp.dev AI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function FeatureCards({ onCardClick }) {
  return (
    <section className={styles.cards}>
      {CARDS.map((card, idx) => (
        <div
          key={card.id}
          className={styles.card}
          id={card.id}
          style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
          onClick={() => onCardClick && onCardClick(card.prompt)}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>{card.icon}</div>
            <button className={styles.cardArrow} aria-label={`Open ${card.title}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardDesc}>{card.desc}</p>
        </div>
      ))}
    </section>
  );
}
