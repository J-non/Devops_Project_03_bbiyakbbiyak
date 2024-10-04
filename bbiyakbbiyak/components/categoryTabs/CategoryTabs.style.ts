import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/theme";

const CategoryTabsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 14,
    paddingHorizontal: 14,
  },
  buttonContainer: {
    width: '28%',
    height: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
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
  }
});

export default CategoryTabsStyles