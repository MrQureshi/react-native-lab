// MockMessages.ts

import { faker } from '@faker-js/faker';
import { Message } from './types';

const avatars = Array.from({ length: 50 }).map(() => faker.image.avatar());

const users = Array.from({ length: 50 }).map((_, index) => ({
  id: String(index),
  name: faker.person.firstName(),
  avatar: avatars[index],
}));

const messagePool: Message[] = Array.from({ length: 500 }).map(() => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  createdAt: Date.now(),
  user: users[Math.floor(Math.random() * users.length)],
}));

export function randomMessage(): Message {
  const message = messagePool[Math.floor(Math.random() * messagePool.length)];

  return {
    ...message,
    id: faker.string.uuid(),
    createdAt: Date.now(),
  };
}
