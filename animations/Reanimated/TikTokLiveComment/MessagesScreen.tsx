import React from 'react';
import { StyleSheet, View } from 'react-native';

import SegmentedControl from '@react-native-segmented-control/segmented-control';

import MessageList from './MessageList';
import { SPEEDS } from './constants';
import { Speed } from './types';
import { useMessageEngine } from './useMessageEngine';
import MessageMask from './MessageMask';

const MessagesScreen = () => {
  const { messages, speed, setSpeed } = useMessageEngine();

  const speeds = Object.keys(SPEEDS) as Speed[];

  return (
    <View style={styles.container}>
      <MessageList data={messages} contentContainerStyle={styles.listContent} />
      {/* <MessageMask /> */}
      <View style={styles.bottom}>
        <SegmentedControl
          values={speeds}
          selectedIndex={speeds.indexOf(speed)}
          onChange={event => {
            setSpeed(event.nativeEvent.value as Speed);
          }}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },

  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },

  bottom: {
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
