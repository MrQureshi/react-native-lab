import {
  MAX_VISIBLE_MESSAGES,
  MESSAGE_HEIGHT,
  SLOT_SPACING,
  MESSAGE_SPACING,
  FADE_STEP,
  SCALE_STEP,
  SLOT_SIZE,
  SPEEDS,
  ANIMATION_DURATION,
} from '../constants';

describe('constants.ts', () => {
  describe('Message configuration', () => {
    it('should expose valid numeric constants', () => {
      expect(MAX_VISIBLE_MESSAGES).toBeGreaterThan(0);
      expect(MAX_VISIBLE_MESSAGES).toBeLessThanOrEqual(20);
      expect(MESSAGE_HEIGHT).toBeGreaterThan(0);
      expect(SLOT_SPACING).toBeGreaterThanOrEqual(0);
      expect(MESSAGE_SPACING).toBeGreaterThanOrEqual(0);
      expect(FADE_STEP).toBeGreaterThan(0);
      expect(SCALE_STEP).toBeGreaterThan(0);
      expect(ANIMATION_DURATION).toBeGreaterThan(0);
    });

    it('should calculate SLOT_SIZE from MESSAGE_HEIGHT and SLOT_SPACING', () => {
      expect(SLOT_SIZE).toBe(MESSAGE_HEIGHT + SLOT_SPACING);
    });

    it('should use a fade step between 0 and 1', () => {
      expect(FADE_STEP).toBeGreaterThan(0);
      expect(FADE_STEP).toBeLessThan(1);
    });

    it('should use a scale step between 0 and 1', () => {
      expect(SCALE_STEP).toBeGreaterThan(0);
      expect(SCALE_STEP).toBeLessThan(1);
    });
  });

  describe('SPEEDS configuration', () => {
    it('should expose all supported speeds', () => {
      expect(Object.keys(SPEEDS)).toEqual(['slow', 'medium', 'fast', 'insane']);
    });

    it.each(Object.entries(SPEEDS))(
      'should have valid configuration for "%s"',
      (_, config) => {
        expect(config.min).toBeGreaterThan(0);
        expect(config.max).toBeGreaterThan(config.min);
      },
    );

    it('should order speeds from slowest to fastest', () => {
      expect(SPEEDS.slow.min).toBeGreaterThan(SPEEDS.medium.min);
      expect(SPEEDS.medium.min).toBeGreaterThan(SPEEDS.fast.min);
      expect(SPEEDS.fast.min).toBeGreaterThan(SPEEDS.insane.min);
    });

    it('should reduce the maximum delay as speed increases', () => {
      expect(SPEEDS.slow.max).toBeGreaterThan(SPEEDS.medium.max);
      expect(SPEEDS.medium.max).toBeGreaterThan(SPEEDS.fast.max);
      expect(SPEEDS.fast.max).toBeGreaterThan(SPEEDS.insane.max);
    });
  });
});
