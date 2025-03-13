import React from 'react';
import { Clock, History, Trash2 } from 'lucide-react';

export const ChatHistory = ({ isOpen, onClose, messages, onSelectMessage, clearHistory }) => {
  // Group messages by date, filtering only user messages
  const groupUserMessagesByDate = () => {
    const groups = {};
    messages.filter(message => message.type === 'user').forEach((message) => {
      const date = message.timestamp ? new Date(message.timestamp) : new Date();
      const dateKey = date.toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const userMessageGroups = groupUserMessagesByDate();

  return (
    <div
      className={`fixed right-0 top-0 h-screen bg-white dark:bg-gray-800 border-l dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-[280px] z-50`}
    >
      <div className="p-4">
        {/* Header with Clear History Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium dark:text-white">Chat History</h2>
          <div className="flex gap-2">
            <button
              onClick={clearHistory}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              title="Clear History"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              title="Close"
            >
              <History size={20} />
            </button>
          </div>
        </div>

        {/* Chat History Content */}
        <div className="space-y-4">
          {Object.entries(userMessageGroups).map(([date, msgs]) => (
            <div key={date}>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {date === new Date().toLocaleDateString() ? 'Today' : date}
              </h3>
              <div className="space-y-3">
                {msgs.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => onSelectMessage(msg)}
                    className="w-full flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer text-left"
                  >
                    <Clock size={18} />
                    <span className="truncate">{msg.content}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};