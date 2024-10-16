import { Text, TextInput, View } from "react-native";
import React from "react";
import { styles } from "./TimerInputStyle";
import Button from "../Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const TimerInput = ({
  count,
  setCount,
  setInputAuthCode,
  serverAuthCode,
  inputAuthCode,
  isCodeVerified,
  setIsCodeVerified,
  email,
  mutation,
  type,
  phone,
}: {
  count: any;
  setCount: any;
  setInputAuthCode: any;
  serverAuthCode: any;
  inputAuthCode: string;
  isCodeVerified: boolean;
  setIsCodeVerified: any;
  email: string;
  mutation: any;
  type: string;
  phone: string;
}) => {
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const reSend = () => {
    if (count !== 0) return;
    setCount(300); // 카운터 다시 300으로 설정하고 인증메일 다시보내기
    if (type === "email") {
      mutation.mutate(email);
    } else if (type === "phone") {
      mutation.mutate(phone);
    }
  };

  const acceptUser = () => {
    if (serverAuthCode.toString() === inputAuthCode) {
      setIsCodeVerified(true);
      setCount(300);
      setInputAuthCode("");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          editable={!isCodeVerified}
          keyboardType="numeric"
          placeholder="인증코드 6자리"
          maxLength={6}
          onChangeText={(text) => {
            setInputAuthCode(text);
          }}
        />
      </View>
      <View style={styles.timer}>
        <Text>{isCodeVerified ? null : formatTime(count)}</Text>
      </View>
      <View style={styles.timerContainer}>
        {isCodeVerified ? (
          <Ionicons name="checkmark-outline" style={styles.checkmark} />
        ) : (
          <Button
            disabled={isCodeVerified}
            buttonContainerStyle={styles.button}
            color={GlobalTheme.colors.primary300}
            onPress={count === 0 ? reSend : acceptUser}
          >
            {count === 0 ? "재발송" : "확인"}
          </Button>
        )}
      </View>
    </View>
  );
};

export default TimerInput;
