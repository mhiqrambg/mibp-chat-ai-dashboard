"use client";

import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import styles from "./ChatFeed.module.css";

export default function ChatFeed() {
  const activeChat = useChatStore((state) => state.activeChat);
  const isThinking = useChatStore((state) => state.isThinking);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!activeChat || !activeChat.messages) return null;

  return (
    <div className={styles.container}>
      {/* Messages List - ChatGPT / Claude Style */}
      <div className={styles.messagesList}>
        {activeChat.messages.map((msg, index) => {
          const isUser = msg.sender === "user";

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}
            >
              {/* Avatar (AI only) */}
              {!isUser && (
                <div className={styles.avatarWrapper}>
                  <div className={styles.aiOrb} />
                </div>
              )}

              {/* Message Content Body */}
              <div className={styles.messageBody}>
                <div className={styles.senderMeta}>
                  <span className={styles.senderName}>{isUser ? "You" : "Mibp.dev AI"}</span>
                  <span className={styles.time}>{msg.time}</span>
                </div>

                <div className={`${styles.contentWrapper} ${isUser ? styles.userContent : styles.aiContent}`}>
                  <p className={styles.textParagraph}>{msg.text}</p>

                  {/* Media output (Image/Video visual preview) */}
                  {msg.media && (
                    <div className={styles.mediaContainer}>
                      <div className={styles.mediaHeader}>
                        <span>{msg.media.title}</span>
                        <span className={styles.badge}>{msg.media.type.toUpperCase()}</span>
                      </div>
                      <div
                        className={styles.mediaPreview}
                        dangerouslySetInnerHTML={{ __html: msg.media.svgPreview }}
                      />
                    </div>
                  )}

                  {/* Code snippet */}
                  {msg.codeSnippet && (
                    <div className={styles.codeBlock}>
                      <div className={styles.codeHeader}>
                        <span className={styles.codeLang}>{msg.codeSnippet.language}</span>
                        <button
                          className={styles.codeCopyBtn}
                          onClick={() => handleCopy(msg.codeSnippet.code, `code-${msg.id}`)}
                          title="Copy code"
                        >
                          {copiedId === `code-${msg.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 opacity-80" />
                              <span>Copy code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre>
                        <code>{msg.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Checklists */}
                  {msg.checklists && (
                    <div className={styles.checklistGrid}>
                      {msg.checklists.map((item, idx) => (
                        <div key={idx} className={styles.checkCard}>
                          <div className={styles.checkCardTop}>
                            <span className={styles.checkTitle}>{item.title}</span>
                            <span
                              className={`${styles.statusBadge} ${
                                item.status === "Done" ? styles.doneBadge : styles.recBadge
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className={styles.checkDesc}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestion prompt pills */}
                  {msg.suggestions && (
                    <div className={styles.suggestionPills}>
                      {msg.suggestions.map((sug, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className={styles.sugPill}
                          onClick={() => sendMessage(sug)}
                        >
                          <Sparkles className="w-3 h-3 text-sky-400 inline mr-1" />
                          {sug}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Bottom Action Bar (Icons for Copy, Regenerate/Restart, Like, Dislike) */}
                {!isUser && (
                  <div className={styles.bottomActionBar}>
                    {/* Copy Icon */}
                    <button
                      className={styles.iconActionBtn}
                      onClick={() => handleCopy(msg.text + (msg.codeSnippet ? "\n" + msg.codeSnippet.code : ""), msg.id)}
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-80" />
                      )}
                    </button>

                    {/* Regenerate / Restart Icon */}
                    <button
                      className={styles.iconActionBtn}
                      onClick={() => {
                        const prevUserMsg = [...activeChat.messages].reverse().find((m) => m.sender === "user");
                        if (prevUserMsg) {
                          sendMessage(prevUserMsg.text);
                        }
                      }}
                      title="Regenerate / Restart response"
                    >
                      <RotateCcw className="w-3.5 h-3.5 opacity-80" />
                    </button>

                    {/* Thumbs Up Icon */}
                    <button className={styles.iconActionBtn} title="Good response">
                      <ThumbsUp className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* Thumbs Down Icon */}
                    <button className={styles.iconActionBtn} title="Bad response">
                      <ThumbsDown className="w-3.5 h-3.5 opacity-70" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className={`${styles.messageRow} ${styles.aiRow}`}>
            <div className={styles.avatarWrapper}>
              <div className={`${styles.aiOrb} ${styles.pulseOrb}`} />
            </div>
            <div className={styles.messageBody}>
              <div className={styles.senderMeta}>
                <span className={styles.senderName}>Mibp.dev AI</span>
                <span className={styles.time}>Just now</span>
              </div>
              <div className={styles.thinkingContainer}>
                <div className={styles.typingDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.thinkingText}>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
