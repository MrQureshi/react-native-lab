/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SDF from './animations/Skia/SDF/index.tsx';
import StarNest from './animations/Skia/StarNest/index.tsx';
import CosmicShader from './animations/Skia/ZozuarShader/index.tsx';
import Carousel from './animations/Reanimated/AppleInvites/index.tsx';
import { LiquidShape } from './animations/Skia/LiquidGlass/index.tsx';
import ZozuarShader from './animations/Skia/ZozuarShader/index.tsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        {/* <Carousel /> */}
        {/* <SDF /> */}
        {/* <StarNest /> */}
        {/* <ZozuarShader /> */}
        {/* <CosmicShader /> */}
        <LiquidShape />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
