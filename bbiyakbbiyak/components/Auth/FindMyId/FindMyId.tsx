import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./FindMyIdStyle";
import {
  RootStackParamList,
  Valuetype,
  valueType,
} from "../../../constants/models";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { useMutation } from "@tanstack/react-query";
import { findID } from "../../../api";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import VerifyCode from "../VerifyCode/VerifyCode";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const FindMyId = () => {
  const navigation = useNavigation<NavigationProps>();

  const [userID, setUserID] = useState({
    email: "",
  });
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [serverAuthCode, setServerAuthCode] = useState("");
  const [count, setCount] = useState(300);

  const mutation = useMutation({
    mutationFn: (data: { email: string } | null) => findID(data),
    onSuccess: (data) => {
      Alert.alert("찾은 아이디", data, [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("Unlogin");
            setUserID({ email: "" });
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert("요청 실패", error.message, [{ text: "확인" }]);
    },
  });

  const handleFindId = () => {
    mutation.mutate(userID);
  };

  function setValueState(inputType: Valuetype, value: string | any) {
    setUserID((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="아이디 찾기" />
      </View>
      <View style={styles.IdSearch}>
        <CustomInput
          style={styles.inputStyle}
          placeholder="ABCDE@gmail.com"
          inputValue={setValueState}
          inputType={valueType.password}
          value={userID.email}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.email, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <VerifyCode
          formValues={userID}
          setFormValues={setUserID}
          isAuthCodeSent={isAuthCodeSent}
          isCodeVerified={isCodeVerified}
          setIsAuthCodeSent={setIsAuthCodeSent}
          setInputAuthCode={setInputAuthCode}
          setServerAuthCode={setServerAuthCode}
          setIsCodeVerified={setIsCodeVerified}
          setCount={setCount}
          count={count}
          inputAuthCode={inputAuthCode}
          serverAuthCode={serverAuthCode}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleFindId}
          buttonContainerStyle={styles.buttonStyle}
          color={GlobalTheme.colors.primary300}
        >
          확인
        </Button>
      </View>
    </View>
  );
};

export default FindMyId;
