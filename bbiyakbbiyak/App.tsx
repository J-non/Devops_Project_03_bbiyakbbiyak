import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Test from './api/Test';
import { userPushTokenAtom } from './store/userPushTokenAtom';
import { useAtom } from 'jotai';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Notifications.setNotificationHandler({
  // 알림 포그라운드에서 어떻게 처리할것인지
  handleNotification: async () => ({
    shouldShowAlert: true,    // 알림을 화면에 표시할지 여부
    shouldPlaySound: true,    // 알림 소리를 재생할지 여부
    shouldSetBadge: false,    // 배지를 설정할지 여부
  }),
});


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
  // 푸시토큰
  const [userPushToken, setUserPushToken] = useAtom(userPushTokenAtom) // 푸시토큰 전역 상태
  useEffect(() => {
    const registerForPushNotifications = async () => {
      // 기존에 저장된 토큰 가져오기
      const storedToken = await AsyncStorage.getItem('pushToken');
      if (storedToken) {
        setUserPushToken(storedToken);
        return;
      }
      // 푸시 알림 권한 요청 및 토큰 획득
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('푸시 알림 권한이 필요합니다.');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data; // 디바이스 푸시 토큰 값 가져오기
      setUserPushToken(token);

      // 로컬 저장소에 토큰 저장
      await AsyncStorage.setItem('pushToken', token);
    }
    registerForPushNotifications()
    // 토큰 갱신 처리 tokenListener 필요함
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

