import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./SignUpScreenStyle";
import TermConditionContainer from "../termConditionContainer/TermConditionContainer";
import Header from "../../UI/Header/Header";
import SignUpForm from "../SignUpForm/SingUpForm";

const SignUpScreen = () => {
  const [isEmailSent, setIsEmailSent] = useState(false); // 메일 전송이 갔는지 안갔는지에 대한 boolean
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 유저가 인증코드 확인을 받았는지
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    userName: "",
    phone: "",
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Header title="회원가입" />
            <SignUpForm
              isCodeVerified={isCodeVerified}
              setIsCodeVerified={setIsCodeVerified}
              formValues={formValues}
              setFormValues={setFormValues}
              isEmailSent={isEmailSent}
              setIsEmailSent={setIsEmailSent}
            />
          </View>
          <View style={{ marginTop: isEmailSent ? 20 : 0 }}>
            <TermConditionContainer
              setIsEmailSent={setIsEmailSent}
              setIsCodeVerified={setIsCodeVerified}
              isEmailSent={isEmailSent}
              isCodeVerified={isCodeVerified}
              formValues={setFormValues}
              signUpValue={formValues}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
