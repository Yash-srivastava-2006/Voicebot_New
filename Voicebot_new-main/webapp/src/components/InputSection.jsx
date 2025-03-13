import React from 'react';
import { Send, Mic, X, Paperclip, Image } from 'lucide-react';

export const InputSection = ({
  input,
  setInput,
  handleSend,
  handleVoiceInput,
  isListening,
  handleAttachment,
  handleImageUpload
}) => (
  <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
    <div className="max-w-3xl mx-auto">
      {/* Attachment Preview */}
      {false && (
        <div className="mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">attachment.jpg</span>
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
       

        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your medical question here..."
          className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />

        {/* Voice Input */}
        <button
          onClick={handleVoiceInput}
          className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-600'} text-white hover:opacity-90`}
          title={isListening ? 'Stop recording' : 'Start voice input'}
        >
          <Mic size={20} />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          disabled={!input.trim()}
          title="Send message"
        >
          <Send size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  </div>
);