import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingPagination from './OnboardingPaginationIndicator ';

const OnboardingScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  return (
    <View>
      <OnboardingPagination
        total={selectedIndex}
        selectedIndex={selectedIndex}
        onIndexChange={index => setSelectedIndex(index)}
      />
    </View>
  );
};

export default OnboardingScreen;
