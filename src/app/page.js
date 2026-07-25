"use client";

import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import ChatInput from "@/components/ChatInput";
import FeatureCards from "@/components/FeatureCards";
import ChatFeed from "@/components/ChatFeed";
import MobileDrawer from "@/components/MobileDrawer";
import SearchModal from "@/components/SearchModal";
import Modals from "@/components/Modals";
import QueryProvider from "@/providers/QueryProvider";
import { useChatStore } from "@/store/useChatStore";
import styles from "./page.module.css";

function DashboardContent() {
  const activeChat = useChatStore((state) => state.activeChat);

  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <MobileDrawer />
      <SearchModal />
      <Modals />

      <main className={styles.mainContent}>
        <TopNav />

        <div className={styles.contentScrollArea}>
          {activeChat ? (
            <ChatFeed />
          ) : (
            <>
              <Hero />
              <FeatureCards />
            </>
          )}
        </div>

        <div className={styles.inputStickyWrapper}>
          <ChatInput />
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <QueryProvider>
      <DashboardContent />
    </QueryProvider>
  );
}
