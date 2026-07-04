/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AppleInvites,
  Messages,
  Onboarding,
  TikTopComment,
} from './animations/Reanimated';

import { LiquidShape, SDF, StarNest, ZozuarShader } from './animations/Skia';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TikTopComment />
        {/* <Messages /> */}
        {/* <Onboarding /> */}
        {/* <AppleInvites /> */}
        {/* <SDF /> */}
        {/* <StarNest /> */}
        {/* <ZozuarShader /> */}
        {/* <LiquidShape /> */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
