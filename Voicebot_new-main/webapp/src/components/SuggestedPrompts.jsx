import React from 'react';

export const SuggestedPrompts = ({ onSelectPrompt }) => (
  <div className="flex flex-wrap gap-2">
    <ActionButton onClick={() => onSelectPrompt("Tell me about common symptoms")}>
      Common symptoms
    </ActionButton>
    <ActionButton onClick={() => onSelectPrompt("I need medication information")}>
      Medication info
    </ActionButton>
    <ActionButton onClick={() => onSelectPrompt("I want to schedule an appointment")}>
      Schedule appointment
    </ActionButton>
  </div>
);

const ActionButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-100 transition"
  >
    {children}
  </button>
);