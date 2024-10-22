import React from "react";
import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";

const Atag = ({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}) => {
  return (
    <>
      <TouchableOpacity activeOpacity={0.8}>
        <Text style={style} onPress={onPress}>
          {children}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Atag;
