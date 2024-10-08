import React from "react";
import BottomTabs from "../components/bottomTabs/BottomTabs";
import Test from "../components/Test";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

export function Logined() {
  return (
    <>
      {/* <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>여기임?</Text>
      </View> */}
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="test2"
          component={Test}
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
  );
}
