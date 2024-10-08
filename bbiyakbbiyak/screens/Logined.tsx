import React from "react";
import BottomTabs from "../components/bottomTabs/BottomTabs";
import Test from "../components/Test";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function Logined() {
  return (
    <>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="test2"
        component={Test}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </>
  );
}
