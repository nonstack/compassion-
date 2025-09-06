import React from 'react';
import { type EvaluationResult } from '../types';
import ScoreCard from './ScoreCard';

interface ResultsSectionProps {
  userPrompt: string;
  chatbotResponse: string;
  evaluation: EvaluationResult;
  isLoadingBetterResponse: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ userPrompt, chatbotResponse, evaluation, isLoadingBetterResponse }) => {
  const { scores, alerts, suggestions, betterResponse } = evaluation;

  return (
    <div className="mt-10 space-y-8 animate-fade-in">
      {/* Scores */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Compassion Scores</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          <ScoreCard title="Noticing Suffering" score={scores.noticing} />
          <ScoreCard title="Interpreting" score={scores.interpreting} />
          <ScoreCard title="Empathic Concern" score={scores.empathicConcern} />
          <ScoreCard title="Taking Action" score={scores.action} />
          <ScoreCard title="Overall Average" score={scores.average} isAverage={true} />
        </div>
      </div>

      {/* Alerts and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-danger mb-4 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            Problem Alerts
          </h2>
          {alerts.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              {alerts.map((alert, index) => <li key={index}>{alert}</li>)}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No major problems detected. Good job!</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-success mb-4 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Improvement Suggestions
          </h2>
          {suggestions.length > 0 ? (
             <ul className="list-disc list-inside space-y-2 text-slate-600">
              {suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
            </ul>
          ) : (
             <p className="text-slate-500 italic">Response is well-structured.</p>
          )}
        </div>
      </div>

       {/* Better Response */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"/><path d="M12 3v2"/><path d="M12 19v2"/><path d="M5 12H3"/><path d="M21 12h-2"/><path d="m18.36 5.64-.7-.7"/><path d="m6.34 17.66-.7-.7"/><path d="m18.36 18.36-.7-.7"/><path d="m6.34 6.34-.7-.7"/></svg>
            AI-Generated Better Response
        </h2>
        {isLoadingBetterResponse ? (
          <div className="flex items-center text-slate-300">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <p className="ml-3">Generating...</p>
          </div>
        ) : (
          <p className="text-lg leading-relaxed font-light">{betterResponse}</p>
        )}
      </div>
      
      {/* Echoed Inputs */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Original Inputs</h2>
        <div>
          <h3 className="font-semibold text-slate-600">User Prompt:</h3>
          <p className="mt-1 p-3 bg-slate-50 rounded-md text-slate-800 italic">"{userPrompt}"</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-slate-600">Chatbot Response:</h3>
          <p className="mt-1 p-3 bg-slate-50 rounded-md text-slate-800">"{chatbotResponse}"</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;