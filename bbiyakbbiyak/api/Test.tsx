import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import BottomTabs from '../components/bottomTabs/BottomTabs';
import ManageAlarm from '../screens/ManageAlarm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAlarmLogs } from '.';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const Test = () => {

  const { mutate, isSuccess } = useMutation({
    mutationFn: createAlarmLogs,
    onSuccess() { },
    onError(error) { }
  })

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();

      if (isSuccess) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [isSuccess]);

  if (!isSuccess) {
    return null
  }


  return (
    <>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ title: '' }}>
          <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false, }} />
          <Stack.Screen name='ManageAlarm' component={ManageAlarm} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default Test
