"use client";

import ThemeToggle from "./ThemeToggle";
import styles from "./TopNav.module.css";

export default function TopNav({ onOpenMobileDrawer, activeChatTitle }) {
  return (
    <header className={styles.topNav}>
      <div className={styles.topNavLeft}>
        {/* Mobile Toggle Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={onOpenMobileDrawer}
          aria-label="Open chat sessions menu"
          title="Buka Daftar Chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className={styles.mobileMenuText}>
            {activeChatTitle ? activeChatTitle : "Mibp.dev Chat"}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Desktop Version Badge */}
        <button className={styles.versionBadge} id="version-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>Mibp.dev v4.2</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <nav className={styles.topNavRight}>
        <a href="#" className={`${styles.navLink} ${styles.active}`} id="nav-dashboard">
          Dashboard
        </a>
        <a href="#" className={styles.navLink} id="nav-settings">
          Settings
        </a>
        <a href="#" className={styles.navLink} id="nav-help">
          Help &amp; Support
        </a>
        <ThemeToggle />
        <div className={styles.avatar} id="avatar">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300d2ff'/%3E%3Cstop offset='100%25' stop-color='%233a7bd5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='20' cy='20' r='20' fill='url(%23g)'/%3E%3Ccircle cx='20' cy='16' r='6' fill='%23fff' opacity='.85'/%3E%3Cpath d='M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12' fill='%23fff' opacity='.85'/%3E%3C/svg%3E"
            alt="User avatar"
          />
        </div>
      </nav>
    </header>
  );
}
