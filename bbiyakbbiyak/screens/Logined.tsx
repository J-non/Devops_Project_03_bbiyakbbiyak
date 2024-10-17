import React from "react";
import BottomTabs from "../components/bottomTabs/BottomTabs";
import Test from "../components/OtherMenu/OtherMenuMain";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import OtherMenuMain from "../components/OtherMenu/OtherMenuMain";
import Unlogin from "./Unlogin";

const Stack = createNativeStackNavigator();

export function Logined() {
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
      </Stack.Navigator>
    </>
  );
}
