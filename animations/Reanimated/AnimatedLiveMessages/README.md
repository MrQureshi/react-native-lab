# TikTok Incoming Messages (Legacy Implementation)

This was the initial implementation of the animated live incoming messages. It explored animating every message using React Native Reanimated primitives such as `useDerivedValue`, `interpolate`, and `withSpring`.

While the animation worked visually, the approach introduced unnecessary work for every list item whenever a new message arrived. As the message frequency increased, each item recalculated animated values based on its changing index, resulting in additional JavaScript and UI-thread work that could negatively impact animation smoothness. This implementation is useful for learning Reanimated concepts, but it is **not recommended for production** when handling high-frequency updates.

---

## Implementation

This version uses:

- `useDerivedValue`
- `interpolate`
- `withSpring`
- `Animated.FlatList`
- Index-based animations
- Layout animations

---

## How It Works

Each message calculates its own animated value based on its position in the list.

```tsx
const animatedIndex = useDerivedValue(() => {
  return withSpring(index);
});

const animatedStyle = useAnimatedStyle(() => ({
  opacity: interpolate(animatedIndex.value, [0, MAX_MESSAGES], [1, 0]),
}));
```

Whenever a new message is inserted at the top of the list:

1. Every item's index changes.
2. Every `useDerivedValue` recalculates.
3. Every `withSpring` starts a new animation.
4. Every `interpolate` executes again.
5. Every row updates its animated style.

This means the amount of animation work grows with the number of visible messages.

---

## Drawbacks

- Every message owns its own animation state.
- All visible rows animate on every insertion.
- Index-based calculations increase as the list updates.
- More animation work is performed than necessary.
- Can lead to dropped frames on lower-end devices or with very frequent updates.

---

## Why It Was Replaced

The feature was redesigned to use Reanimated's **Layout Transitions** instead of manually animating every item's position.

The new implementation:

- Removes index-based animations.
- Eliminates `useDerivedValue` for each row.
- Eliminates `interpolate` for each row.
- Eliminates `withSpring(index)` for each row.
- Limits the number of visible messages.
- Reduces unnecessary React work.
- Produces smoother animations under high-frequency message updates.

---

## Learning Purpose

The feature was redesigned to use React Native Reanimated's **Layout Transitions** instead of manually animating every item's position.

A new and optimized implementation has been developed under the **`TikTokLiveComment`** folder. This version adopts a cleaner architecture, reduces unnecessary JavaScript thread work, and delivers smoother animations by relying on Reanimated's layout transitions rather than per-item animated calculations.

If you're looking for the recommended production-ready approach, please refer to the **`TikTokLiveComment`** folder for the latest implementation.

It demonstrates an important optimization lesson: **just because an animation works doesn't mean it's the most efficient approach**. Choosing the right animation strategy is often more important than adding more animations.
