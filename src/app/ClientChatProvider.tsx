"use client";

import dynamic from 'next/dynamic'

const ChatProvider = dynamic(() => import('../contexts/ChatContext').then(mod => mod.ChatProvider), {
  ssr: false
})

export default function ClientChatProvider({ children }: { children: React.ReactNode }) {
  return <ChatProvider>{children}</ChatProvider>
}