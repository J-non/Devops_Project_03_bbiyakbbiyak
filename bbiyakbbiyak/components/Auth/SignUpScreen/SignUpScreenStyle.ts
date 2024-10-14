import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    flexGrow: 1,
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "pretendard-bold",
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    minWidth: 300,
    minHeight: 300,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateY: 50 }, { translateX: 20 }],
    zIndex: 2,
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
});
