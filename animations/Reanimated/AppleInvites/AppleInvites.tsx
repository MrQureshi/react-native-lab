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

import { images } from './images';

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
    <Animated.View style={[style.itemView, _styleZ]}>
      <Image source={{ uri: image }} style={style.itemImg} />
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
    },
    value => {
      console.log(value);
      runOnJS(setActiveIndex)(value);
    },
  );
  return (
    <View style={style.container}>
      <View style={[StyleSheet.absoluteFill, style.mainView]}>
        <Animated.Image
          key={`images-${activeIndex}`}
          source={{ uri: images[activeIndex] }}
          style={style.img}
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
          style={style.marqueeStyle}
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
        key="stagger"
        stagger={500}
        style={style.staggerStyle}
      >
        <Text>welcome to</Text>
        <Text style={style.txtTitle}>Animation</Text>
        <Text>
          Adding key directly to an Image only makes sense when it's rendered
          inside a List
        </Text>
      </Stagger>
    </View>
  );
};

export default AppleInvites;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  mainView: {
    opacity: 0.5,
  },
  itemView: {
    width: _itemWidth,
    height: _itemHeight,
    justifyContent: 'center',
  },
  img: { flex: 1 },
  marqueeStyle: {
    flexDirection: 'row',
    gap: _spacing,
  },
  staggerStyle: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 20,
  },
  itemImg: {
    flex: 0.6,
    borderRadius: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
});
