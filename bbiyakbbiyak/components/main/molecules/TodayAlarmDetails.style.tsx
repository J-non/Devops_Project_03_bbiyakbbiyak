import { StyleSheet } from "react-native";

export const TodayAlarmDetailsStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#999',
    height: 32,
    marginBottom: 10,
    overflow: 'hidden'
  },
  flex1: {
    flex: 1
  },
  innerContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
  iconPill: {
    flex: 1,
    paddingLeft: 10
  },
  flex4: {
    flex: 4
  },
});