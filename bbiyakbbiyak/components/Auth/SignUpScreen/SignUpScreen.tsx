import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./SignUpScreenStyle";
import TermConditionContainer from "../termConditionContainer/TermConditionContainer";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import { Valuetype, valueType } from "../../../constants/models";

const SignUpScreen = () => {
  // const [inputValue, setInputValues] = useState("");

  const [formValues, setFormValues] = useState({
    id: "",
    password: "",
    nickName: "",
  });

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Header title="회원가입" />
        <CustomInput
          placeholder="이메일"
          style={styles.textInput}
          inputValue={setValueState}
          inputType={valueType.id}
          value={formValues.id}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.id, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
        {/* <Alert style={styles.alert}>필수 조건 항목입니다.</Alert>
        <Alert style={styles.alert}>6~16자의 영문자, 소문자</Alert> */}
        <CustomInput
          placeholder="비밀번호"
          style={styles.textInput}
          inputValue={setValueState}
          inputType={valueType.password}
          value={formValues.password}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.password, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
        {/* <Alert style={styles.alert}>필수 조건 항목입니다.</Alert> */}
        <CustomInput
          placeholder="닉네임"
          style={styles.textInput}
          inputValue={setValueState}
          inputType={valueType.nickName}
          value={formValues.nickName}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.nickName, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
      </View>
      <TermConditionContainer
        formValues={setFormValues}
        signUpValue={formValues}
      />
    </View>
  );
};

export default SignUpScreen;
