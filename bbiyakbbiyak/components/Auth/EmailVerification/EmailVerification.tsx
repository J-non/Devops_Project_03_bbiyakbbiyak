import React, { useEffect } from "react";
import { Alert, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import CustomInputWithButton from "../../UI/Input/CustomInputWithButton";
import TimerInput from "../../UI/Input/TimerInput";
import AlertComponent from "../../UI/Alert/Alert";
import { Valuetype, valueType } from "../../../constants/models";
import { useMutation } from "@tanstack/react-query";
import { emailAPI } from "../../../api";

interface EmailVerificationProps {
  formValues: any;
  setFormValues: any;
  isEmailSent: boolean;
  setIsEmailSent: any;
  inputAuthCode: string;
  setInputAuthCode: any;
  serverAuthCode: string;
  setServerAuthCode: any;
  count: number;
  setCount: any;
  isCodeVerified: boolean;
  setIsCodeVerified: any;
  styles: customStyle;
}

interface customStyle {
  alert: ViewStyle | TextStyle;
  textInput: ViewStyle | TextStyle;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  formValues,
  setFormValues,
  isEmailSent,
  setIsEmailSent,
  inputAuthCode,
  setInputAuthCode,
  serverAuthCode,
  setServerAuthCode,
  count,
  setCount,
  isCodeVerified,
  setIsCodeVerified,
  styles,
}) => {
  const email = formValues.email;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const mutation = useMutation({
    mutationFn: (data: string) => emailAPI(data),
    onSuccess: (_data) => {
      if (_data.ok) {
        Alert.alert("이메일", _data.msg, [{ text: "확인" }]);
        setIsEmailSent(true);
        setServerAuthCode(_data.authNum);
      }
    },
    onError: (error) => {
      Alert.alert("회원가입 실패", error.message, [{ text: "확인" }]);
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isEmailSent && count > 0 && !isCodeVerified) {
      interval = setInterval(() => {
        setCount((prev: number) => prev - 1);
      }, 1000);
    }

    if (count === 0 && !isCodeVerified) {
      handleCodeExpired();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isEmailSent, count, isCodeVerified]);

  const handleCodeExpired = () => {
    setServerAuthCode("");
    Alert.alert(
      "인증 코드 만료",
      "인증 코드가 만료되었습니다. 다시 요청해주세요."
    );
  };

  const handleEmail = () => {
    if (!regEmail.test(email)) return;
    mutation.mutate(email);
  };

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev: any) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <CustomInputWithButton
        placeholder="이메일 @직접입력"
        inputValue={setFormValues}
        inputType={valueType.email}
        value={formValues.email}
        onButtonPress={handleEmail}
        onChangeText={(text: any) => {
          setValueState(valueType.email, text);
        }}
      />
      {email && !regEmail.test(email) && (
        <AlertComponent style={styles.alert}>
          유효하지 않은 이메일 형식입니다.
        </AlertComponent>
      )}
      {isEmailSent && (
        <TimerInput
          count={count}
          setCount={setCount}
          setInputAuthCode={setInputAuthCode}
          setIsCodeVerified={setIsCodeVerified}
          inputAuthCode={inputAuthCode}
          serverAuthCode={serverAuthCode}
          isCodeVerified={isCodeVerified}
          email={email}
          mutation={mutation}
        />
      )}
    </View>
  );
};

export default EmailVerification;
