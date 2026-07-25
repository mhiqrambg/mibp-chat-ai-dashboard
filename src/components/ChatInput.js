"use client";

import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Sparkles, Plus, Wrench, Brain, Mic, Send, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import styles from "./ChatInput.module.css";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const activeTools = useChatStore((state) => state.activeTools);
  const deepThink = useChatStore((state) => state.deepThink);
  const toggleDeepThink = useChatStore((state) => state.toggleDeepThink);
  const toggleModal = useChatStore((state) => state.toggleModal);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.inputRow}>
          <Sparkles className="w-5 h-5 text-sky-400 animate-pulse flex-shrink-0" />
          <input
            type="text"
            id="chat-input"
            className={styles.input}
            placeholder="Ask me anything..."
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.actionsLeft}>
            {/* Attach / Upload File Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={styles.circleBtn}
              id="attach-btn"
              aria-label="Attach File / Upload"
              title="Upload Image & Files"
              onClick={() => toggleModal("isUploadOpen", true)}
            >
              <Plus className="w-4 h-4" />
            </motion.button>

            {/* Tools Button -> Opens AI Tools Modal */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`${styles.pillBtn} ${activeTools ? styles.activePill : ""}`}
              id="tools-btn"
              onClick={() => toggleModal("isToolsOpen", true)}
              title="Select AI Tools"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Tools</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </motion.button>

            {/* Deep Think Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`${styles.pillBtn} ${deepThink ? styles.activePill : ""}`}
              id="deep-think-btn"
              onClick={toggleDeepThink}
              title="Toggle Deep Think Mode"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Deep Think</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </motion.button>
          </div>

          <div className={styles.actionsRight}>
            {/* Voice Input Button -> Opens Voice Recording Modal */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`${styles.pillBtn} ${styles.voiceBtn}`}
              id="voice-btn"
              title="Voice Recording Input"
              onClick={() => toggleModal("isVoiceOpen", true)}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice</span>
            </motion.button>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className={styles.sendBtn}
              id="send-btn"
              aria-label="Send"
              onClick={handleSend}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
