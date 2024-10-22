import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const style = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 4,
    width: "20%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: GlobalTheme.colors.accent500,
  },
});
