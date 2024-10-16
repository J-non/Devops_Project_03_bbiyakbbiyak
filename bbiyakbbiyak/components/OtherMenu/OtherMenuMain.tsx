import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { styles } from "./MainStyle";
import TabList from "./TabList/TabList";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const OtherMenuMain = () => {
  const navigation = useNavigation<NavigationProps>();

  const updateInfo = () => {
    navigation.navigate("MyPage");
  };
  const [logout] = useAtom(userAtom);

  const logOutHandler = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      { text: "취소" },
      {
        text: "확인",
        onPress: () => {
          logout.logout();
          navigation.navigate("Unlogin");
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <TabList onPress={updateInfo}>정보 변경</TabList>
        <Pressable onPress={logOutHandler}>
          <View>
            <Text>로그아웃</Text>
          </View>
        </Pressable>
        {/* <TabList>정보 변경</TabList>
        <TabList>정보 변경</TabList>
        <TabList>정보 변경</TabList> */}
      </View>
    </>
  );
};

export default OtherMenuMain;
