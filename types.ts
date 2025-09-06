
export interface CompassionScores {
  noticing: number;
  interpreting: number;
  empathicConcern: number;
  action: number;
  average: number;
}

export interface EvaluationResult {
  scores: CompassionScores;
  alerts: string[];
  suggestions: string[];
  betterResponse: string;
}

export interface ScoreDetail {
  score: number;
  explanation: string;
}
