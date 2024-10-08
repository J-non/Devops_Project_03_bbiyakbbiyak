import React from "react";
import { View } from "react-native";
import { styles } from "./FindMyPwStyle";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/Navigation";
import { valueType } from "../../../constants/models";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const FindMyPw = () => {
  const navigation = useNavigation<NavigationProps>();

  function findPW() {
    navigation.navigate("changePW");
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="비밀번호찾기" />
      </View>
      <View style={styles.PwSearch}>
        <CustomInput
          style={styles.inputStyle}
          placeholder="이메일"
          inputType={valueType.id}
        />
        <CustomInput
          style={styles.inputStyle}
          placeholder="닉네임"
          inputType={valueType.id} // 임시방편으로 뭐 넣을지 몰라서 일단 넣어놓음 후에 변경해야 됨
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={findPW}
          buttonContainerStyle={styles.buttonStyle}
          color={GlobalTheme.colors.primary300}
        >
          비밀번호 찾기
        </Button>
      </View>
    </View>
  );
};

export default FindMyPw;
