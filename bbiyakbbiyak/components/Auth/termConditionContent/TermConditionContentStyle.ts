import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonView: {
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 8,
    overflow: "hidden",
    margin: 6,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 14,
    paddingBottom: 4,
  },
});

export default styles;
