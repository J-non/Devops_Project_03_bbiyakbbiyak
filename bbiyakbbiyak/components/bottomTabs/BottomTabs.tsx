import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { GlobalTheme } from '../../constants/theme';
import { Ionicons, Entypo } from '@expo/vector-icons'
import Main from '../../screens/Main';
import LogCalendar from '../../screens/LogCalendar';
import IconButton from '../UI/IconButton';
import AllAlarm from '../../screens/AllAlarm';
import { alarmCountAtom } from '../../store/alarmCountAtom';
import { useAtom } from 'jotai';
import { Alert, View } from 'react-native';


const BottomTabs = () => {
  const [alarmCount, setAlarmCount] = useAtom(alarmCountAtom)

  const BottomTabs = createBottomTabNavigator();
  return (
    <>
      <BottomTabs.Navigator screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#000',
        headerTitleStyle: { fontFamily: 'pretendard-bold' },
        tabBarStyle: { height: 70, paddingTop: 10 },
        tabBarLabelStyle: { paddingBottom: 12, fontSize: 12, fontFamily: 'pretendard' },
        tabBarActiveTintColor: GlobalTheme.colors.accent500
      })}>
        <BottomTabs.Screen name='main' component={Main}
          options={{
            title: '삐약삐약',
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' size={size} color={color} />
          }} />
        <BottomTabs.Screen name='Alarm' component={AllAlarm} options={({ navigation }) => ({
          title: '알람',
          tabBarLabel: '알람',
          headerRight: () => {
            return <IconButton
              icon='add'
              size={36}
              color={GlobalTheme.colors.accent500}
              onPress={() => {
                if (alarmCount === 10) {
                  Alert.alert("", "알람은 10개까지만 등록 가능해요.")
                } else {
                  navigation.navigate('ManageAlarm')
                }
              }} />
          }, // +누르면 알람관리페이지로이동 
          tabBarIcon: ({ color, size }) => <Ionicons name='alarm-outline' size={size} color={color} />
        })} />
        <BottomTabs.Screen name='logCalendar' component={LogCalendar} options={{
          title: '기록',
          tabBarLabel: '기록',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar-outline' size={size} color={color} />
        }} />
        <BottomTabs.Screen name='test4' component={View} options={{
          title: '더보기',
          tabBarLabel: '더보기',
          tabBarIcon: ({ color, size }) => <Entypo name='dots-three-horizontal' size={size} color={color} />
        }} />
      </BottomTabs.Navigator>
    </>
  )
}

export default BottomTabs
