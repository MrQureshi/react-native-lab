// types.ts

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  createdAt: number;
  user: User;
}

export type Speed = 'slow' | 'medium' | 'fast' | 'insane';

export interface SpeedConfig {
  min: number;
  max: number;
}
