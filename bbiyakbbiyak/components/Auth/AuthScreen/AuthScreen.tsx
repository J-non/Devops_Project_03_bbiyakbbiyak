import React from "react";
import { View } from "react-native";
import LoginScreen from "../LoginScreen/LoginScreen";
import styles from "./AuthScreenStyle";

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

export default AuthScreen;
