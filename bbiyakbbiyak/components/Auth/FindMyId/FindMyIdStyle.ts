import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    minWidth: 100,
    minHeight: 100,
    marginVertical: 16,
  },
  IdSearch: {
    alignItems: "center",
    gap: 100,
  },
  inputStyle: {
    width: "80%",
    height: 45,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#eeeeee",
    fontFamily: "pretendard",
  },
  buttonContainer: {
    width: "100%",
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    overflow: "hidden",
    width: "80%",
    height: 45,
    borderRadius: 24,
    backgroundColor: GlobalTheme.colors.primary500,
    marginTop: 10,
  },
});
