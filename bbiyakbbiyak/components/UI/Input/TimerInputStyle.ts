import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 45,
    borderRadius: 8,
    backgroundColor: "#eeeeee",
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
  },
  inputContainer: {
    width: "60%",
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  timer: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
  timerContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 45,
    overflow: "hidden",
    fontFamily: "pretendard",
    fontSize: 10,
    borderRadius: 8,
    backgroundColor: GlobalTheme.colors.primary500,
  },
  checkmark: {
    fontSize: 30,
    color: "green",
  },
});
