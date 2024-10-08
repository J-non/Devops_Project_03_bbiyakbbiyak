import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./TermConditionContentStyle";
import { GlobalTheme } from "../../constants/theme";

const TermConditionContent = ({
  isPressed,
  children,
  onPress,
}: {
  isPressed?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <View style={styles.buttonView}>
      <Pressable
        onPress={onPress}
        style={styles.container}
        android_ripple={{ color: "#eeeeee" }}
      >
        {/* <View style={styles.textContainer}> */}
        <Ionicons
          name="checkmark-circle"
          style={[
            styles.icon,
            { color: isPressed ? GlobalTheme.colors.primary500 : "#eeeeee" },
          ]}
        />
        <Text style={styles.text}>{children}</Text>
        {/* </View> */}
      </Pressable>
    </View>
  );
};

export default TermConditionContent;
