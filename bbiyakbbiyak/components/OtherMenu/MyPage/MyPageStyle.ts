import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  empty: {
    marginVertical: 16,
  },
  textContainer: {
    width: "90%",
    minHeight: 200,
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#ffffff",
    marginBottom: 4,
    borderRadius: 10,
    fontFamily: "pretendard",
    paddingHorizontal: 6,
  },
  pressed: {
    borderRadius: 6,
    height: 45,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: GlobalTheme.colors.primary500,
    marginVertical: 20,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7, // 눌렸을 때 스타일 변경
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "pretendard-bold",
  },
  alert: {
    paddingLeft: 40,
    alignSelf: "flex-start",
    color: "red",
    marginBottom: 4,
  },
});
