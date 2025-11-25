
export enum AppStage {
  WELCOME = 'WELCOME',
  ARCADE = 'ARCADE',
  GAME_DETAILS = 'GAME_DETAILS',
  NINJA_INTRO = 'NINJA_INTRO',
  NINJA_DASHBOARD = 'NINJA_DASHBOARD',
  NINJA_GAME = 'NINJA_GAME',
  GAME_OVER = 'GAME_OVER'
}

export interface User {
  name: string;
  age: string;
  avatarId: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon?: string; // Emoji icon
  image?: string; // Image URL
  bonus: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface NinjaProgress {
  level: number; // 1-12 (Grade levels)
  currentScore: number;
  highScore: number;
  totalRoundsPlayed: number;
  lives: number;
  lastLifeLost: number | null; // Timestamp
  unlockedSwords: string[]; // IDs of unlocked swords
  equippedSwordId: string;
}

export interface GameConfig {
  score: number;
  items: InventoryItem[];
  highScore: number;
}
