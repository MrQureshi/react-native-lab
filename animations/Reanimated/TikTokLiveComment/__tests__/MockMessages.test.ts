import { randomMessage } from '../MockMessages';

describe('MockMessages', () => {
  describe('randomMessage', () => {
    it('should return a valid Message object', () => {
      const message = randomMessage();

      expect(message).toStrictEqual({
        id: expect.any(String),
        text: expect.any(String),
        createdAt: expect.any(Number),
        user: {
          id: expect.any(String),
          name: expect.any(String),
          avatar: expect.any(String),
        },
      });
    });
  });
});
