import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabListType } from "../../../constants/models";
import { styles } from "./TabListStyle";

const TabList: React.FC<TabListType> = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#dddddd" }}
        style={styles.textContainer}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
        <Ionicons name="chevron-forward-outline" style={styles.icon} />
      </Pressable>
    </View>
  );
};

export default TabList;
