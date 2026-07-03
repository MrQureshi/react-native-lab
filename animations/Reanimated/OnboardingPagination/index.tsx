import { useState } from 'react';
import { View } from 'react-native';
import OnboardingPagination from './OnboardingPaginationIndicator ';

const OnboardingScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <OnboardingPagination
        total={4}
        selectedIndex={selectedIndex}
        onIndexChange={index => setSelectedIndex(index)}
      />
    </View>
  );
};

export default OnboardingScreen;
