import React, { useEffect } from "react";
import BottomTabs from "../components/bottomTabs/BottomTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OtherMenuMain from "../components/OtherMenu/OtherMenuMain";
import ManageAlarm from "./ManageAlarm";
import { useMutation } from "@tanstack/react-query";
import { createAlarmLogs } from "../api";
import * as Notifications from 'expo-notifications';
import { ActivityIndicator, Alert, View } from "react-native";
import axios from "axios";

const Stack = createNativeStackNavigator();

export function Logined() {

  const { mutate, isSuccess } = useMutation({
    mutationFn: createAlarmLogs,
    onSuccess() { },
    onError(error) { }
  })

  useEffect(() => {
    mutate();
  }, [])


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
        await axios.post('http://192.168.0.82:3000/alarm/savepushtoken', { userId, token })
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

  if (!isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtherMenuMain"
          component={OtherMenuMain}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name='ManageAlarm' component={ManageAlarm} options={{}} />
      </Stack.Navigator>
    </>
  );
}
