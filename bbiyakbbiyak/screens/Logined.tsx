import React, { useEffect } from "react";
import BottomTabs from "../components/bottomTabs/BottomTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OtherMenuMain from "../components/OtherMenu/OtherMenuMain";
import ManageAlarm from "./ManageAlarm";
import { useMutation } from "@tanstack/react-query";
import { createAlarmLogs } from "../api";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from "react-native";
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
    console.log(1)
    const registerForPushNotifications = async () => {
      try {
        if (Device.isDevice) {
          const tokenResponse = await Notifications.getExpoPushTokenAsync({
            projectId: 'dced64aa-76ae-40c8-bb78-8529ab1b887d', // expo project ID
          });
          const token = tokenResponse.data;
          console.log("Push Token:", token);
        } else {
          console.log("푸시 토큰은 실제 디바이스에서만 작동합니다.");
        }
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    }
    registerForPushNotifications()
  }, [])

  // useEffect(() => {
  //   const registerForPushNotifications = async () => {
  //     // 푸시 알림 권한 요청 및 토큰 획득
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('푸시 알림 권한이 필요합니다.');
  //       return;
  //     }
  //     console.log(1111)
  //     const token = (await Notifications.getExpoPushTokenAsync()).data; // expo푸시 토큰 가져오기
  //     console.log(2222)
  //     console.log(token)
  //     const userId = 1
  //     await sendToken(userId, token)
  //   }
  //   registerForPushNotifications()

  //   // 서버에 토큰 전송 함수
  //   const sendToken = async (userId: number, token: string) => {
  //     try {
  //       console.log(userId, token)
  //       await axios.post('http://192.168.0.252:3000/alarm/savepushtoken', { userId, token })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   // // 토큰 갱신 처리 tokenListener
  //   // const tokenListener = Notifications.addPushTokenListener(tokenData => {
  //   //   const newToken = tokenData.data;
  //   //   console.log(`뉴토큰${newToken}`)
  //   //   setUserPushToken(newToken);
  //   //   // 서버에 새 토큰 전송
  //   //   // sendTokenToServer(newToken);
  //   // });
  //   // return () => {
  //   //   tokenListener.remove();
  //   // };

  // }, [])

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
