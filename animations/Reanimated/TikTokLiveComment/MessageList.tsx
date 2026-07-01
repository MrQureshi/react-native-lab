import React, { useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';

import Animated from 'react-native-reanimated';

import MessageBubble from './MessageBubble';
import { Message } from './types';

type Props = Omit<FlatListProps<Message>, 'renderItem'>;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Message>);

const MessageList = ({ ...props }: Props) => {
  const renderItem: ListRenderItem<Message> = useCallback(({ item, index }) => {
    return <MessageBubble message={item} index={index} />;
  }, []);

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <AnimatedFlatList
      {...props}
      inverted
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      removeClippedSubviews={false}
      initialNumToRender={15}
      maxToRenderPerBatch={15}
      windowSize={5}
      updateCellsBatchingPeriod={16}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default React.memo(MessageList);
