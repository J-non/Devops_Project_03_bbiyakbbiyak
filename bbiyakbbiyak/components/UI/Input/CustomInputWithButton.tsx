import React from "react";
import { View, TextInput, Text, Alert } from "react-native";
import Button from "../Button/Button";
import { styles } from "./CustomInputWithButtonStyle";
import { GlobalTheme } from "../../../constants/theme";

const CustomInputWithButton = (props: any) => {
  const { placeholder, onButtonPress, onChangeText, value, children } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
      {/* <Button
        buttonContainerStyle={styles.button}
        onPress={onButtonPress}
        color={GlobalTheme.colors.primary300}
      >
        <Text style={{ fontSize: 14, fontFamily: "pretendard" }}>
          {children}
        </Text>
      </Button> */}
    </View>
  );
};

export default CustomInputWithButton;
