import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAtom } from "jotai";
import { userAtom } from "../store/userAtom";
import Unlogin from "../screens/Unlogin";
import { Logined } from "../screens/Logined";
import SignUpScreen from "../components/Auth/SignUpScreen/SignUpScreen";
import FindMyId from "../components/Auth/FindMyId/FindMyId";
import FindMyPw from "../components/Auth/FindMyPw/FindMyPw";
import PasswordUpdate from "../components/Auth/PasswordUpdate/PasswordUpdate";

export type RootStackParamList = {
  signupScreen: undefined;
  findID: undefined;
  findPW: undefined;
  changePW: undefined;
  Unlogin: undefined;
  Logined: undefined;
  test2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const [authCtx, setAuthCtx] = useAtom(userAtom);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!authCtx.isAuthenticated && (
        <Stack.Screen name="Unlogin" component={Unlogin} />
      )}
      {authCtx.isAuthenticated && (
        <Stack.Screen name="Logined" component={Logined} />
      )}
      <Stack.Screen
        name="signupScreen"
        component={SignUpScreen}
        options={{ headerShown: true, title: "뒤로가기" }}
      />
      <Stack.Screen
        name="findID"
        component={FindMyId}
        options={{ headerShown: true, title: "뒤로가기" }}
      />
      <Stack.Screen
        name="findPW"
        component={FindMyPw}
        options={{ headerShown: true, title: "뒤로가기" }}
      />
      <Stack.Screen
        name="changePW"
        component={PasswordUpdate}
        options={{ headerShown: false, title: "뒤로가기" }}
      />
    </Stack.Navigator>
  );
}
