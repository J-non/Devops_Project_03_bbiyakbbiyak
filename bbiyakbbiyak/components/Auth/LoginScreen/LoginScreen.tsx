import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./LoginScreenStyle";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { Valuetype, valueType } from "../../../constants/models";
import AtagContent from "../AtagContent/AtagContent";

const LoginScreen = () => {
  const dummyData = {
    id: "test",
    pw: "test",
  };

  const [stateValue, setStateValue] = useState({
    id: "",
    password: "",
  });

  function handleLogin() {
    console.log("ID:", stateValue.id);
    console.log("Password:", stateValue.password);
    // dummyData 나중에 서버에서 응답 받아서 응답받은 데이터로 바꾸기
    if (
      stateValue.id === dummyData.id &&
      stateValue.password === dummyData.pw
    ) {
      Alert.alert("로그인", "로그인 성공", [{ text: "확인" }]);
      // 서버로 요청 후 토큰 받기
      // 또한 유저 정보 atom에 저장해놓기
      setStateValue({
        id: "",
        password: "",
      });
    } else {
      Alert.alert("로그인", "아이디 또는 비밀번호를 확인해주세요", [
        { text: "확인" },
      ]);
    }
  }

  function setValueState(inputType: Valuetype, value: string | any) {
    setStateValue((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          title="개인 회원으로 로그인"
          subtitle="개인화된 경험을 시작하세요."
        />
        <View style={styles.inputContainer}>
          <CustomInput
            style={styles.textInput}
            placeholder="아이디"
            inputValue={setValueState}
            inputType={valueType.id}
            value={stateValue.id}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.id, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
          <CustomInput
            style={styles.textInput}
            placeholder="비밀번호"
            inputValue={setValueState}
            inputType={valueType.password}
            value={stateValue.password}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.password, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
          <Button
            buttonContainerStyle={styles.buttonStyle}
            color={GlobalTheme.colors.primary300}
            onPress={handleLogin}
          >
            로그인
          </Button>
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.image} activeOpacity={0.6}>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/images/smallGoogle.png")}
            />
          </TouchableOpacity>
          <AtagContent />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
