import React from 'react';
import { Loader } from 'lucide-react';
import { SuggestedPrompts } from './SuggestedPrompts';

export const ChatDisplay = ({ 
  currentQuestion, 
  currentAnswer, 
  isLoading,
  setInput 
}) => (
  <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Welcome Message */}
      <div className="bg-blue-50 dark:bg-blue-900 text-black dark:text-white p-4 rounded-lg">
        <p>Hello! How can I assist you with your medical questions today?</p>
      </div>

      {/* Question if exists */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">You asked:</p>
          <p className="text-black dark:text-white">{currentQuestion}</p>
        </div>
      )}

      {/* Loading or Answer */}
      {isLoading ? (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-lg shadow-sm flex items-center space-x-2">
          <Loader className="animate-spin" size={16} />
          <p className="text-gray-600 dark:text-gray-300">Generating response...</p>
        </div>
      ) : currentAnswer && (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded-lg shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Response:</p>
          <p className="text-black dark:text-white whitespace-pre-wrap">{currentAnswer}</p>
        </div>
      )}

      {/* Suggested Prompts */}
      {!currentQuestion && !currentAnswer && (
        <div className="mt-4">
          <p className="text-gray-500 dark:text-gray-400 mb-3">Quick actions:</p>
          <SuggestedPrompts onSelectPrompt={setInput} />
        </div>
      )}
    </div>
  </div>
);