import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

const Alert = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <>
      <Text style={style}>{children}</Text>
    </>
  );
};

export default Alert;
