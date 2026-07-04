import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';

import { Message } from './types';
import { FADE_STEP, SCALE_STEP } from './constants';

interface Props {
  message: Message;
  index: number;
}

const MessageBubble = ({ message, index }: Props) => {
  const opacity = Math.max(0, 1 - index * FADE_STEP);
  const scale = Math.max(0.88, 1 - index * SCALE_STEP);

  return (
    <Animated.View
      entering={FadeInDown.duration(220).withInitialValues({
        opacity: 0,
        transform: [{ translateY: 18 }],
      })}
      layout={LinearTransition.springify().damping(22).stiffness(140).mass(0.8)}
      style={[
        styles.container,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <View style={styles.header}>
        <Image
          source={{
            uri: message.user.avatar,
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{message.user.name}</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message.text}</Text>
      </View>
    </Animated.View>
  );
};

export default React.memo(MessageBubble);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
  },

  name: {
    fontSize: 12,
    fontWeight: '600',
  },

  messageContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  message: {
    fontSize: 13,
    color: '#111',
  },
});
