import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { styles } from "./MainStyle";
import TabList from "./TabList/TabList";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const OtherMenuMain = () => {
  const navigation = useNavigation<NavigationProps>();

  const updateInfo = () => {
    navigation.navigate("MyPage");
  };
  const [authCtx, setAuthCtx] = useAtom(userAtom);

  const logOutHandler = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      { text: "취소" },
      {
        text: "확인",
        onPress: async () => {
          await AsyncStorage.removeItem("@token");
          setAuthCtx((prev) => ({
            ...prev,
            token: "", // 토큰을 빈 값으로 설정
            isAuthenticated: false, // 인증 상태를 false로 설정
            authenticate: (token: string) => {
              setAuthCtx((prev: any) => ({
                ...prev,
                token,
                isAuthenticated: true,
              }));
            },
          }));
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
