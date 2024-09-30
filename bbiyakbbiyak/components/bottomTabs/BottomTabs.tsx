import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Test from '../Test';
import { GlobalTheme } from '../../constants/theme';
import { Ionicons, Entypo } from '@expo/vector-icons'


const BottomTabs = () => {
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
        <BottomTabs.Screen name='test' component={Test}
          options={{
            title: '삐약삐약',
            tabBarLabel: '홈',
            tabBarIcon: ({ color, size }) => <Ionicons name='home-outline' size={size} color={color} />
          }} />
        <BottomTabs.Screen name='test2' component={Test} options={{
          title: '알람',
          tabBarLabel: '알람',
          tabBarIcon: ({ color, size }) => <Ionicons name='alarm-outline' size={size} color={color} />
        }} />
        <BottomTabs.Screen name='test3' component={Test} options={{
          title: '기록',
          tabBarLabel: '기록',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar-outline' size={size} color={color} />
        }} />
        <BottomTabs.Screen name='test4' component={Test} options={{
          title: '더보기',
          tabBarLabel: '더보기',
          tabBarIcon: ({ color, size }) => <Entypo name='dots-three-horizontal' size={size} color={color} />
        }} />
      </BottomTabs.Navigator>
    </>
  )
}

export default BottomTabs
