import { StatusBar } from 'expo-status-bar';
import { Alert, } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Test from './api/Test';

Notifications.setNotificationHandler({
  // 알림 포그라운드에서 어떻게 처리할것인지
  handleNotification: async () => ({
    shouldShowAlert: true,    // 알림을 화면에 표시할지 여부
    shouldPlaySound: true,    // 알림 소리를 재생할지 여부
    shouldSetBadge: false,    // 배지를 설정할지 여부
  }),
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 0
    }
  }
})

export default function App() {

  useEffect(() => {
    const registerForPushNotifications = async () => {
      // 푸시 알림 권한 요청 및 토큰 획득
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('푸시 알림 권한이 필요합니다.');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data; // expo푸시 토큰 가져오기

      const userId = 1
      await sendToken(userId, token)
    }
    registerForPushNotifications()

    // 서버에 토큰 전송 함수
    const sendToken = async (userId: number, token: string) => {
      try {
        console.log(userId, token)
        await axios.post('http://192.168.0.81:3000/alarm/savepushtoken', { userId, token })
      } catch (error) {
        console.log(error)
      }
    }

    // // 토큰 갱신 처리 tokenListener
    // const tokenListener = Notifications.addPushTokenListener(tokenData => {
    //   const newToken = tokenData.data;
    //   console.log(`뉴토큰${newToken}`)
    //   setUserPushToken(newToken);
    //   // 서버에 새 토큰 전송
    //   // sendTokenToServer(newToken);
    // });
    // return () => {
    //   tokenListener.remove();
    // };

  }, [])



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
    <QueryClientProvider client={queryClient}>
      <StatusBar style='light' backgroundColor='black' />
      <Test />
    </QueryClientProvider>
  );
}

