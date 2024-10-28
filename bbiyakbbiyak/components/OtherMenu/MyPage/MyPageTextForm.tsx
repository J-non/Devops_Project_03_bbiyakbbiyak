import React, { useEffect, useState } from "react";
import { styles } from "./MyPageStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../../../api";
import { Valuetype, valueType } from "../../../constants/models";
import CustomInput from "../../UI/Input/CustomInput";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AlertComponent from "../../UI/Alert/Alert";

const MyPageTextForm = (props: any) => {
  const { name, setName, token, bbiyakUpdate, setBbiyakUpdate } = props;
  const [isPressed, setIsPressed] = useState(true);
  const [isRePressed, setIsrePressed] = useState(true);
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  useEffect(() => {
    async function fetchUser() {
      const myInfo = await AsyncStorage.getItem("@user");
      const parsedInfo = myInfo ? JSON.parse(myInfo) : null;

      setName(parsedInfo);
    }

    fetchUser();
  }, []);

  const pressed = () => {
    setIsPressed((prev: any) => !prev);
  };

  const rePressed = () => {
    setIsrePressed((prev: any) => !prev);
  };

  /** 페이지 들어올때 서버 요청으로 google OAUTH 유저면 비밀번호 변경창 안보여주게 하기*/
  const { data, error } = useQuery({
    queryKey: ["getInfo", name?.email || token],
    queryFn: () => {
      if (name?.email) {
        return getInfo(name.email);
      } else {
        return getInfo(token);
      }
    },
    enabled: !!token || !!name?.email,
  });

  useEffect(() => {
    setBbiyakUpdate(data);
    setBbiyakUpdate((prev: any) => ({ ...prev, password: "", rePassword: "" }));
  }, [data]);

  const setValueState = (inputType: Valuetype, value: string | any) => {
    if (inputType === valueType.name) {
      setName((prev: any) => ({ ...prev, [inputType]: value }));
    } else {
      setBbiyakUpdate((prev: any) => ({ ...prev, [inputType]: value }));
    }
  };

  return (
    <View style={styles.textContainer}>
      <CustomInput
        value={name ? name?.email : bbiyakUpdate?.email}
        editable={false}
        style={styles.textInput}
        inputType={valueType.email}
      ></CustomInput>
      <CustomInput
        value={name ? name?.name : bbiyakUpdate?.userName}
        style={styles.textInput}
        placeholder='사용자 이름'
        onChangeText={(text: any) => {
          if (setValueState) {
            if (name) {
              setValueState(valueType.name, text);
            } else {
              setValueState(valueType.userName, text);
            }
          }
        }}
      ></CustomInput>
      {data?.isOAuthUser === false ? (
        <CustomInput
          placeholder="변경할 새 비밀번호"
          value={bbiyakUpdate?.password}
          style={styles.textInput}
          secureTextEntry={isPressed}
          onChangeText={(text: string) => {
            if (setValueState) {
              setValueState(valueType.password, text);
            }
          }}
        >
          <Ionicons
            name="eye-outline"
            style={{ fontSize: 25 }}
            onPress={pressed}
          />
        </CustomInput>
      ) : null}

      {bbiyakUpdate?.password &&
        !regPassword.test(bbiyakUpdate?.password) &&
        isLoginScreen && (
          <AlertComponent style={styles.alert}>
            변경시 영문, 숫자, 특수기호 1개 이상 포함
          </AlertComponent>
        )}

      {data?.isOAuthUser === false ? (
        <CustomInput
          placeholder="변경할 새 비밀번호 확인"
          style={styles.textInput}
          secureTextEntry={isRePressed}
          value={bbiyakUpdate?.rePassword}
          onChangeText={(text: string) => {
            if (setValueState) {
              setValueState(valueType.rePassword, text);
            }
          }}
        >
          <Ionicons
            name="eye-outline"
            style={{ fontSize: 25 }}
            onPress={rePressed}
          />
        </CustomInput>
      ) : null}
      {bbiyakUpdate?.password !== bbiyakUpdate?.rePassword && (
        <AlertComponent style={styles.alert}>
          비밀번호가 일치하지 않습니다.
        </AlertComponent>
      )}
    </View>
  );
};

export default MyPageTextForm;
