import { StyleSheet } from "react-native";

export const TodayAlarmContainerStyles = StyleSheet.create({
  container: {
    minHeight: 210,
    marginTop: 14,
    marginHorizontal: 20,
    paddingTop: 6,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 10,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  footer: {
    height: 32,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  }
});