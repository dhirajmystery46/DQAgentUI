"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Chat } from '../types/index';

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  recentChats: Chat[];
  handleSendMessage: (message: string) => Promise<void>;
  handleNewChat: () => void;
  handleLoadChat: (chatId: string) => void;
  handleDeleteChat: (chatId: string) => void;
  handleRenameChat: (chatId: string, newName: string) => void;
}

interface Message {
  query: string;
  is_user: boolean;
  type?: string;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  //const [conversationCounter, setConversationCounter] = useState(1);

  useEffect(() => {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      try {
        const parsedChats = JSON.parse(storedChats);
        setRecentChats(Array.isArray(parsedChats) ? parsedChats : []);
        //setConversationCounter(parsedChats.length + 1);
      } catch (error) {
        console.error('Error parsing stored chats:', error);
        setRecentChats([]);
      }
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    const newMessage: Message = { query: message, is_user: true };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
  
    let chatId = currentChatId;
    if (!chatId) {
      chatId = Date.now().toString();
      setCurrentChatId(chatId);
      
      // Determine chat name based on keywords
      const chatName = determineChatName(message);

      const newChat: Chat = { 
        id: chatId, 
        name: chatName, 
        messages: updatedMessages 
      };
      setRecentChats((prev) => [newChat, ...prev]);
      //setConversationCounter((prev) => prev + 1);
    }
    updateChat(chatId, updatedMessages);
    // Determine endpoint based on message content
    let endpoint = 'https://dqagent-fucjdkcxa5chcfbx.eastus2-01.azurewebsites.net/data_quality';
    if (message.toLowerCase().includes('profiling')) {
      endpoint = 'https://dqagent-fucjdkcxa5chcfbx.eastus2-01.azurewebsites.net/data_profiling';
    }
    else if (message.toLowerCase().includes('anomaly')) {
      endpoint = 'https://dqagent-fucjdkcxa5chcfbx.eastus2-01.azurewebsites.net/data_anomaly';
    }

    try {
      const response = await fetch(
        endpoint,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          
          body: JSON.stringify(newMessage),
        }
      );
  
      const textResponse = await response.json();
      console.log('Response:', textResponse);
      const parsedResponse = textResponse;
      // try {
      //   parsedResponse = JSON.parse(textResponse);
      // } catch (parseError) {
      //   console.error('Error parsing response:', parseError);
      //   throw new Error('Invalid response format');
      // }
  
      if (parsedResponse && parsedResponse.result) {
        let aiResponse: Message;
        if (parsedResponse.type === 'html') {
          aiResponse = { 
            query: JSON.stringify(parsedResponse), 
            is_user: false, 
            type: 'html' 
          };
        } else {
          aiResponse = { 
            query: parsedResponse.result, 
            is_user: false, 
            type: 'markdown' 
          };
        }
        const updatedMessagesWithResponse = [...updatedMessages, aiResponse];
        setMessages(updatedMessagesWithResponse);
        updateChat(chatId, updatedMessagesWithResponse);
      } else {
        console.log('Unexpected response format:', parsedResponse);
        const errorMessage: Message = { 
          query: "Oops, an error occurred due to unforeseen circumstances.", 
          is_user: false 
        };
        const updatedMessagesWithError = [...updatedMessages, errorMessage];
        setMessages(updatedMessagesWithError);
        updateChat(chatId, updatedMessagesWithError);
      }
    } catch (error) {
      console.error('Error handling message:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const determineChatName = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    if (lowercaseMessage.includes("analysis") || lowercaseMessage.includes("analyze") || lowercaseMessage.includes("evaluate")) {
      return "Lease Analysis";
    } else if (lowercaseMessage.includes("strategy") || lowercaseMessage.includes("strategize") || lowercaseMessage.includes("renegotiation")) {
      return "Lease Strategy";
    }else
    return "Data Retrieval";
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const handleLoadChat = (chatId: string) => {
    const chat = recentChats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    setRecentChats(prevChats => {
      const updatedChats = prevChats.filter(chat => chat.id !== chatId);
      saveChats(updatedChats);
      return updatedChats;
    });
    if (currentChatId === chatId) {
      handleNewChat();
    }
  };

  const handleRenameChat = (chatId: string, newName: string) => {
    setRecentChats(prevChats => {
      const updatedChats = prevChats.map(chat => 
        chat.id === chatId ? { ...chat, name: newName } : chat
      );
      saveChats(updatedChats);
      return updatedChats;
    });
  };

  const updateChat = (chatId: string, updatedMessages: Message[]) => {
    setRecentChats(prevChats => {
      const updatedChats = prevChats.map(chat => 
        chat.id === chatId ? { ...chat, messages: updatedMessages } : chat
      );
      if (!prevChats.some(chat => chat.id === chatId)) {
        // Use the determineChatName function for consistency
        const chatName = determineChatName(updatedMessages[0].query);
        updatedChats.unshift({ 
          id: chatId, 
          name: chatName, 
          messages: updatedMessages 
        });
      }
      saveChats(updatedChats);
      return updatedChats;
    });
  };

  const saveChats = (chats: Chat[]) => {
    localStorage.setItem('chats', JSON.stringify(chats));
  };

  return (
    <ChatContext.Provider value={{
      messages,
      isLoading,
      recentChats,
      handleSendMessage,
      handleNewChat,
      handleLoadChat,
      handleDeleteChat,
      handleRenameChat,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
