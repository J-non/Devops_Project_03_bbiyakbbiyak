import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./FindMyIdStyle";
import {
  RootStackParamList,
  Valuetype,
  valueType,
} from "../../../constants/models";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { useMutation } from "@tanstack/react-query";
import { findID } from "../../../api";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import VerifyCode from "../VerifyCode/VerifyCode";
import TimerInput from "../../UI/Input/TimerInput";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const FindMyId = () => {
  const navigation = useNavigation<NavigationProps>();

  const [userID, setUserID] = useState({
    phone: "",
  });
  const [isAuthCodeSent, setIsAuthCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [inputAuthCode, setInputAuthCode] = useState("");
  const [serverAuthCode, setServerAuthCode] = useState("");
  const [count, setCount] = useState(300);
  const [searchedUser, setSearchedUser] = useState();

  const mutation = useMutation({
    mutationFn: (data: { phone: string } | null) => findID(data),
    onSuccess: (data) => {
      console.log(data);
      Alert.alert("요청 성공", data.msg, [
        {
          text: "확인",
        },
      ]);
      setServerAuthCode(data.authNum);
      setIsAuthCodeSent(true);
      setSearchedUser(data.result);
    },
    onError: (error) => {
      console.log(error, "error");
      Alert.alert("요청 실패", error.message, [{ text: "확인" }]);
      setIsAuthCodeSent(false);
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

  const handleFindId = () => {
    mutation.mutate(userID);
  };

  const handleCodeExpired = () => {
    setServerAuthCode("");
    Alert.alert(
      "인증 코드 만료",
      "인증 코드가 만료되었습니다. 다시 요청해주세요."
    );
  };

  const confirmed = () => {
    Alert.alert("휴대폰 인증", "인증 요청을 보내시겠습니까?", [
      { text: "취소" },
      {
        text: "확인",
        onPress: () => {
          setIsAuthCodeSent(true);
          handleFindId();
        },
      },
    ]);
  };

  const getID = () => {
    if (isCodeVerified === true) {
      Alert.alert("찾은 아이디", searchedUser, [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("Unlogin");
          },
        },
      ]);
    }
  };

  function setValueState(inputType: Valuetype, value: string | any) {
    setUserID((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="아이디 찾기" />
      </View>
      <View style={styles.IdSearch}>
        <CustomInput
          style={styles.inputStyle}
          placeholder="01000000000"
          inputValue={setValueState}
          inputType={valueType.phone}
          value={userID.phone}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.phone, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          buttonContainerStyle={styles.button}
          color={GlobalTheme.colors.primary300}
          onPress={confirmed}
        >
          휴대폰 인증하기
        </Button>
        {isAuthCodeSent && (
          <TimerInput
            count={count}
            setCount={setCount}
            setInputAuthCode={setInputAuthCode}
            setIsCodeVerified={setIsCodeVerified}
            inputAuthCode={inputAuthCode}
            serverAuthCode={serverAuthCode}
            isCodeVerified={isCodeVerified}
            type={"phone"}
            email={""}
            phone={userID}
            mutation={mutation}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={getID}
          buttonContainerStyle={styles.buttonStyle}
          color={GlobalTheme.colors.primary300}
        >
          확인
        </Button>
      </View>
    </View>
  );
};

export default FindMyId;
