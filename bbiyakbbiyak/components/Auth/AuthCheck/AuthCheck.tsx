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
      const storedToken = await AsyncStorage.getItem("@token");
      if (storedToken) {
        setAuthCtx((prevState) => ({
          ...prevState,
          token: storedToken,
          isAuthenticated: true,
          logout: async () => {
            await AsyncStorage.removeItem("@token");
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
