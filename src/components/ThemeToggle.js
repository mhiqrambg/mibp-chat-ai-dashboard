"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState, useRef, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    if (t === "light") {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    }
    if (t === "dark") {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    }
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
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
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={`${styles.optionBtn} ${theme === "system" ? styles.activeOption : ""}`}
            onClick={() => {
              changeTheme("system");
              setIsOpen(false);
            }}
          >
            {getIcon("system")}
            <span>System</span>
          </button>

          <button
            className={`${styles.optionBtn} ${theme === "light" ? styles.activeOption : ""}`}
            onClick={() => {
              changeTheme("light");
              setIsOpen(false);
            }}
          >
            {getIcon("light")}
            <span>Light</span>
          </button>

          <button
            className={`${styles.optionBtn} ${theme === "dark" ? styles.activeOption : ""}`}
            onClick={() => {
              changeTheme("dark");
              setIsOpen(false);
            }}
          >
            {getIcon("dark")}
            <span>Dark</span>
          </button>
        </div>
      )}
    </div>
  );
}
