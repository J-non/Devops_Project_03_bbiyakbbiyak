import React from "react";
import { View, Text } from "react-native";
import AuthScreen from "../components/Auth/AuthScreen/AuthScreen";

const Unlogin = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <AuthScreen />
    </View>
  );
};

export default Unlogin;
