import React from "react";
import { View } from "react-native";
import { styles } from "./AtagContentStyle";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/Navigation";
import Atag from "../../UI/Atag/Atag";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const AtagContent = () => {
  const navigation = useNavigation<NavigationProps>();

  function signupScreenShow() {
    navigation.navigate("signupScreen");
  }

  function findID() {
    navigation.navigate("findID");
  }

  function findPW() {
    navigation.navigate("findPW");
  }

  return (
    <View style={styles.container}>
      <Atag onPress={findID}>아이디 찾기</Atag>
      <Atag onPress={findPW}>비밀번호 찾기</Atag>
      <Atag style={styles.signUpText} onPress={signupScreenShow}>
        회원가입
      </Atag>
    </View>
  );
};

export default AtagContent;
