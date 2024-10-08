import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  textInput: {
    width: "80%",
    height: 45,
    borderRadius: 6,
    marginVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#eeeeee",
    fontFamily: "pretendard",
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "pretendard-bold",
  },

  inputContainer: {
    flex: 1,
    width: "90%",
    minWidth: 300,
    minHeight: 300,
    // justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateY: 50 }, { translateX: 20 }],
    zIndex: 2,
  },
  alert: {
    paddingLeft: 40,
    alignSelf: "flex-start",
    color: "red",
  },
});
