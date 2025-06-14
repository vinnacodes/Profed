import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  activeConversationId 
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Sort conversations by date, most recent first
  const sortedConversations = [...conversations].sort((a, b) => {
    return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
  });

  // Find the other participant in the conversation (not the current user)
  const getOtherParticipant = (conversation: Conversation) => {
    // For demo purposes, always return the first participant
    // In a real app, you would filter out the current user
    return conversation.participants[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden h-[calc(100vh-12rem)]">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
      </div>
      
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {sortedConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No conversations yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedConversations.map((conversation) => {
              const otherParticipant = getOtherParticipant(conversation);
              const isActive = conversation.id === activeConversationId;
              
              return (
                <li key={conversation.id}>
                  <Link
                    to={`/messages/${conversation.id}`}
                    className={`flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar src={otherParticipant.profileImage} alt={otherParticipant.name} />
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className={`text-sm font-medium truncate ${
                          conversation.unreadCount > 0 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {otherParticipant.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          {formatTime(conversation.lastMessage.createdAt)}
                        </span>
                      </div>
                      
                      <p className={`text-sm truncate ${
                        conversation.unreadCount > 0
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConversationList;