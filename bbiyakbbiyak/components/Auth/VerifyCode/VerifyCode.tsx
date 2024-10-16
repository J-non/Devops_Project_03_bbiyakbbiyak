import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { styles } from "./VerifyCodeStyle";
import { useMutation } from "@tanstack/react-query";
import { emailAPI } from "../../../api";
import TimerInput from "../../UI/Input/TimerInput";
import { Valuetype } from "../../../constants/models";
import AlertComponent from "../../UI/Alert/Alert";

interface EmailVerificationProps {
  formValues: any;
  setFormValues: any;
  isAuthCodeSent: boolean;
  setIsAuthCodeSent: any;
  inputAuthCode: string;
  setInputAuthCode: any;
  serverAuthCode: string;
  setServerAuthCode: any;
  count: number;
  setCount: any;
  isCodeVerified: boolean;
  setIsCodeVerified: any;
  // styles: customStyle;
}

// interface customStyle {
//   alert: ViewStyle | TextStyle;
//   textInput: ViewStyle | TextStyle;
// }

const VerifyCode: React.FC<EmailVerificationProps> = ({
  formValues,
  setFormValues,
  isAuthCodeSent,
  setIsAuthCodeSent,
  inputAuthCode,
  setInputAuthCode,
  serverAuthCode,
  setServerAuthCode,
  count,
  setCount,
  isCodeVerified,
  setIsCodeVerified,
}) => {
  const email = formValues.email;
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const phone = formValues.phone;
  const regPhone = /^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/;

  const [authType, setAuthType] = useState("");

  const mutation = useMutation({
    mutationFn: (data: object) => emailAPI(data),
    onSuccess: (_data) => {
      if (_data.ok) {
        Alert.alert(_data.type, _data.msg, [{ text: "확인" }]);
        setIsAuthCodeSent(true);
        setServerAuthCode(_data.authNum);
      }
    },
    onError: (error) => {
      Alert.alert("회원가입 실패", error.message, [{ text: "확인" }]);
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAuthCodeSent && count > 0 && !isCodeVerified) {
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
  }, [isAuthCodeSent, count, isCodeVerified]);

  const handleCodeExpired = () => {
    setServerAuthCode("");
    Alert.alert(
      "인증 코드 만료",
      "인증 코드가 만료되었습니다. 다시 요청해주세요."
    );
  };

  const handleCode = (type: string) => {
    if (!regEmail.test(email)) return;
    if (type === "email") {
      mutation.mutate({ email, type });
    }
    if (!regPhone.test(phone)) return;
    if (type === "phone") {
      mutation.mutate({ phone, type });
    }
  };

  function setValueState(inputType: Valuetype, value: string | any) {
    setFormValues((prev: any) => ({ ...prev, [inputType]: value }));
  }

  const confirmed = (msg: string, type: string) => {
    Alert.alert("인증 요청", msg, [
      { text: "취소" },
      {
        text: "확인",
        onPress: () => {
          if (type === "email") {
            handleCode("email");
            setAuthType("email");
          } else {
            handleCode("phone");
            setAuthType("phone");
          }
        },
      },
    ]);
  };
  return (
    <>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          buttonContainerStyle={styles.button}
          color={GlobalTheme.colors.primary300}
          onPress={() => confirmed("이메일 인증 하시겠습니까?", "email")}
        >
          이메일 인증하기
        </Button>
        <Button
          buttonContainerStyle={styles.button}
          color={GlobalTheme.colors.primary300}
          onPress={() => confirmed("휴대폰 인증 하시겠습니까?", "phone")}
        >
          휴대폰 인증하기
        </Button>
      </View>
      {!isAuthCodeSent && (
        <View>
          <AlertComponent style={styles.alert}>
            둘 중 하나의 인증이 필요합니다.
          </AlertComponent>
        </View>
      )}
      {isAuthCodeSent && (
        <TimerInput
          count={count}
          setCount={setCount}
          setInputAuthCode={setInputAuthCode}
          setIsCodeVerified={setIsCodeVerified}
          inputAuthCode={inputAuthCode}
          serverAuthCode={serverAuthCode}
          isCodeVerified={isCodeVerified}
          type={authType}
          email={email}
          phone={phone}
          mutation={mutation}
        />
      )}
    </>
  );
};

export default VerifyCode;
