import React, { useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./SignUpFormStyle";
import EmailVerification from "../EmailVerification/EmailVerification";
import PasswordInput from "../PasswordInput/PasswordInput";
import OtherInputs from "../OtherInput/OtherInput";
import { valueType } from "../../../constants/models";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import VerifyCode from "../VerifyCode/VerifyCode";

interface SignUpFormProps {
  formValues: {
    rePassword: string;
    email: string;
    password: string;
    userName: string;
    phone: string;
  };
  setFormValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
      rePassword: string;
      userName: string;
      phone: string;
    }>
  >;
  isAuthCodeSent: boolean;
  setIsAuthCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCodeVerified: any;
  isCodeVerified: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  formValues,
  setFormValues,
  isAuthCodeSent,
  setIsAuthCodeSent,
  setIsCodeVerified,
  isCodeVerified,
}) => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [serverAuthCode, setServerAuthCode] = useState("");
  const [isPasswordTrue, setIsPasswordTrue] = useState(null);
  const [count, setCount] = useState(300);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <EmailVerification
        styles={styles}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <PasswordInput
        styles={styles}
        placeholder="비밀번호"
        valueType={valueType.password}
        password={formValues.password}
        isLoginScreen={isLoginScreen}
        setFormValues={setFormValues}
        setIsPasswordTrue={setIsPasswordTrue}
      />
      <PasswordInput
        styles={styles}
        placeholder="비밀번호 확인"
        isPasswordTrue={isPasswordTrue}
        valueType={valueType.rePassword}
        password={formValues.rePassword}
        rePassword={formValues.password}
        setIsPasswordTrue={setIsPasswordTrue}
        setFormValues={setFormValues}
      />
      <OtherInputs
        styles={styles}
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <VerifyCode
        formValues={formValues}
        setFormValues={setFormValues}
        isAuthCodeSent={isAuthCodeSent}
        setIsAuthCodeSent={setIsAuthCodeSent}
        setInputAuthCode={setInputAuthCode}
        setServerAuthCode={setServerAuthCode}
        setIsCodeVerified={setIsCodeVerified}
        inputAuthCode={inputAuthCode}
        serverAuthCode={serverAuthCode}
        count={count}
        setCount={setCount}
        isCodeVerified={isCodeVerified}
      />
    </View>
  );
};

export default SignUpForm;
