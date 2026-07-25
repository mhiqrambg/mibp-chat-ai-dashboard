"use client";

import { useChatStore } from "@/store/useChatStore";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const theme = useChatStore((state) => state.theme);
  const setTheme = useChatStore((state) => state.setTheme);
  const initTheme = useChatStore((state) => state.initTheme);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (t) => {
    if (t === "light") return <Sun className="w-4 h-4 text-amber-400" />;
    if (t === "dark") return <Moon className="w-4 h-4 text-sky-400" />;
    return <Monitor className="w-4 h-4 text-slate-400" />;
  };

  const getLabel = (t) => {
    if (t === "light") return "Light";
    if (t === "dark") return "Dark";
    return "System";
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.toggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme"
        title={`Theme: ${getLabel(theme)}`}
      >
        {getIcon(theme)}
        <span className={styles.btnLabel}>{getLabel(theme)}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={styles.dropdown}
          >
            {[
              { key: "system", label: "System", icon: Monitor },
              { key: "light", label: "Light", icon: Sun },
              { key: "dark", label: "Dark", icon: Moon },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`${styles.optionBtn} ${theme === key ? styles.activeOption : ""}`}
                onClick={() => {
                  setTheme(key);
                  setIsOpen(false);
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {theme === key && <Check className="w-3.5 h-3.5 ml-auto text-sky-400" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
