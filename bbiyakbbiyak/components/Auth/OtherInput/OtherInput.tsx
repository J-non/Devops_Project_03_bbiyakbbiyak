import React from "react";
import CustomInput from "../../UI/Input/CustomInput";
import AlertComponent from "../../UI/Alert/Alert";
import { Valuetype, valueType } from "../../../constants/models";
import { Pressable, Text, TextStyle, ViewStyle } from "react-native";
import { View } from "react-native-animatable";

interface OtherInputsProps {
  formValues: any;
  setFormValues: any;
  styles: customStyle;
}
interface customStyle {
  alert: ViewStyle | TextStyle;
  textInput: ViewStyle | TextStyle;
  textInputt: ViewStyle | TextStyle;
  phoneButton: ViewStyle | TextStyle;
}

const OtherInputs: React.FC<OtherInputsProps> = ({
  formValues,
  setFormValues,
  styles,
}) => {
  const phone = formValues.phone;
  const regPhone = /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/;

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev: any) => ({ ...prev, [inputType]: value }));
  }

  return (
    <>
      <CustomInput
        style={styles.textInput}
        placeholder="닉네임"
        inputValue={setFormValues}
        inputType={valueType.userName}
        value={formValues.userName}
        onChangeText={(text: any) => {
          setValueState(valueType.userName, text);
        }}
      />
      <CustomInput
        style={styles.textInput}
        placeholder="휴대폰번호"
        inputValue={setFormValues}
        inputType={valueType.phone}
        value={formValues.phone}
        keyboardType="numeric"
        onChangeText={(text: any) => {
          setValueState(valueType.phone, text);
        }}
      ></CustomInput>
      {phone && !regPhone.test(phone) && (
        <AlertComponent style={styles.alert}>
          유효하지 않은 핸드폰 번호 형식입니다.
        </AlertComponent>
      )}
    </>
  );
};

export default OtherInputs;
