import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 text-center">
        Compassion Dashboard
      </h1>
      <p className="text-lg text-slate-500 text-center mt-2">Test Chatbot Kindness for Mental Health</p>
      <div className="mt-8 p-4 bg-amber-50 border-l-4 border-warning text-amber-900 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold">
              <span className="font-bold">Disclaimer:</span> This tool is for testing chatbot designs only. AI is not a therapist—always direct users to professionals like hotlines (e.g., 988 in the US). Do not use for real mental health advice.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;