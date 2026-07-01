# TikTok Incoming Messages

A high-performance React Native animation inspired by the incoming comments in TikTok Live.

The Feature is designed to deliver a smooth **60 FPS** experience by minimizing JavaScript thread work and leveraging React Native Reanimated for UI-thread animations. It demonstrates how to build a continuous live chat feed using clean architecture, efficient rendering, bounded state management, and optimized Reanimated layout transitions.

---

## Features

- 🚀 Continuous incoming live messages
- ⚡ Four message speeds (Slow, Medium, Fast, Insane)
- 🎬 Smooth layout animations with React Native Reanimated
- 📱 Optimized for a 60 FPS user experience
- 🧠 Reduced JavaScript thread workload
- ♻️ Fixed number of visible messages
- 🔄 Reusable and modular architecture
- 📝 Fully written in TypeScript

---

## Usage

```tsx
import TikTokIncomingMessages from './TikTokIncomingMessages';

export default function App() {
  return <TikTokIncomingMessages />;
}
```
