import React, { useState } from "react";
import { View } from "react-native";
import Header from "../UI/Header/Header";
import { styles } from "./FindMyIdStyle";
import CustomInput from "../UI/Input/CustomInput";
import Button from "../UI/Button/Button";
import { GlobalTheme } from "../../constants/theme";
import { Valuetype, valueType } from "../../constants/models";

const FindMyId = () => {
  const [findID, setFindID] = useState({
    id: "",
  });

  function setValueState(inputType: Valuetype, value: string | any) {
    setFindID((prev) => ({ ...prev, [inputType]: value }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="아이디 찾기" />
      </View>
      <View style={styles.IdSearch}>
        <CustomInput
          style={styles.inputStyle}
          placeholder="ABCDE@gmail.com"
          inputValue={setValueState}
          inputType={valueType.password}
          value={findID.id}
          onChangeText={(text: any) => {
            if (setValueState) {
              setValueState(valueType.id, text); // inputType을 사용하여 직접 전달
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
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
