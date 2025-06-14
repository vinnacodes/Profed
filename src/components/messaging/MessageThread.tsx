import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Message, User } from '../../types';
import { Send, Paperclip, Image, Smile } from 'lucide-react';

interface MessageThreadProps {
  messages: Message[];
  recipient: User;
  onSendMessage: (content: string) => void;
}

const MessageThread: React.FC<MessageThreadProps> = ({ 
  messages, 
  recipient, 
  onSendMessage 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  
  messages.forEach(message => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Avatar src={recipient.profileImage} alt={recipient.name} />
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{recipient.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{recipient.username}</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.keys(groupedMessages).map(date => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                {formatDate(date)}
              </span>
            </div>
            
            {groupedMessages[date].map(message => {
              const isCurrentUser = message.sender.id === '1'; // Hardcoded for demo
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[75%]">
                    {!isCurrentUser && (
                      <Avatar 
                        src={message.sender.profileImage} 
                        alt={message.sender.name} 
                        size="sm" 
                        className="mr-2 self-end mb-1"
                      />
                    )}
                    
                    <div>
                      <div 
                        className={`px-4 py-2 rounded-lg ${
                          isCurrentUser 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                      <p className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-right' : ''
                      } text-gray-500 dark:text-gray-400`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage}>
          <div className="flex items-end">
            <div className="flex-1 relative">
              <div className="absolute bottom-full mb-2 flex space-x-2 px-2">
                <button 
                  type="button" 
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
            <Button 
              type="submit"
              variant="primary"
              className="ml-2"
              disabled={!newMessage.trim()}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageThread;