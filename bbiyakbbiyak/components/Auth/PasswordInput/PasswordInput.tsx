import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../UI/Input/CustomInput";
import { Valuetype } from "../../../constants/models";
import AlertComponent from "../../UI/Alert/Alert";
import { TextStyle, ViewStyle } from "react-native";

interface PasswordInputProps {
  password: string;
  rePassword?: string;
  setFormValues: any;
  styles: customStyle;
  isLoginScreen?: boolean;
  placeholder: string;
  isPasswordTrue?: boolean;
  setIsPasswordTrue?: any;
  valueType: "password" | "email" | "userName" | "rePassword" | "phone";
}

interface customStyle {
  alert: ViewStyle | TextStyle;
  textInput: ViewStyle | TextStyle;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setFormValues,
  styles,
  isLoginScreen,
  isPasswordTrue,
  placeholder,
  valueType,
  rePassword,
  setIsPasswordTrue,
}) => {
  const [isPressed, setIsPressed] = useState(true);
  const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const pressed = () => {
    setIsPressed((prev) => !prev);
  };

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev: any) => ({ ...prev, [inputType]: value }));
  }

  return (
    <>
      <CustomInput
        style={styles.textInput}
        placeholder={placeholder}
        inputValue={setFormValues}
        inputType={valueType}
        value={password}
        secureTextEntry={isPressed}
        onChangeText={(text: any) => {
          setValueState(valueType, text);

          // 비밀번호와 비밀번호 확인이 동일한지 확인
          if (text === rePassword) {
            setIsPasswordTrue(true);
          } else {
            setIsPasswordTrue(false);
          }
        }}
        children={
          <Ionicons
            name={isPressed ? "eye-off-outline" : "eye-outline"}
            style={{ fontSize: 25 }}
            onPress={pressed}
          />
        }
      />

      {/* 비밀번호 유효성 검사는 로그인 화면일 때만 적용 */}
      {password && !regPassword.test(password) && isLoginScreen && (
        <AlertComponent style={styles.alert}>
          영문, 숫자, 특수기호 1개 이상 포함
        </AlertComponent>
      )}

      {/* 비밀번호 확인일 때만 비밀번호 불일치 경고 */}
      {rePassword !== password && isPasswordTrue === false && (
        <AlertComponent style={styles.alert}>
          비밀번호가 일치하지 않습니다.
        </AlertComponent>
      )}
    </>
  );
};

export default PasswordInput;
