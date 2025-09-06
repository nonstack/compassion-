import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import Sidebar from './components/Sidebar';
import { type EvaluationResult } from './types';
import { scoreResponse } from './services/scoringService';
import { generateBetterResponse } from './services/geminiService';

const App: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState<string>("I feel hopeless and don't want to live anymore.");
  const [chatbotResponse, setChatbotResponse] = useState<string>("I'm sorry. Try exercising or talking to a friend.");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScore = useCallback(async () => {
    if (!userPrompt.trim() || !chatbotResponse.trim()) {
      setError("Please fill out both the user prompt and chatbot response fields.");
      setEvaluation(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setEvaluation(null);

    try {
      // Rule-based scoring is synchronous and fast
      const scoringResult = scoreResponse(userPrompt, chatbotResponse);
      
      // Initially set evaluation with scoring results
      setEvaluation(scoringResult);

      // Asynchronously generate a better response using Gemini
      const betterResponse = await generateBetterResponse(userPrompt, chatbotResponse, scoringResult.suggestions);
      
      // Update evaluation with the generated response
      setEvaluation(prev => prev ? { ...prev, betterResponse } : null);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while generating a better response.';
      setError(`Failed to get suggestions from AI. Please check your API key and network connection. Error: ${errorMessage}`);
      // Keep showing the rule-based scores even if AI fails
    } finally {
      setIsLoading(false);
    }
  }, [userPrompt, chatbotResponse]);

  return (
    <div className="flex min-h-screen font-sans text-slate-700">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-10 lg:ml-80">
        <div className="max-w-4xl mx-auto">
          <Header />
          <InputSection
            userPrompt={userPrompt}
            setUserPrompt={setUserPrompt}
            chatbotResponse={chatbotResponse}
            setChatbotResponse={setChatbotResponse}
            onScore={handleScore}
            isLoading={isLoading}
          />
          {error && (
             <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
             </div>
          )}
          {isLoading && !evaluation && (
            <div className="flex flex-col justify-center items-center mt-8 p-8 text-center">
               <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="ml-4 text-lg text-slate-600 mt-4">Evaluating response...</p>
            </div>
          )}
          {evaluation && (
            <ResultsSection 
              userPrompt={userPrompt} 
              chatbotResponse={chatbotResponse} 
              evaluation={evaluation}
              isLoadingBetterResponse={isLoading && evaluation.betterResponse === "Generating..."}
            />
          )}
        </div>
        <footer className="text-center mt-12 py-4 text-sm text-slate-500">
          <p>Built for DSR Project on Compassionate Chatbots. Kernel Theory: Process View of Compassion.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;