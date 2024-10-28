import React from "react";
import { Pressable, Text, View } from "react-native";
import { GlobalTheme } from "../../../constants/theme";
import { logoutNdelete } from "../../../constants/models";
import { style } from "./DeleteNLogoutStyle";

const DeleteNLogout: React.FC<logoutNdelete> = ({
  onPress,
  children,
  styles,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: GlobalTheme.colors.primary300 }}
      style={style.container}
    >
      <View>
        <Text style={styles}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default DeleteNLogout;
