import { Dimensions, Keyboard, StyleSheet } from "react-native";
import { GlobalTheme } from "../../constants/theme";
import { useEffect, useState } from "react";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    minWidth: 300,
    minHeight: 400,
    position: "absolute",
    top: 0,
    left: 0,
    transform: [{ translateY: 115 }, { translateX: 0 }],
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
  headerContianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: "pretendard-bold",
  },
  headerText: {
    fontSize: 14,
    fontFamily: "pretendard",
    color: "#666",
  },
  buttonStyle: {
    overflow: "hidden",
    width: "80%",
    height: 45,
    borderRadius: 24,
    backgroundColor: GlobalTheme.colors.primary500,
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    width: "80%",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginTop: 2,
  },
});
