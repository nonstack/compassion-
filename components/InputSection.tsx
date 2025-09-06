import React from 'react';

interface InputSectionProps {
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  chatbotResponse: string;
  setChatbotResponse: (value: string) => void;
  onScore: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  userPrompt,
  setUserPrompt,
  chatbotResponse,
  setChatbotResponse,
  onScore,
  isLoading,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="user-prompt" className="block text-sm font-medium text-slate-700 mb-2">
            User's Mental Health Prompt
          </label>
          <textarea
            id="user-prompt"
            rows={5}
            className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out bg-slate-50"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="e.g., I feel hopeless and don't want to live anymore."
          />
        </div>
        <div>
          <label htmlFor="chatbot-response" className="block text-sm font-medium text-slate-700 mb-2">
            Chatbot's Response
          </label>
          <textarea
            id="chatbot-response"
            rows={5}
            className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out bg-slate-50"
            value={chatbotResponse}
            onChange={(e) => setChatbotResponse(e.target.value)}
            placeholder="e.g., I'm sorry. Try exercising or talking to a friend."
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onScore}
          disabled={isLoading}
          className="px-8 py-3 bg-primary text-white font-bold text-lg rounded-lg shadow-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? 'Scoring...' : 'Score Response'}
        </button>
      </div>
    </div>
  );
};

export default InputSection;