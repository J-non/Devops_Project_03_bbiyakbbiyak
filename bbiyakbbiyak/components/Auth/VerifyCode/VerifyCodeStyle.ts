import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalTheme.colors.primary500,
    width: 160,
    height: 45,
    marginTop: 4,
    borderRadius: 8,
  },
  alert: {
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 4,
    marginTop: 4,
  },
});
