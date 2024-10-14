import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const CalendarHeaderStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingBottom: 10
  },
  leftContainer: {
    flex: 46,
    flexDirection: 'row',
    alignItems: 'center'
  },
  yearMonthTextWrap: {
    flex: 18,
    height: 40,
    paddingTop: 10
  },
  yearMonthText: {
    flex: 1,
    fontFamily: 'pretendard-bold',
    fontSize: 20,
  },
  todayButtonWrap: {
    flex: 28,
    height: 20,
  },
  todayButton: {
    width: '24%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    borderRadius: 15,
    borderColor: '#000',
    backgroundColor: GlobalTheme.colors.accent500,
  },
  // todayButtonRipple: {
  //   color: GlobalTheme.colors.accent500,
  //   opacity: 0.4
  // },
  todayText: {
    color: '#fff'
  },
  buttonContainer: {
    flex: 9,
    flexDirection: 'row'
  },
  backwardContainer: {
    flex: 1,
    paddingRight: 6
  },
  forwardContainer: {
    flex: 1
  }
});