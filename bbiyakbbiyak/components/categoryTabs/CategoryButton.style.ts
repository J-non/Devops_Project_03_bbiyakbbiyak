import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/theme";

export const CategoryButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: '28%',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: "hidden"
  },
  button: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: GlobalTheme.colors.primary500,
  },
  // buttonPressed: {
  //   backgroundColor: '#999',
  //   opacity: 0.75
  // },
  buttonText: {
    fontFamily: 'pretendard',
    fontSize: 16
  }
});