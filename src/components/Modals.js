"use client";

import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import {
  X, Settings, CreditCard, Upload, Cloud, Wrench, Brain, Mic, MicOff,
  User, LogOut, Bell, Globe, Shield, Palette, ChevronRight, Check,
  Search as SearchIcon, Code, Image, Calculator, FileText, Zap,
  HelpCircle, MessageCircle, Book, Mail, ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Modals.module.css";

/* ═══════════════════════════════════════════════
   Reusable overlay shell
   ═══════════════════════════════════════════════ */
function ModalShell({ isOpen, onClose, title, icon: Icon, children, wide }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.backdrop}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`${styles.modal} ${wide ? styles.wide : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                {Icon && <Icon className="w-5 h-5 text-sky-400" />}
                <h3>{title}</h3>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            <div className={styles.modalBody}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════
   1 ▸ Settings Modal
   ═══════════════════════════════════════════════ */
function SettingsModal() {
  const isOpen = useChatStore((s) => s.isSettingsOpen);
  const toggle = useChatStore((s) => s.toggleModal);
  const theme = useChatStore((s) => s.theme);
  const setTheme = useChatStore((s) => s.setTheme);

  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("id");
  const [model, setModel] = useState("mibp-v4.2");

  return (
    <ModalShell isOpen={isOpen} onClose={() => toggle("isSettingsOpen", false)} title="Settings" icon={Settings}>
      {/* Appearance */}
      <div className={styles.settingsGroup}>
        <h4 className={styles.groupTitle}><Palette className="w-4 h-4" /> Appearance</h4>
        <div className={styles.settingRow}>
          <span>Theme</span>
          <select className={styles.select} value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className={styles.settingRow}>
          <span>Language</span>
          <select className={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="id">Indonesia</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      {/* AI Model */}
      <div className={styles.settingsGroup}>
        <h4 className={styles.groupTitle}><Brain className="w-4 h-4" /> AI Model</h4>
        <div className={styles.settingRow}>
          <span>Default Model</span>
          <select className={styles.select} value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="mibp-v4.2">Mibp.dev v4.2</option>
            <option value="mibp-v4.2-pro">Mibp.dev v4.2 Pro</option>
            <option value="mibp-v5-preview">Mibp.dev v5 Preview</option>
          </select>
        </div>
        <div className={styles.settingRow}>
          <span>Streaming Responses</span>
          <label className={styles.toggle}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider} />
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className={styles.settingsGroup}>
        <h4 className={styles.groupTitle}><Bell className="w-4 h-4" /> Notifications</h4>
        <div className={styles.settingRow}>
          <span>Push Notifications</span>
          <label className={styles.toggle}>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
            <span className={styles.slider} />
          </label>
        </div>
        <div className={styles.settingRow}>
          <span>Email Digest</span>
          <label className={styles.toggle}>
            <input type="checkbox" defaultChecked={false} />
            <span className={styles.slider} />
          </label>
        </div>
      </div>

      {/* Privacy */}
      <div className={styles.settingsGroup}>
        <h4 className={styles.groupTitle}><Shield className="w-4 h-4" /> Privacy &amp; Data</h4>
        <div className={styles.settingRow}>
          <span>Save Chat History</span>
          <label className={styles.toggle}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider} />
          </label>
        </div>
        <button className={styles.dangerBtn}>Delete All Chats</button>
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   2 ▸ Upgrade Modal
   ═══════════════════════════════════════════════ */
function UpgradeModal() {
  const isOpen = useChatStore((s) => s.isUpgradeOpen);
  const toggle = useChatStore((s) => s.toggleModal);
  const [selected, setSelected] = useState("pro");

  const plans = [
    {
      id: "free", name: "Free", price: "$0", period: "/month",
      features: ["5 chats/day", "Basic AI model", "Standard speed", "Community support"],
    },
    {
      id: "pro", name: "Pro", price: "$49", period: "/month", popular: true,
      features: ["Unlimited chats", "Mibp.dev v4.2 Pro", "Priority speed", "Image & Video Gen", "Deep Think mode", "Email support"],
    },
    {
      id: "enterprise", name: "Enterprise", price: "$199", period: "/month",
      features: ["Everything in Pro", "Custom AI models", "API access", "Team collaboration", "SSO & SAML", "Dedicated support"],
    },
  ];

  return (
    <ModalShell isOpen={isOpen} onClose={() => toggle("isUpgradeOpen", false)} title="Upgrade Plan" icon={CreditCard} wide>
      <div className={styles.planGrid}>
        {plans.map((p) => (
          <div
            key={p.id}
            className={`${styles.planCard} ${selected === p.id ? styles.planSelected : ""} ${p.popular ? styles.planPopular : ""}`}
            onClick={() => setSelected(p.id)}
          >
            {p.popular && <span className={styles.popularBadge}>Most Popular</span>}
            <h4>{p.name}</h4>
            <div className={styles.planPrice}>{p.price}<span>{p.period}</span></div>
            <ul className={styles.planFeatures}>
              {p.features.map((f, i) => (
                <li key={i}><Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> {f}</li>
              ))}
            </ul>
            <button className={`${styles.planBtn} ${selected === p.id ? styles.planBtnActive : ""}`}>
              {p.id === "free" ? "Current Plan" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   3 ▸ Upload Modal
   ═══════════════════════════════════════════════ */
function UploadModal() {
  const isOpen = useChatStore((s) => s.isUploadOpen);
  const toggle = useChatStore((s) => s.toggleModal);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const items = Array.from(newFiles).map((f) => ({
      name: f.name,
      size: (f.size / 1024).toFixed(1) + " KB",
      type: f.type.startsWith("image") ? "image" : "file",
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  const handleUpload = () => {
    if (files.length) {
      sendMessage(`[Uploaded ${files.length} file(s): ${files.map((f) => f.name).join(", ")}] Analisis file ini.`);
      setFiles([]);
      toggle("isUploadOpen", false);
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={() => { toggle("isUploadOpen", false); setFiles([]); }} title="Upload Files" icon={Upload}>
      <div
        className={`${styles.dropZone} ${dragging ? styles.dropActive : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <Cloud className="w-10 h-10 text-sky-400 opacity-60" />
        <p>Drag & drop files here, or <span className={styles.browseLink}>browse</span></p>
        <span className={styles.dropHint}>Supports images, documents, code files (max 25MB)</span>
        <input ref={inputRef} type="file" multiple hidden onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((f, i) => (
            <div key={i} className={styles.fileItem}>
              <FileText className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span className={styles.fileName}>{f.name}</span>
              <span className={styles.fileSize}>{f.size}</span>
              <button className={styles.fileRemove} onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button className={styles.uploadBtn} onClick={handleUpload}>
            <Upload className="w-4 h-4" /> Upload & Analyze
          </button>
        </div>
      )}
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   4 ▸ Tools Panel
   ═══════════════════════════════════════════════ */
function ToolsPanel() {
  const isOpen = useChatStore((s) => s.isToolsOpen);
  const toggle = useChatStore((s) => s.toggleModal);
  const sendMessage = useChatStore((s) => s.sendMessage);

  const tools = [
    { icon: SearchIcon, name: "Web Search", desc: "Search the internet in real-time", prompt: "Cari informasi terbaru tentang AI Agents 2025" },
    { icon: Calculator, name: "Calculator", desc: "Solve math & computations", prompt: "Hitung integral dari x^3 + 2x^2 - 5x + 3" },
    { icon: Code, name: "Code Runner", desc: "Execute code snippets live", prompt: "Jalankan kode Python: print(sum(range(1, 101)))" },
    { icon: Image, name: "Image Analysis", desc: "Analyze & describe images", prompt: "Analisis gambar yang saya upload dan berikan deskripsi detail" },
    { icon: FileText, name: "Document Reader", desc: "Parse PDFs & documents", prompt: "Baca dan rangkum dokumen PDF yang saya upload" },
    { icon: Globe, name: "Translator", desc: "Translate between languages", prompt: "Terjemahkan teks berikut ke bahasa Inggris: Selamat datang di Mibp.dev AI Dashboard" },
  ];

  return (
    <ModalShell isOpen={isOpen} onClose={() => toggle("isToolsOpen", false)} title="AI Tools" icon={Wrench}>
      <div className={styles.toolsGrid}>
        {tools.map((t, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.toolCard}
            onClick={() => {
              sendMessage(t.prompt);
              toggle("isToolsOpen", false);
            }}
          >
            <div className={styles.toolIcon}><t.icon className="w-5 h-5" /></div>
            <div>
              <h5 className={styles.toolName}>{t.name}</h5>
              <p className={styles.toolDesc}>{t.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 opacity-40 ml-auto flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   5 ▸ Voice Recording Modal
   ═══════════════════════════════════════════════ */
function VoiceModal() {
  const isOpen = useChatStore((s) => s.isVoiceOpen);
  const toggle = useChatStore((s) => s.toggleModal);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const startRecording = () => {
    setRecording(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stopRecording = () => {
    setRecording(false);
    clearInterval(timerRef.current);
    sendMessage("[Voice message — " + seconds + "s] Tolong transkripsikan dan jawab pesan suara ini.");
    setSeconds(0);
    toggle("isVoiceOpen", false);
  };

  const cancel = () => {
    setRecording(false);
    clearInterval(timerRef.current);
    setSeconds(0);
    toggle("isVoiceOpen", false);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <ModalShell isOpen={isOpen} onClose={cancel} title="Voice Input" icon={Mic}>
      <div className={styles.voiceCenter}>
        <motion.button
          animate={recording ? { scale: [1, 1.15, 1] } : {}}
          transition={recording ? { duration: 1.2, repeat: Infinity } : {}}
          className={`${styles.voiceOrb} ${recording ? styles.voiceActive : ""}`}
          onClick={recording ? stopRecording : startRecording}
        >
          {recording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </motion.button>

        <span className={styles.voiceTimer}>{formatTime(seconds)}</span>
        <p className={styles.voiceHint}>
          {recording ? "Tap to stop & send" : "Tap to start recording"}
        </p>

        {/* Simulated waveform */}
        {recording && (
          <div className={styles.waveform}>
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                animate={{ height: [4, 12 + Math.random() * 20, 4] }}
                transition={{ duration: 0.4 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.04 }}
                className={styles.waveBar}
              />
            ))}
          </div>
        )}
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   6 ▸ Profile Dropdown Modal
   ═══════════════════════════════════════════════ */
function ProfileModal() {
  const isOpen = useChatStore((s) => s.isProfileOpen);
  const toggle = useChatStore((s) => s.toggleModal);

  return (
    <ModalShell isOpen={isOpen} onClose={() => toggle("isProfileOpen", false)} title="Profile" icon={User}>
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2300d2ff'/%3E%3Cstop offset='100%25' stop-color='%233a7bd5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='40' cy='40' r='40' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='32' r='12' fill='%23fff' opacity='.85'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24' fill='%23fff' opacity='.85'/%3E%3C/svg%3E"
            alt="Avatar"
          />
        </div>
        <div>
          <h4 className={styles.profileName}>Mhiqram BG</h4>
          <p className={styles.profileEmail}>aghiyaramadh@gmail.com</p>
          <span className={styles.profilePlan}>Free Plan</span>
        </div>
      </div>

      <div className={styles.profileStats}>
        <div className={styles.statCard}><span className={styles.statValue}>42</span><span className={styles.statLabel}>Chats</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>156</span><span className={styles.statLabel}>Messages</span></div>
        <div className={styles.statCard}><span className={styles.statValue}>3.2K</span><span className={styles.statLabel}>Tokens</span></div>
      </div>

      <div className={styles.profileMenu}>
        <button className={styles.profileMenuItem} onClick={() => { toggle("isProfileOpen", false); toggle("isSettingsOpen", true); }}>
          <Settings className="w-4 h-4" /> Account Settings <ChevronRight className="w-4 h-4 opacity-40 ml-auto" />
        </button>
        <button className={styles.profileMenuItem} onClick={() => { toggle("isProfileOpen", false); toggle("isUpgradeOpen", true); }}>
          <Zap className="w-4 h-4 text-amber-400" /> Upgrade Plan <ChevronRight className="w-4 h-4 opacity-40 ml-auto" />
        </button>
        <button className={styles.profileMenuItem}>
          <Globe className="w-4 h-4" /> API Keys <ChevronRight className="w-4 h-4 opacity-40 ml-auto" />
        </button>
        <button className={`${styles.profileMenuItem} ${styles.logoutBtn}`}>
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   7 ▸ Help & Support Modal
   ═══════════════════════════════════════════════ */
function HelpModal() {
  const isOpen = useChatStore((s) => s.isHelpOpen);
  const toggle = useChatStore((s) => s.toggleModal);

  const items = [
    { icon: Book, title: "Documentation", desc: "Browse guides and tutorials", link: "#" },
    { icon: MessageCircle, title: "Live Chat", desc: "Talk to our support team", link: "#" },
    { icon: Mail, title: "Email Support", desc: "support@mibp.dev", link: "mailto:support@mibp.dev" },
    { icon: HelpCircle, title: "FAQ", desc: "Frequently asked questions", link: "#" },
  ];

  return (
    <ModalShell isOpen={isOpen} onClose={() => toggle("isHelpOpen", false)} title="Help & Support" icon={HelpCircle}>
      <div className={styles.helpGrid}>
        {items.map((it, i) => (
          <a key={i} href={it.link} className={styles.helpCard}>
            <it.icon className="w-6 h-6 text-sky-400" />
            <div>
              <h5>{it.title}</h5>
              <p>{it.desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 opacity-40 ml-auto flex-shrink-0" />
          </a>
        ))}
      </div>

      <div className={styles.helpFooter}>
        <p>Mibp.dev AI Dashboard v4.2 — Built with ❤️</p>
      </div>
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════════
   Export: All Modals Container
   ═══════════════════════════════════════════════ */
export default function Modals() {
  return (
    <>
      <SettingsModal />
      <UpgradeModal />
      <UploadModal />
      <ToolsPanel />
      <VoiceModal />
      <ProfileModal />
      <HelpModal />
    </>
  );
}
