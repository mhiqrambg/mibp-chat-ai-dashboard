"use client";

import { useState } from "react";
import styles from "./ChatFeed.module.css";

export default function ChatFeed({ chat, isThinking, onSendMessage, onRegenerate }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!chat || !chat.messages) return null;

  return (
    <div className={styles.container}>
      {/* Messages List - ChatGPT / Claude Style */}
      <div className={styles.messagesList}>
        {chat.messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          const isLastAi = !isUser && index === chat.messages.length - 1;

          return (
            <div key={msg.id} className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}>
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
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span style={{ color: "#2ecc71" }}>Copied!</span>
                            </>
                          ) : (
                            <>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
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
                        <button
                          key={i}
                          className={styles.sugPill}
                          onClick={() => onSendMessage && onSendMessage(sug)}
                        >
                          ✦ {sug}
                        </button>
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
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>

                    {/* Regenerate / Restart Icon */}
                    <button
                      className={styles.iconActionBtn}
                      onClick={() => {
                        const prevUserMsg = [...chat.messages].reverse().find((m) => m.sender === "user");
                        if (prevUserMsg && onSendMessage) {
                          onSendMessage(prevUserMsg.text);
                        }
                      }}
                      title="Regenerate / Restart response"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                      </svg>
                    </button>

                    {/* Thumbs Up Icon */}
                    <button className={styles.iconActionBtn} title="Good response">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </button>

                    {/* Thumbs Down Icon */}
                    <button className={styles.iconActionBtn} title="Bad response">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
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
