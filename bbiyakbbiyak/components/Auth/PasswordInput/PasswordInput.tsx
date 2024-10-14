import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../../UI/Input/CustomInput";
import { Valuetype, valueType } from "../../../constants/models";
import AlertComponent from "../../UI/Alert/Alert";
import { TextStyle, ViewStyle } from "react-native";

interface PasswordInputProps {
  password: string;
  setFormValues: any;
  styles: customStyle;
  isLoginScreen: boolean;
  placeholder: string;
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
  placeholder,
  valueType,
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
        }}
        children={
          <Ionicons
            name="eye-outline"
            style={{ fontSize: 25 }}
            onPress={pressed}
          />
        }
      />
      {password && !regPassword.test(password) && isLoginScreen && (
        <AlertComponent style={styles.alert}>
          영문, 숫자, 특수기호 1개 이상 포함
        </AlertComponent>
      )}
    </>
  );
};

export default PasswordInput;
