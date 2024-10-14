import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const CustomInput: React.FC<any> = (props: any) => {
  const { children, style, ...restProps } = props;
  return (
    <View style={[styles.container, style]}>
      <TextInput {...restProps} style={styles.input} />
      {children && <View style={styles.test}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eeeeee",
    flexDirection: "row",
  },
  input: {
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
  },
  test: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
  },
});

export default CustomInput;
