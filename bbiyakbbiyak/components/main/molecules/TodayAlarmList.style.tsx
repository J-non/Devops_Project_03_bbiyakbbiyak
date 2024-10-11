import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const TodayAlarmListStyles = StyleSheet.create({
  rootContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    flexDirection: 'row',
  },
  allSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconClock: {
    paddingRight: 4,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'pretendard',
  },
  iconDotContainer: {
    paddingHorizontal: 20,
  },
  detailFlatListContainer: {
    flex: 30
  },
  dividerContainer: {
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  divider: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: GlobalTheme.colors.primary700,
    flexDirection: 'row',
  }
});