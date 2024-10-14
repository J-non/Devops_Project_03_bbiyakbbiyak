import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const TodayAlarmEmptyStyles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14
  },
  descriptionContainer: {
    flex: 42
  },
  iconCalendarAddContainer: {
    flex: 11,
  },
  iconCalenderAddPressble: {
    width: 70,
    height: 70,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalTheme.colors.primary300
  },
  descriptionText: {
    fontFamily: 'pretendard',
    color: '#999'
  },
  addAlarmText: {
    fontFamily: 'pretendard',
    color: GlobalTheme.colors.accent500
  }
});