"use client";

import styles from "./MobileDrawer.module.css";

const FEATURES = [
  {
    key: "images",
    label: "Images",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    key: "videos",
    label: "Videos",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    key: "codex",
    label: "Codex",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: "apps",
    label: "Apps",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: "projects",
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const CHATS = [
  "Image Editing Request",
  "Replace characters request",
  "Shorten Notification Message",
  "Image Concept Creation",
  "Design Enhancement Guide",
];

export default function MobileDrawer({ isOpen, onClose, activeChatTitle, onSelectChat, onNewChat, onSelectFeature }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <div className={styles.logo}>
            <div className={styles.logoOrb} />
            <span className={styles.logoText}>Mibp.dev</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <button
          className={styles.newChatBtn}
          onClick={() => {
            onNewChat();
            onClose();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>Sesi Chat Baru</span>
        </button>

        {/* Your Chats Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionLabel}>RIWAYAT CHAT</h4>
          <ul className={styles.navList}>
            {CHATS.map((c) => (
              <li
                key={c}
                className={`${styles.navItem} ${styles.chatItem} ${
                  activeChatTitle === c ? styles.active : ""
                }`}
                onClick={() => {
                  onSelectChat(c);
                  onClose();
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Features Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionLabel}>FITUR UTAMA</h4>
          <ul className={styles.navList}>
            {FEATURES.map((f) => (
              <li
                key={f.key}
                className={styles.navItem}
                onClick={() => {
                  onSelectFeature(f.key);
                  onClose();
                }}
              >
                {f.icon}
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
