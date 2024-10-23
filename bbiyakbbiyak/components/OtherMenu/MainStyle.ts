import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalTheme.colors.gray300,
  },
  logOutText: {
    color: "black",
  },
  deleteText: {
    color: GlobalTheme.colors.accent500,
  },
  otherGoogle: {
    backgroundColor: GlobalTheme.colors.primary500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingLeft: 8,
  },
  profileText: {
    fontSize: 32,
    fontFamily: 'pretendard-bold'
  }
});
