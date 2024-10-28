import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { NavigationContainer } from "@react-navigation/native";
import { AuthCheck } from "./components/Auth/AuthCheck/AuthCheck";

Notifications.setNotificationHandler({
  // 알림 포그라운드에서 어떻게 처리할것인지
  handleNotification: async () => ({
    shouldShowAlert: true,    // 알림을 화면에 표시할지 여부
    shouldPlaySound: true,    // 알림 소리를 재생할지 여부
    shouldSetBadge: false,    // 배지를 설정할지 여부
  }),
});

// 알림 채널 설정
Notifications.setNotificationChannelAsync('default', {
  name: '삐약삐약 푸시 알림',
  importance: Notifications.AndroidImportance.MAX,
  lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  sound: 'default'
})

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
    pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "pretendard-bold": require("./assets/fonts/Pretendard-Bold.otf"),
  });


  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthCheck />
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
