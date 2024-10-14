import React from "react";
import { Pressable, StyleProp, Text, TextStyle, View } from "react-native";
import { styles } from "./ButtonStyle";
import { GlobalTheme } from "../../../constants/theme";

const Button = ({
  children,
  buttonContainerStyle,
  onPress,
  color,
  disabled,
}: {
  children: React.ReactNode;
  buttonContainerStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
}) => {
  return (
    <View style={buttonContainerStyle}>
      <Pressable
        disabled={disabled}
        style={styles.preesed}
        android_ripple={{ color: color }}
        onPress={onPress}
      >
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
