import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalTheme } from './constants/theme';
import Test from './components/Test';
import BottomTabs from './components/bottomTabs/BottomTabs';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

export default function App() {


  const [fontLoaded] = useFonts({
    'pretendard': require('./assets/fonts/Pretendard-Regular.otf'),
    'pretendard-bold': require('./assets/fonts/Pretendard-Bold.otf')
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null; // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <>
      <StatusBar style='light' backgroundColor='black' />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ title: '' }}>
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false, }} />
          <Stack.Screen name='test2' component={Test} options={{ headerShown: false, presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

