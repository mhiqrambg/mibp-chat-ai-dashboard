"use client";

import { useChatStore } from "@/store/useChatStore";
import { Image, Video, Code, LayoutGrid, FolderKanban, Search, Plus, Crown, PanelLeftClose } from "lucide-react";
import { motion } from "motion/react";
import styles from "./Sidebar.module.css";

const FEATURES = [
  { key: "images", label: "Images", icon: Image },
  { key: "videos", label: "Videos", icon: Video },
  { key: "apps", label: "Apps", icon: LayoutGrid },
  { key: "projects", label: "Projects", icon: FolderKanban },
];

const CHATS = [
  "Image Editing Request",
  "Replace characters request",
  "Shorten Notification Message",
  "Image Concept Creation",
  "Design Enhancement Guide",
];

export default function Sidebar() {
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);
  const activeChat = useChatStore((state) => state.activeChat);
  const selectChat = useChatStore((state) => state.selectChat);
  const newChat = useChatStore((state) => state.newChat);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const toggleSearchModal = useChatStore((state) => state.toggleSearchModal);
  const toggleModal = useChatStore((state) => state.toggleModal);

  const activeChatTitle = activeChat ? activeChat.title : null;

  const handleSelectFeature = (key) => {
    const featurePrompts = {
      images: "Buatkan gambaran konsep visual desain poster AI modern dengan tema Glassmorphism",
      videos: "Buatkan skenario video animasi cinematic 3D berdurasi 15 detik",
      codex: "Buatkan komponen React Next.js untuk sistem data table interaktif",
      apps: "Bagaimana cara merancang arsitektur microservices untuk aplikasi AI Dashboard?",
      projects: "Tampilkan ringkasan status proyek Mibp.dev v4.2 terkini",
    };
    if (featurePrompts[key]) {
      sendMessage(featurePrompts[key]);
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {/* Logo & Controls Header */}
        <div className={styles.logoRow}>
          <div className={styles.logo} onClick={newChat} style={{ cursor: "pointer" }}>
            <span className={styles.logoText}>Mibp.dev</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              className={styles.iconBtn}
              aria-label="Search"
              onClick={() => toggleSearchModal(true)}
              title="Pencarian (Cmd+K)"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              className={styles.iconBtn}
              aria-label="Hide Sidebar"
              onClick={() => toggleSidebar(false)}
              title="Sembunyikan Sidebar"
            >
              <PanelLeftClose className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={styles.navItem}
          id="new-chat-btn"
          onClick={newChat}
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </motion.button>

        {/* Features */}
        <nav className={styles.section}>
          <h4 className={styles.sectionLabel}>FEATURES</h4>
          <ul className={styles.navList}>
            {FEATURES.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className={styles.navItem}
                data-page={key}
                onClick={() => handleSelectFeature(key)}
              >
                <Icon className="w-4 h-4 text-sky-400 opacity-80" />
                <span>{label}</span>
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
                className={`${styles.navItem} ${styles.chatItem} ${activeChatTitle === c ? styles.active : ""
                  }`}
                onClick={() => selectChat(c)}
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.upgradeBtn}
            id="upgrade-btn"
            onClick={() => toggleModal("isUpgradeOpen", true)}
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade Now
          </motion.button>
        </div>
      </div>
    </aside>
  );
}
