"use client";

import { useChatStore } from "@/store/useChatStore";
import { Image, Video, Code, LayoutGrid, FolderKanban, Plus, MessageSquare, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./MobileDrawer.module.css";

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

export default function MobileDrawer() {
  const isMobileDrawerOpen = useChatStore((state) => state.isMobileDrawerOpen);
  const toggleMobileDrawer = useChatStore((state) => state.toggleMobileDrawer);
  const toggleSearchModal = useChatStore((state) => state.toggleSearchModal);
  const activeChat = useChatStore((state) => state.activeChat);
  const selectChat = useChatStore((state) => state.selectChat);
  const newChat = useChatStore((state) => state.newChat);
  const sendMessage = useChatStore((state) => state.sendMessage);

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

  return (
    <AnimatePresence>
      {isMobileDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
          onClick={() => toggleMobileDrawer(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.logo}>
                <div className={styles.logoOrb} />
                <span className={styles.logoText}>Mibp.dev</span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => toggleMobileDrawer(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Input Button */}
            <button
              className={styles.searchBarBtn}
              onClick={() => {
                toggleMobileDrawer(false);
                toggleSearchModal(true);
              }}
            >
              <Search className="w-4 h-4 opacity-70" />
              <span>Cari Chat (Search)...</span>
            </button>

            {/* New Chat Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              className={styles.newChatBtn}
              onClick={() => {
                newChat();
                toggleMobileDrawer(false);
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Sesi Chat Baru</span>
            </motion.button>

            {/* Your Chats Section */}
            <div className={styles.section}>
              <h4 className={styles.sectionLabel}>RIWAYAT CHAT</h4>
              <ul className={styles.navList}>
                {CHATS.map((c) => (
                  <li
                    key={c}
                    className={`${styles.navItem} ${styles.chatItem} ${activeChatTitle === c ? styles.active : ""
                      }`}
                    onClick={() => {
                      selectChat(c);
                      toggleMobileDrawer(false);
                    }}
                  >
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features Section */}
            <div className={styles.section}>
              <h4 className={styles.sectionLabel}>FITUR UTAMA</h4>
              <ul className={styles.navList}>
                {FEATURES.map(({ key, label, icon: Icon }) => (
                  <li
                    key={key}
                    className={styles.navItem}
                    onClick={() => {
                      handleSelectFeature(key);
                      toggleMobileDrawer(false);
                    }}
                  >
                    <Icon className="w-4 h-4 text-sky-400 opacity-80" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
