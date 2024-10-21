import React from 'react'
import CategoryTabs from '../components/categoryTabs/CategoryTabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Drink, Etc, Medicine } from '../components/main/screens/MainScreenCategories';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <>
      <CategoryTabs />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='medicine' component={Medicine} />
        <Stack.Screen name='drink' component={Drink} />
        <Stack.Screen name='etc' component={Etc} />
      </Stack.Navigator>
    </>
  )
}

export default Main
