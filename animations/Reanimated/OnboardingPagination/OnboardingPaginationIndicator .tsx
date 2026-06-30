import React, { Children } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
} from 'react-native';
import Animated, {
  AnimatedProps,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  LinearTransition,
  SharedValue,
  useDerivedValue,
  withSpring,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import { images } from '../AppleInvites/images';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const _spacing = 8;
const _buttonHeight = 42;
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);

const _enteringFadeInLeft = FadeInLeft.springify().damping(80).stiffness(200);
const _exitingFadeInLeft = FadeOutLeft.springify().damping(80).stiffness(200);

const _enteringFadeInDown = FadeInDown.springify().damping(80).stiffness(200);
const _exitingFadeOutUp = FadeOutUp.springify().damping(80).stiffness(200);

const _dotContainer = 24;
const _dotSize = _dotContainer / 3;

const _activeDot = '#fff';
const _inactiveDot = '#aaa';

const Button = ({
  children,
  style,
  ...rest
}: AnimatedProps<PressableProps>) => {
  return (
    <AnimatedPressable
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: _spacing * 2,
        },
        style,
      ]}
      {...rest}
      entering={_enteringFadeInLeft}
      exiting={_exitingFadeInLeft}
      layout={_layoutTransition}
    >
      {children}
    </AnimatedPressable>
  );
};

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const styleZ = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot],
      ),
    };
  });

  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: 'center',
        alignContent: 'center',
        paddingLeft: _spacing,
      }}
    >
      <Animated.View
        style={[
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
          styleZ,
        ]}
      />
    </View>
  );
}

function PaginationIndicator({
  animation,
}: {
  animation: SharedValue<number>;
}) {
  const styleZ = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });

  return (
    <Animated.View
      style={[
        styleZ,
        {
          backgroundColor: '#29BE56',
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
          position: 'absolute',
          left: 0,
          top: 0,
        },
      ]}
    />
  );
}

export function Pagination({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    });
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map(i => (
          <Dot key={`dot-${i}`} index={i} animation={animation} />
        ))}
      </View>
    </View>
  );
}

const OnboardingPaginationIndicator = ({
  total,
  selectedIndex,
  onIndexChange,
}: {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: _spacing,
        gap: _spacing * 2,
      }}
    >
      <Pagination selectedIndex={selectedIndex} total={total} />
      <View
        style={{
          flexDirection: 'row',
          gap: _spacing,
        }}
      >
        {selectedIndex > 0 && (
          <Button
            style={{
              backgroundColor: '#ddd',
            }}
            onPress={() => {
              // if (selectedIndex <= 0) {
              //   return;
              // }

              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>back</Text>
          </Button>
        )}
        <Button
          style={{
            backgroundColor: '#0baaf9',
            flex: 1,
          }}
          onPress={() => {
            if (selectedIndex >= total - 1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key="finish"
              entering={_enteringFadeInDown}
              exiting={_exitingFadeOutUp}
              style={{ color: '#fff' }}
              layout={_layoutTransition}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key="continue"
              entering={_enteringFadeInDown}
              exiting={_exitingFadeOutUp}
              style={{ color: '#fff' }}
              layout={_layoutTransition}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default OnboardingPaginationIndicator;
