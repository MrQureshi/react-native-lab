// MessageEngine.ts

import { randomMessage } from './MockMessages';
import { SPEEDS } from './constants';
import { Message, Speed } from './types';

export class MessageEngine {
  private speed: Speed = 'medium';

  private timeout: ReturnType<typeof setTimeout> | null = null;

  private running = false;

  private listener?: (message: Message) => void;

  constructor(listener: (message: Message) => void) {
    this.listener = listener;
  }

  public start() {
    if (this.running) return;

    this.running = true;

    this.schedule();
  }

  public stop() {
    this.running = false;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  public setSpeed(speed: Speed) {
    this.speed = speed;

    if (!this.running) return;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.schedule();
  }

  //   public setSpeed(speed: Speed) {
  //     this.speed = speed;
  //   }

  private schedule() {
    if (!this.running) return;

    const config = SPEEDS[this.speed];

    const delay = Math.random() * (config.max - config.min) + config.min;

    this.timeout = setTimeout(() => {
      this.listener?.(randomMessage());

      this.schedule();
    }, delay);
  }
}
