import React from "react";
import { View, Text } from "react-native";
import { styles } from "./HeaderStyle";

const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default Header;
