import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalTheme } from './constants/theme';
import BottomTabs from './components/bottomTabs/BottomTabs';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import ManageAlarm from './screens/ManageAlarm';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { test } from './api';
import Test from './api/Test';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logDateFn } from './dateFormat/logDateAsyncStorage';


const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 0
    }
  }
})

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
      <QueryClientProvider client={queryClient} >
        <Test />
      </QueryClientProvider>
    </>
  );
}

