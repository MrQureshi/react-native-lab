// constants.ts

import { Speed, SpeedConfig } from './types';

export const MAX_VISIBLE_MESSAGES = 15;

export const MESSAGE_HEIGHT = 68;

export const SLOT_SPACING = 8;

export const MESSAGE_SPACING = 8;

export const FADE_STEP = 0.08;

export const SCALE_STEP = 0.015;

export const SLOT_SIZE = MESSAGE_HEIGHT + SLOT_SPACING;

export const SPEEDS: Record<Speed, SpeedConfig> = {
  slow: {
    min: 600,
    max: 1200,
  },

  medium: {
    min: 250,
    max: 600,
  },

  fast: {
    min: 100,
    max: 250,
  },

  insane: {
    min: 50,
    max: 100,
  },
};

export const ANIMATION_DURATION = 220;
