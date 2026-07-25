"use client";

import ThemeToggle from "./ThemeToggle";
import { useChatStore } from "@/store/useChatStore";
import { Menu, Globe, ChevronDown, Search, PanelLeftOpen } from "lucide-react";
import styles from "./TopNav.module.css";

export default function TopNav() {
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);
  const activeChat = useChatStore((state) => state.activeChat);
  const toggleMobileDrawer = useChatStore((state) => state.toggleMobileDrawer);
  const toggleSearchModal = useChatStore((state) => state.toggleSearchModal);
  const toggleModal = useChatStore((state) => state.toggleModal);

  const activeChatTitle = activeChat ? activeChat.title : null;

  return (
    <header className={styles.topNav}>
      <div className={styles.topNavLeft}>
        {/* Toggle Show Sidebar Button (When Sidebar is hidden) */}
        {!isSidebarOpen && (
          <button
            className={styles.sidebarToggleBtn}
            onClick={() => toggleSidebar(true)}
            aria-label="Show Sidebar"
            title="Tampilkan Sidebar"
          >
            <PanelLeftOpen className="w-4.5 h-4.5 text-sky-400" />
          </button>
        )}

        {/* Mobile Toggle Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => toggleMobileDrawer(true)}
          aria-label="Open chat sessions menu"
          title="Buka Daftar Chat"
        >
          <Menu className="w-4.5 h-4.5" />
          <span className={styles.mobileMenuText}>
            {activeChatTitle ? activeChatTitle : "Mibp.dev Chat"}
          </span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>

        {/* Desktop Version Badge */}
        <button
          className={styles.versionBadge}
          id="version-badge"
          onClick={() => toggleModal("isUpgradeOpen", true)}
        >
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Mibp.dev v4.2</span>
          <ChevronDown className="w-3 h-3 opacity-70" />
        </button>
      </div>

      <nav className={styles.topNavRight}>
        <a
          href="#"
          className={`${styles.navLink} ${styles.active}`}
          id="nav-dashboard"
          onClick={(e) => { e.preventDefault(); }}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={styles.navLink}
          id="nav-settings"
          onClick={(e) => { e.preventDefault(); toggleModal("isSettingsOpen", true); }}
        >
          Settings
        </a>
        <a
          href="#"
          className={styles.navLink}
          id="nav-help"
          onClick={(e) => { e.preventDefault(); toggleModal("isHelpOpen", true); }}
        >
          Help &amp; Support
        </a>

        {/* Mobile Search Button */}
        <button
          className={styles.mobileSearchBtn}
          onClick={() => toggleSearchModal(true)}
          aria-label="Search chats"
          title="Pencarian Chat"
        >
          <Search className="w-4 h-4" />
        </button>

        <ThemeToggle />

        {/* Avatar -> opens Profile Modal */}
        <div
          className={styles.avatar}
          id="avatar"
          onClick={() => toggleModal("isProfileOpen", true)}
          title="Profile & Account"
        >
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300d2ff'/%3E%3Cstop offset='100%25' stop-color='%233a7bd5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='20' cy='20' r='20' fill='url(%23g)'/%3E%3Ccircle cx='20' cy='16' r='6' fill='%23fff' opacity='.85'/%3E%3Cpath d='M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12' fill='%23fff' opacity='.85'/%3E%3C/svg%3E"
            alt="User avatar"
          />
        </div>
      </nav>
    </header>
  );
}
