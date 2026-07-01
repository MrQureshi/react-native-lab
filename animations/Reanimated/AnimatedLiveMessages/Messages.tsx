import { render } from '@testing-library/react-native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatListProps,
  ListRenderItem,
} from 'react-native';
import Animated, {
  FadeInDown,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { MAX_MESSAGES } from './MockMessages';

type messageProps<T> = FlatListProps<T> & {
  renderItem: ListRenderItem<T>;
};

const AnimatedItem = React.memo(function AnimatedItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const newIndex = useDerivedValue(() => {
    return withSpring(index, { damping: 80, stiffness: 200 });
  });

  const styleZ = useAnimatedStyle(() => {
    return {
      opacity: interpolate(newIndex.value, [0, 1], [1, 1 - 1 / MAX_MESSAGES]),
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.withInitialValues({
        opacity: 0,
        transform: [{ translateY: 100 }],
      })
        .springify()
        .damping(80)
        .springify(200)}
    >
      <Animated.View style={styleZ}>{children}</Animated.View>
    </Animated.View>
  );
});

export function Messages<T>({ renderItem, ...rest }: messageProps<T>) {
  const { CellRendererComponent, ...flatListProps } = rest;
  return (
    <Animated.FlatList
      {...flatListProps}
      inverted
      itemLayoutAnimation={LinearTransition.springify()
        .damping(80)
        .stiffness(200)}
      renderItem={props => (
        <View>
          <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
