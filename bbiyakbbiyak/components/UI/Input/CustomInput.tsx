import React from "react";
import { styles } from "./Input";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { valueType, Valuetype } from "../../../constants/models";

const CustomInput: React.FC<any> = (props: {}) => {
  return (
    <>
      <TextInput {...props} />
    </>
  );
};

export default CustomInput;

// style={style}
// placeholder={placeholder}
// value={value}
// typ
// onChangeText={(text) => {
//   if (inputValue) {
//     inputValue(inputType, text); // inputType을 사용하여 직접 전달
//   }
// }}
