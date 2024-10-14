import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./TermConditionContainerStyle";
import TermCondition from "../termCondition/TermCondition";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/Navigation";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import Atag from "../../UI/Atag/Atag";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signup } from "../../../api";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const TermConditionContainer = ({
  formValues,
  signUpValue,
  isEmailSent,
  isCodeVerified,
  setIsCodeVerified,
  setIsEmailSent,
}: {
  signUpValue: any;
  formValues: any;
  isEmailSent: boolean;
  isCodeVerified: boolean;
  setIsCodeVerified: any;
  setIsEmailSent: any;
}) => {
  const navigation = useNavigation<NavigationProps>();

  const [isAgreed, setIsAgreed] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [agreementTitles] = useState([
    "이용약관 동의",
    "개인정보 수집 동의 및 이용 동의",
    "광고성 정보 수신 동의",
  ]);

  const [alertText] = useState(["[필수]", "[선택]", "[선택]"]);
  const [alertColor] = useState(["red", "#eeeeee", "#eeeeee"]);

  const mutation = useMutation({
    mutationFn: (signUpValue) => signup(signUpValue),
    onSuccess: (data) => {
      Alert.alert("회원가입", data.data, [
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("Unlogin");
          },
        },
      ]);
    },
    onError: (error) => {
      Alert.alert("에러 발생", error.message, [{ text: "확인" }]);
    },
  });

  const findPW = () => {
    navigation.navigate("findPW");
    formValues({
      email: "",
      password: "",
      userName: "",
      phone: "",
    });
    const newState = [false, false, false, false];
    setIsAgreed(newState);
  };

  /** 모두 동의하기 */
  const handleAllAgreePress = () => {
    const newState = [true, true, true, true];
    setIsAgreed(newState);
  };

  /** 이용약관 동의 boolean 값 배치 */
  const handleIndividualPress = (index: number) => {
    const newState = [...isAgreed];
    newState[index] = !newState[index]; // 해당 항목의 상태를 토글
    setIsAgreed(newState);

    // 모두 동의하기 버튼 상태 업데이트
    if (newState.slice(0, 3).every((item) => item)) {
      newState[3] = true; // 모두 동의 체크
    } else {
      newState[3] = false; // 모두 동의 체크 해제
    }

    setIsAgreed(newState);
  };

  /** 회원가입 TermConditionContainer */
  const handleSignUp = () => {
    if (isAgreed[0] === false) {
      Alert.alert("약관 동의", "이용약관 동의를 해주세요.", [{ text: "확인" }]);
      return null;
    } else if (isEmailSent === false) {
      Alert.alert("회원가입 실패", "이메일 인증을 해주세요.", [
        { text: "확인" },
      ]);
    } else if (isCodeVerified === false) {
      Alert.alert("인증 실패", "인증 코드가 일치하지 않습니다.", [
        { text: "확인" },
      ]);
    } else {
      // 유효성 검사 or 서버에 유저 가입 데이터 보내서 데이터 확인하기 있으면 재가입 없으면 바로 가입 진행
      mutation.mutate(signUpValue);
      setIsEmailSent(false);
      setIsCodeVerified(false);
      formValues({
        email: "",
        password: "",
        userName: "",
        phone: "",
      });
    }
  };

  return (
    <View style={styles.termContainer}>
      <TermCondition isPressed={isAgreed[3]} onPress={handleAllAgreePress}>
        모두 동의하기
      </TermCondition>

      {agreementTitles.map((agreementTitles, index) => {
        return (
          <TermCondition
            key={index}
            isPressed={isAgreed[index]}
            onPress={() => handleIndividualPress(index)}
            textColor={alertColor[index]}
            children={agreementTitles}
            alert={alertText[index]}
          ></TermCondition>
        );
      })}
      <View style={{ width: "100%", alignItems: "center", paddingTop: 16 }}>
        <Button
          buttonContainerStyle={styles.button}
          color={GlobalTheme.colors.primary300}
          onPress={handleSignUp}
        >
          회원가입
        </Button>
      </View>
      <Atag style={styles.atag} onPress={findPW}>
        비밀번호를 잊어버리셨나요?
      </Atag>
    </View>
  );
};

export default TermConditionContainer;
