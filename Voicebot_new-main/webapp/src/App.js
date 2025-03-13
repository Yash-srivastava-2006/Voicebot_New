import React, { useState, useEffect } from 'react';
import { History, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import axios from 'axios';
import { encryptQuestion, decryptAnswer } from './utils/encryption';
import { Header } from './components/Header';
import { Background } from './components/Background';
import { ChatDisplay } from './components/ChatDisplay';
import { InputSection } from './components/InputSection';
import { ChatHistory } from './components/ChatHistory';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { backendURL } from './config';
import { ThemeProvider } from './context/ThemeContext';

const handleError = (error) => {
  let errorMessage = 'An error occurred while processing your request.';
  if (error.response) {
    if (error.response.data && error.response.data.answer) {
      try {
        errorMessage = decryptAnswer(error.response.data.answer);
      } catch (decryptError) {
        errorMessage = `Server error: ${error.response.status}`;
      }
    } else {
      errorMessage = `Server error: ${error.response.status}`;
    }
    if (error.response.status === 405) {
      errorMessage = 'CORS error: The server does not allow this type of request.';
    }
  } else if (error.request) {
    errorMessage = 'No response received from server. This might be a CORS issue.';
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const { start, stop } = useSpeechRecognition((transcript) => {
    setInput(transcript);
  });

  const { speak: speakText, stop: stopSpeaking } = useSpeechSynthesis(
    () => setIsListening(true),
    () => setIsListening(false)
  );

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' && attachments.length === 0) return;

    const timestamp = new Date().toISOString();
    const newUserMessage = {
      type: 'user',
      content: input,
      timestamp,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setCurrentQuestion(input);
    setInput('');
    setIsLoading(true);

    try {
      const encryptedQuestion = encryptQuestion(input);
      const response = await axios.post(backendURL, {
        question: encryptedQuestion,
      });

      const decryptedAnswer = decryptAnswer(response.data.answer);

      const newBotMessage = {
        type: 'bot',
        content: decryptedAnswer,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setCurrentAnswer(decryptedAnswer);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = handleError(error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: errorMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setCurrentAnswer(errorMessage);
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stop();
      setIsListening(false);
      handleSend();
      setInput('');
    } else {
      start();
      setIsListening(true);
    }
  };

  const handleSelectMessage = (message) => {
    setCurrentQuestion(message.content);
    setIsDrawerOpen(false);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    setIsDrawerOpen(false);
  };

  const handleAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setAttachments((prev) => [...prev, file]);
      }
    };
    input.click();
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-white dark:bg-gray-900">
        {/* Chat History Sidebar */}
        <ChatHistory
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          messages={messages}
          onSelectMessage={handleSelectMessage}
          clearHistory={clearHistory}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header>
            <div className="flex items-center justify-end">
              {/* Chat History Button */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                title="Chat History"
              >
                <History size={20} />
              </button>
            </div>
          </Header>

          <ChatDisplay
            currentQuestion={currentQuestion}
            currentAnswer={currentAnswer}
            isLoading={isLoading}
            setInput={setInput}
          />

          <InputSection
            input={input}
            setInput={setInput}
            isListening={isListening}
            handleSend={handleSend}
            handleVoiceInput={handleVoiceInput}
            handleAttachment={handleAttachment}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;