import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/userAtom";
import { Navigation } from "../../../navigation/Navigation";

export function AuthCheck() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const [authCtx, setAuthCtx] = useAtom(userAtom);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("@user");
      // await AsyncStorage.removeItem("@user");
      // await AsyncStorage.removeItem("token");
      console.log(storedToken, storedUser, 111);
      if (storedToken) {
        setAuthCtx((prevState) => ({
          ...prevState,
          token: storedToken,
          isAuthenticated: true,
          logout: async () => {
            await AsyncStorage.removeItem("@user");
            await AsyncStorage.removeItem("token");
          },
        }));
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return null;
  }

  return <Navigation />;
}
