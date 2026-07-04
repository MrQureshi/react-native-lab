import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OnboardingPagination from './OnboardingPaginationIndicator ';

const OnboardingScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <View style={styles.container}>
      <OnboardingPagination
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={index => setSelectedIndex(index)}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
