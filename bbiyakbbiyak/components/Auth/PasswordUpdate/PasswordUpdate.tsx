import React, { useState } from "react";
import { Alert, View } from "react-native";
import Header from "../../UI/Header/Header";
import CustomInput from "../../UI/Input/CustomInput";
import Button from "../../UI/Button/Button";
import { GlobalTheme } from "../../../constants/theme";
import { Valuetype, valueType } from "../../../constants/models";
import { RootStackParamList } from "../../../navigation/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PasswordUpdateStyle";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const PasswordUpdate = () => {
  const [updatePassword, setUpdatePassword] = useState({
    password: "",
    rePassword: "",
  });

  const navigation = useNavigation<NavigationProps>();

  function Updated() {
    Alert.alert("비밀번호 변경", "비밀번호 변경이 완료 되었습니다.", [
      {
        text: "확인",
        onPress: () => {
          navigation.navigate("Unlogin");
        },
      },
    ]);
  }

  function setValueState(inputType: Valuetype, value: string | any) {
    setUpdatePassword((prev) => ({ ...prev, [inputType]: value }));
  }
  return (
    <View style={styles.container}>
      <View style={styles.changePWcontainer}>
        <View style={styles.headerContainer}>
          <Header title="비밀번호변경" />
        </View>
        <View style={styles.PwSearch}>
          <CustomInput
            style={styles.inputStyle}
            placeholder="비밀번호"
            inputValue={setValueState}
            inputType={updatePassword.password}
            value={updatePassword.password}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.password, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
          <CustomInput
            style={styles.inputStyle}
            placeholder="비밀번호확인"
            inputValue={setValueState}
            inputType={valueType.rePassword}
            value={updatePassword.rePassword}
            onChangeText={(text: any) => {
              if (setValueState) {
                setValueState(valueType.rePassword, text); // inputType을 사용하여 직접 전달
              }
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={Updated}
            buttonContainerStyle={styles.buttonStyle}
            color={GlobalTheme.colors.primary300}
          >
            비밀번호 변경
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PasswordUpdate;
