import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ConversationList from '../components/messaging/ConversationList';
import MessageThread from '../components/messaging/MessageThread';
import { Conversation, Message, User } from '../types';
import { mockConversations, mockMessages, mockUsers } from '../data/mockData';

const MessagesPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching conversations
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setConversations(mockConversations);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      // Set active conversation based on URL param or default to first conversation
      const conversation = conversationId 
        ? conversations.find(c => c.id === conversationId) 
        : conversations[0];
      
      if (conversation) {
        setActiveConversation(conversation);
        
        // Find the other user in the conversation (not the current user)
        // In a real app, you would filter based on the current user's ID
        const otherUser = conversation.participants[0];
        setRecipient(otherUser);
        
        // Load messages for this conversation
        setMessages(mockMessages[conversation.id] || []);
      }
    }
  }, [conversationId, conversations]);

  const handleSendMessage = (content: string) => {
    if (!activeConversation || !recipient) return;
    
    // Create a new message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: mockUsers[0], // Current user
      createdAt: new Date().toISOString(),
      isRead: true
    };
    
    // Add message to the current thread
    setMessages(prev => [...prev, newMessage]);
    
    // Update last message in conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { ...conv, lastMessage: newMessage, unreadCount: 0 } 
          : conv
      )
    );
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ConversationList 
              conversations={conversations}
              activeConversationId={activeConversation?.id}
            />
          )}
        </div>
        
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : activeConversation && recipient ? (
            <MessageThread 
              messages={messages}
              recipient={recipient}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your Messages</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                Select a conversation to start messaging or start a new conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;