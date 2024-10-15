import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./MainStyle";
import TabList from "./TabList/TabList";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../constants/models";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = StackNavigationProp<RootStackParamList>;

const OtherMenuMain = () => {
  const navigation = useNavigation<NavigationProps>();

  const updateInfo = () => {
    navigation.navigate("MyPage");
  };

  return (
    <>
      <View style={styles.container}>
        <TabList onPress={updateInfo}>정보 변경</TabList>
        {/* <TabList>정보 변경</TabList>
        <TabList>정보 변경</TabList>
        <TabList>정보 변경</TabList> */}
      </View>
    </>
  );
};

export default OtherMenuMain;
