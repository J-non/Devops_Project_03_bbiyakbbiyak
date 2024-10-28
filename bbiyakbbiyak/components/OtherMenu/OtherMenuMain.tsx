import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { styles } from "./MainStyle";
import TabList from "./TabList/TabList";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";
import { userAtom } from "../../store/userAtom";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteNLogout from "./DeleteNLogout/DeleteNLogout";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const OtherMenuMain = () => {
  const navigation = useNavigation<NavigationProps>();
  const [authCtx, setAuthCtx] = useAtom(userAtom);

  const updateInfo = () => {
    navigation.navigate("MyPage");
  };


  const mutation = useMutation({
    mutationFn: (data: string) => deleteUser(data),
    onSuccess: (data) => {
      console.log(data, "success");
      if (data.isDeleted === true) {
        Alert.alert("회원 탈퇴", data.message, [
          {
            text: "확인",
            onPress: async () => {
              await AsyncStorage.removeItem("@token");
              setAuthCtx((prev) => ({
                ...prev,
                token: "", // 토큰을 빈 값으로 설정
                isAuthenticated: false, // 인증 상태를 false로 설정
              }));
            },
          },
        ]);
      }
    },
    onError: (data) => {
      console.log(data, "error");
    },
  });

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
          }));
        },
      },
    ]);
  };

  const deleteUserHandler = () => {
    Alert.alert("회원 탈퇴", "정말로 앱에서 탈퇴하시겠습니까?", [
      { text: "취소" },
      {
        text: "확인",
        onPress: async () => {
          const token = await AsyncStorage.getItem("@token");
          mutation.mutate(token);
        },
      },
    ]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{
          flex: 2, justifyContent: 'center',
          alignContent: 'center', aspectRatio: 1, overflow: 'hidden', borderRadius: 9999, marginVertical: 32
        }}>
          <View style={styles.otherGoogle}>
            {/* <Text style={styles.profileText}>삐약삐약</Text> */}
            <Image style={{ width: '80%', height: '80%' }} source={require('../../assets/images/centered_padded_logo.png')} width={1} height={1} />
          </View>
        </View>
        <TabList onPress={updateInfo}>정보 변경</TabList>
        <View style={{ flexDirection: "row", gap: 40, flex: 3, }}>
          <DeleteNLogout onPress={logOutHandler} styles={styles.logOutText}>
            로그아웃
          </DeleteNLogout>
          <DeleteNLogout onPress={deleteUserHandler} styles={styles.deleteText}>
            회원탈퇴
          </DeleteNLogout>
        </View>
        {/* <TabList>정보 변경</TabList>
      <TabList>정보 변경</TabList>
      <TabList>정보 변경</TabList> */}
      </View>
    </>
  );
};

export default OtherMenuMain;
