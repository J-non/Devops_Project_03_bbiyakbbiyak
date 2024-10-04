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
    paddingTop: 20,
    paddingBottom: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
  },
  footer: {
    height: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
});