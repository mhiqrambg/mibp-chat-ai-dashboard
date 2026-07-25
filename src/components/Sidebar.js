"use client";

import styles from "./Sidebar.module.css";

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

export default function Sidebar({ activeChatTitle, onSelectChat, onNewChat, onSelectFeature }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {/* Logo */}
        <div className={styles.logoRow}>
          <div className={styles.logo} onClick={onNewChat} style={{ cursor: "pointer" }}>
            <div className={styles.logoOrb} />
            <span className={styles.logoText}>Mibp.dev</span>
          </div>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* New Chat */}
        <button className={styles.newChatBtn} id="new-chat-btn" onClick={onNewChat}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>New Chat</span>
        </button>

        {/* Features */}
        <nav className={styles.section}>
          <h4 className={styles.sectionLabel}>FEATURES</h4>
          <ul className={styles.navList}>
            {FEATURES.map((f) => (
              <li
                key={f.key}
                className={styles.navItem}
                data-page={f.key}
                onClick={() => onSelectFeature && onSelectFeature(f.key)}
              >
                {f.icon}
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Your Chats */}
        <nav className={styles.section}>
          <h4 className={styles.sectionLabel}>YOUR CHATS</h4>
          <ul className={styles.navList}>
            {CHATS.map((c) => (
              <li
                key={c}
                className={`${styles.navItem} ${styles.chatItem} ${
                  activeChatTitle === c ? styles.active : ""
                }`}
                onClick={() => onSelectChat && onSelectChat(c)}
              >
                {c}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Upgrade Card */}
      <div className={styles.upgradeCard}>
        <div className={styles.upgradeCardInner}>
          <div className={styles.upgradeIcon}>
            <div className={styles.upgradeOrb} />
          </div>
          <div className={styles.upgradeInfo}>
            <h5>Upgrade to Pro</h5>
            <p>Get more tools, faster AI, and exclusive features.</p>
            <div className={styles.upgradePrice}>
              <span className={styles.price}>$49</span> /month
            </div>
          </div>
          <button className={styles.upgradeBtn} id="upgrade-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
