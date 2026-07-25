"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./SearchModal.module.css";

const LAST_OPENED = [
  "Rekomendasi Mata Kuliah S2",
  "Roster Mata Kuliah",
];

const RECENT_CHATS = [
  "Masalah Start Server",
  "Apa itu Gmailtick",
  "Perbedaan Cookie Browser",
  "Cara Kirim Email Klarifikasi",
  "Image Editing Request",
  "Replace characters request",
  "Shorten Notification Message",
  "Image Concept Creation",
  "Design Enhancement Guide",
];

export default function SearchModal() {
  const isSearchOpen = useChatStore((state) => state.isSearchOpen);
  const toggleSearchModal = useChatStore((state) => state.toggleSearchModal);
  const selectChat = useChatStore((state) => state.selectChat);

  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Global shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSearchModal();
      }
      if (e.key === "Escape" && isSearchOpen) {
        toggleSearchModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, toggleSearchModal]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  const handleSelect = (title) => {
    selectChat(title);
    toggleSearchModal(false);
  };

  const filteredLastOpened = LAST_OPENED.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRecentChats = RECENT_CHATS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={styles.backdrop}
          onClick={() => toggleSearchModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Row */}
            <div className={styles.inputRow}>
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={styles.closeBtn}
                onClick={() => toggleSearchModal(false)}
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List Area */}
            <div className={styles.resultsArea}>
              {/* Last Opened Section */}
              {filteredLastOpened.length > 0 && (
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Last opened</h4>
                  <ul className={styles.itemList}>
                    {filteredLastOpened.map((item) => (
                      <li
                        key={item}
                        className={styles.item}
                        onClick={() => handleSelect(item)}
                      >
                        <MessageSquare className="w-4 h-4 opacity-75 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recent Chats Section */}
              {filteredRecentChats.length > 0 && (
                <div className={styles.section}>
                  <h4 className={styles.sectionTitle}>Recent chats</h4>
                  <ul className={styles.itemList}>
                    {filteredRecentChats.map((item) => (
                      <li
                        key={item}
                        className={styles.item}
                        onClick={() => handleSelect(item)}
                      >
                        <MessageSquare className="w-4 h-4 opacity-75 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Empty state */}
              {filteredLastOpened.length === 0 && filteredRecentChats.length === 0 && (
                <div className={styles.emptyState}>
                  <p>Tidak ada riwayat chat yang cocok dengan "{query}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
