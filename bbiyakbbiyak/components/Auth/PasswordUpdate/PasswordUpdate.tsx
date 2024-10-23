import React, { useState } from "react";
import { Alert, View } from "react-native";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import {
  RootStackParamList,
  Valuetype,
  valueType,
} from "../../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { styles } from "./PasswordUpdateStyle";
import { useMutation } from "@tanstack/react-query";
import { updatePW } from "../../../api";
import PasswordInput from "../PasswordInput/PasswordInput";

type NavigationProps = StackNavigationProp<RootStackParamList>;

type ChangePWScreenProps = {
  route: RouteProp<RootStackParamList, "changePW">; // 파라미터 타입 정의
};

const PasswordUpdate: React.FC<ChangePWScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProps>();
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    rePassword: "",
  });
  const [isLoginScreen] = useState(true);
  const [isPasswordTrue, setIsPasswordTrue] = useState(null);

  const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const mutation = useMutation({
    mutationFn: (data: any) => updatePW(data),
    onSuccess: (data) => {
      Alert.alert("비밀번호 변경", data.message, [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("Unlogin");
            setUpdatePassword({ password: "", rePassword: "" });
          },
        },
      ]);
    },
  });

  function Updated() {
    const dataToSend = { update: updatePassword, param: route.params.data };
    if (
      !regPassword.test(updatePassword.password) ||
      !regPassword.test(updatePassword.rePassword)
    )
      return Alert.alert("변경 실패", "비밀번호 양식을 맞춰주세요", [
        { text: "확인" },
      ]);
    if (updatePassword.password !== updatePassword.rePassword)
      return Alert.alert("변경 실패", "비밀번호를 확인해주세요", [
        { text: "확인" },
      ]);
    mutation.mutate(dataToSend);
  }

  const style = { textInput: styles.textInput, alert: styles.alert };
  return (
    <View style={styles.container}>
      <View style={styles.changePWcontainer}>
        <View style={styles.headerContainer}>
          <Header title="비밀번호변경" />
        </View>
        <View style={styles.PwSearch}>
          <PasswordInput
            styles={style}
            placeholder="비밀번호"
            valueType={valueType.password}
            password={updatePassword.password}
            setFormValues={setUpdatePassword}
            isLoginScreen={isLoginScreen}
            setIsPasswordTrue={setIsPasswordTrue}
          />
          <PasswordInput
            styles={style}
            placeholder="비밀번호 확인"
            isPasswordTrue={isPasswordTrue}
            valueType={valueType.rePassword}
            password={updatePassword.rePassword}
            rePassword={updatePassword.password}
            setFormValues={setUpdatePassword}
            setIsPasswordTrue={setIsPasswordTrue}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={Updated}
            buttonContainerStyle={styles.buttonStyle}
            color={GlobalTheme.colors.primary300}
          >
            비밀번호 변경
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PasswordUpdate;
