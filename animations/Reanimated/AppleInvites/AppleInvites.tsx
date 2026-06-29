import { Marquee } from '@animatereactnative/marquee';
import { Stagger } from '@animatereactnative/stagger';
import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  FadeOut,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const images = [
  'https://plus.unsplash.com/premium_photo-1708194041705-74586903c3d3?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1732507213926-74542c982413?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1731974536212-4f809d2f9cde?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const { width } = Dimensions.get('window');
const _itemWidth = width * 0.62;
const _itemHeight = width * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

function Item({
  image,
  index,
  offset,
}: {
  image: string;
  index: number;
  offset: SharedValue<number>;
}) {
  const _styleZ = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize;
    const totalSize = images.length * _itemSize;
    const range =
      (itemPosition - (offset.value + totalSize * 1000)) % totalSize;
    return {
      transform: [
        {
          rotate: `${interpolate(
            range,
            [-_itemSize, (width - _itemSize) / 2, width],
            [-3, 0, 3],
          )}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: _itemWidth,
          height: _itemHeight,
          justifyContent: 'center',
        },
        _styleZ,
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{
          flex: 0.6,
          borderRadius: 16,
          borderColor: 'red',
          borderWidth: 1,
        }}
      />
    </Animated.View>
  );
}

const AppleInvites = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useAnimatedReaction(
    () => {
      const floatIndex = (offset.value / _itemSize) % images.length;

      return Math.abs(Math.floor(floatIndex));
      // return (offset.value / _itemSize) % images.length;
    },
    value => {
      console.log(value);
      runOnJS(setActiveIndex)(value);
    },
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: 0.5,
          },
        ]}
      >
        <Animated.Image
          key={`images-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={{ flex: 1 }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              translateY: -_itemHeight / 2,
            })}
          style={{
            flexDirection: 'row',
            gap: _spacing,
          }}
        >
          {images.map((image, index) => {
            return (
              <Item
                key={`images-${index}`}
                image={image}
                index={index}
                offset={offset}
              />
            );
          })}
        </Animated.View>
      </Marquee>
      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        key="akasdadakas"
        stagger={500}
        style={{
          flex: 1,
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>welcome to</Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Animation
        </Text>
        <Text>
          Adding key directly to an Image only makes sense when it's rendered
          inside a List
        </Text>
      </Stagger>
      {/* <Text>AppleInvites</Text> */}
    </View>
  );
};

export default AppleInvites;
