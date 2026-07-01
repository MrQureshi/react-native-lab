import { useCallback, useEffect, useMemo, useState } from 'react';

import { MAX_VISIBLE_MESSAGES } from './constants';
import { MessageEngine } from './MessageEngine';
import { Message, Speed } from './types';

export function useMessageEngine() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [speed, setSpeed] = useState<Speed>('medium');

  const handleMessage = useCallback((message: Message) => {
    setMessages(previous => {
      const next = [message, ...previous];

      // Keep only visible messages
      return next.slice(0, MAX_VISIBLE_MESSAGES);
    });
  }, []);

  const engine = useMemo(() => {
    return new MessageEngine(handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    engine.setSpeed(speed);
  }, [engine, speed]);

  useEffect(() => {
    engine.start();

    return () => {
      engine.stop();
    };
  }, [engine]);

  const clear = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    speed,
    setSpeed,
    clear,
  };
}
