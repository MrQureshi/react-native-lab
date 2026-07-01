import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MessageMask = () => {
  return (
    <LinearGradient
      pointerEvents="none"
      colors={[
        'white',
        'rgba(255,255,255,0.95)',
        'rgba(255,255,255,0.75)',
        'rgba(255,255,255,0)',
      ]}
      locations={[0, 0.2, 0.5, 1]}
      style={styles.container}
    />
  );
};

export default React.memo(MessageMask);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
});
