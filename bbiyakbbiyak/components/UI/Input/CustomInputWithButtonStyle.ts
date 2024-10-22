import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    // marginBottom: 2,
  },
  textInput: {
    flex: 1,
    height: 45,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: "#eeeeee",
    fontFamily: "pretendard",
  },
  button: {
    width: 85,
    height: 45,
    overflow: "hidden",
    fontFamily: "pretendard",
    fontSize: 10,
    borderRadius: 8,
    backgroundColor: GlobalTheme.colors.primary500,
  },
});
