import { useEffect, useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { generateMessages, MessageItem } from './MockMessages';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Messages } from './Messages';

const messageSpeed = {
  slow: [1000, 500],
  medium: [500, 500],
  fast: [250, 250],
  'Insane 🚀': [50, 100],
};

const MessagesScreen = () => {
  const [messages, setMessages] = useState<MessageItem[]>(
    [...Array(20).keys()].map(generateMessages),
  );

  const timeOut = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [speed, setSpeed] = useState<keyof typeof messageSpeed>('slow');

  const generateDate = () => {
    clearTimeout(timeOut.current);
    const selectedSpeed = messageSpeed[speed];
    const timer = Math.random() * selectedSpeed[0] + selectedSpeed[1];
    timeOut.current = setTimeout(() => {
      setMessages(data => {
        return [generateMessages(), ...data];
      });
      generateDate();
    }, timer);
  };

  useEffect(() => {
    generateDate();
  }, [speed]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Messages
        data={messages}
        renderItem={item => {
          return (
            <View
              style={{
                gap: 4,
                alignItems: 'flex-start',
                padding: 4 * 2,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Image
                  style={{
                    width: 16,
                    aspectRatio: 1,
                    borderRadius: 24,
                  }}
                  source={{
                    uri: item.item.user.avatar,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {item.item.user.name}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    backgroundColor: '#ddd',
                  }}
                >
                  {item.item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SegmentedControl
          values={Object.keys(messageSpeed ?? {})}
          style={{ width: 300 }}
          selectedIndex={Object.keys(messageSpeed).indexOf(speed)}
          onChange={event => {
            setSpeed(event.nativeEvent.value as keyof typeof messageSpeed);
          }}
        />
      </View>
    </View>
  );
};

export default MessagesScreen;
