import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  termContainer: {
    width: "90%",
    minWidth: 300,
    minHeight: 300,
    zIndex: 2,
    paddingHorizontal: 16,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateY: 300 }, { translateX: 20 }],
  },
  button: {
    overflow: "hidden",
    width: "90%",
    height: 45,
    borderRadius: 24,
    backgroundColor: GlobalTheme.colors.primary500,
    marginTop: 10,
    fontFamily: "pretendard-bold",
  },
  atag: {
    paddingVertical: 16,
    color: GlobalTheme.colors.accent500,
    fontFamily: "pretendard-bold",
  },
});
