import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  isAverage?: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, isAverage = false }) => {
  const getScoreColor = () => {
    if (score >= 4) return 'text-success';
    if (score >= 3) return 'text-warning';
    return 'text-danger';
  };
  
  const scoreColorClass = getScoreColor();
  const containerClass = isAverage 
    ? "p-4 bg-slate-50 rounded-lg shadow-inner border-2 border-primary flex flex-col justify-center items-center" 
    : "p-4 bg-slate-50 rounded-lg shadow-inner flex flex-col justify-center items-center";

  return (
    <div className={containerClass}>
      <h3 className={`text-sm font-semibold mb-1 text-slate-600`}>{title}</h3>
      <div className="flex items-baseline">
        <span className={`text-5xl font-extrabold ${scoreColorClass}`}>{score.toFixed(1)}</span>
        <span className="text-lg font-medium text-slate-400">/ 5</span>
      </div>
    </div>
  );
};

export default ScoreCard;