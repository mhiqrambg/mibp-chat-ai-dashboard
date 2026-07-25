"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import ChatInput from "@/components/ChatInput";
import FeatureCards from "@/components/FeatureCards";
import ChatFeed from "@/components/ChatFeed";
import MobileDrawer from "@/components/MobileDrawer";
import { ThemeProvider } from "@/context/ThemeContext";
import { MOCK_CHATS, generateMockApiResponse } from "@/data/mockData";
import styles from "./page.module.css";

export default function Home() {
  const [activeChat, setActiveChat] = useState(null); // null = Hero view, object = Active chat
  const [isThinking, setIsThinking] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Handle selecting a chat from the sidebar or mobile drawer
  const handleSelectChat = (title) => {
    if (MOCK_CHATS[title]) {
      setActiveChat(JSON.parse(JSON.stringify(MOCK_CHATS[title])));
    }
  };

  // Handle starting a new chat
  const handleNewChat = () => {
    setActiveChat(null);
  };

  // Handle selecting a feature category
  const handleSelectFeature = (key) => {
    const featurePrompts = {
      images: "Buatkan gambaran konsep visual desain poster AI modern dengan tema Glassmorphism",
      videos: "Buatkan skenario video animasi cinematic 3D berdurasi 15 detik",
      codex: "Buatkan komponen React Next.js untuk sistem data table interaktif",
      apps: "Bagaimana cara merancang arsitektur microservices untuk aplikasi AI Dashboard?",
      projects: "Tampilkan ringkasan status proyek Mibp.dev v4.2 terkini",
    };
    if (featurePrompts[key]) {
      handleSendMessage(featurePrompts[key]);
    }
  };

  // Handle sending a new message
  const handleSendMessage = (text) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: text,
      time: timeStr,
    };

    let currentChat = activeChat;
    if (!currentChat) {
      currentChat = {
        id: "chat-new-" + Date.now(),
        title: text.length > 25 ? text.slice(0, 25) + "..." : text,
        messages: [userMessage],
      };
    } else {
      currentChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
      };
    }

    setActiveChat(currentChat);
    setIsThinking(true);

    // Simulate real-time API response delay
    setTimeout(() => {
      const aiResponse = generateMockApiResponse(text);
      setActiveChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, aiResponse],
        };
      });
      setIsThinking(false);
    }, 1200);
  };

  return (
    <ThemeProvider>
      <div className={styles.appWrapper}>
        <Sidebar
          activeChatTitle={activeChat ? activeChat.title : null}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onSelectFeature={handleSelectFeature}
        />

        <MobileDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          activeChatTitle={activeChat ? activeChat.title : null}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onSelectFeature={handleSelectFeature}
        />

        <main className={styles.mainContent}>
          <TopNav
            onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
            activeChatTitle={activeChat ? activeChat.title : null}
          />

          <div className={styles.contentScrollArea}>
            {activeChat ? (
              <ChatFeed
                chat={activeChat}
                isThinking={isThinking}
                onSendMessage={handleSendMessage}
                onBackToHero={handleNewChat}
              />
            ) : (
              <>
                <Hero />
                <FeatureCards onCardClick={handleSendMessage} />
              </>
            )}
          </div>

          <div className={styles.inputStickyWrapper}>
            <ChatInput onSend={handleSendMessage} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
