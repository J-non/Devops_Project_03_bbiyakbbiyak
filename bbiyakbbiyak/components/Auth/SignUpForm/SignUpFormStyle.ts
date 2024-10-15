import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  alert: {
    paddingLeft: 40,
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 4,
  },
  textInput: {
    width: "90%",
    height: 45,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#eeeeee",
    fontFamily: "pretendard",
  },
  textInputt: {
    width: "80%",
    height: 45,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 10,
    marginRight: 40,
    backgroundColor: "#eeeeee",
    fontFamily: "pretendard",
  },
  phoneButton: {
    marginRight: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 45,
    backgroundColor: GlobalTheme.colors.primary500,
  },
  test: {
    backgroundColor: GlobalTheme.colors.primary500,
    width: 160,
    height: 45,
    marginTop: 4,
    borderRadius: 8,
  },
});
