import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    marginBottom: 2,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
  },
  text: {
    fontSize: 18,
    fontFamily: "pretendard",
  },
  icon: {
    fontSize: 20,
    color: "#aaaaaa",
  },
});
