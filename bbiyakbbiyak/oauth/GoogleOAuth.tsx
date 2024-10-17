import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { userAtom } from "../store/userAtom";
import { useMutation } from "@tanstack/react-query";
import { jwtToken, signupGoogle } from "../api";

WebBrowser.maybeCompleteAuthSession();

export const GoogleOAuth = () => {
  const [googleUserInfo, setGoogleUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const mutation = useMutation({
    mutationFn: (data) => signupGoogle(data),
  });

  const jwtMutation = useMutation({
    mutationFn: (data) => jwtToken(data),
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "811679640084-jbua3dv3unusfvs3517gmp45eh89i9q7.apps.googleusercontent.com",
    androidClientId:
      "811679640084-11qhfn2nce1tehqmsofhafjs37hf7t28.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success" && !loading) {
      handleSignInWithGoogle();
    }
  }, [response]);

  const handleSignInWithGoogle = async () => {
    if (loading) return;
    const user = await AsyncStorage.getItem("@user");

    if (user) {
      setGoogleUserInfo(JSON.parse(user));
      return;
    }
    setLoading(true);

    if (response?.type === "success") {
      await getUserInfo(response.authentication?.accessToken);
    }
    setLoading(false);
  };

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 서버에 구글 유저 정보 보내서 저장하기~~~
      const userInfoResponse = await response.json();
      const result = await mutation.mutateAsync(userInfoResponse);
      setGoogleUserInfo(result);

      if (result.isOAuthUser === true) {
        if (result.isAlreadyUser === false) {
          console.log("회원가입 됨");
          const jwtToken = await jwtMutation.mutateAsync(result);
          await AsyncStorage.setItem("@token", jwtToken);
          setUser((prev) => ({
            ...prev,
            token: jwtToken,
            isAuthenticated: true,
            authenticate: (token: string) => {
              setUser((prev) => ({
                ...prev,
                token,
                isAuthenticated: true,
              }));
            },
          }));
          Alert.alert("회원가입", "회원가입 되셨습니다.", [{ text: "확인" }]);
        } else if (result.isAlreadyUser === true) {
          console.log("로그인 됨");
          const jwtToken = await jwtMutation.mutateAsync(result);
          await AsyncStorage.setItem("@token", jwtToken);
          setUser((prev) => ({
            ...prev,
            token: jwtToken,
            isAuthenticated: true,
            authenticate: (token: string) => {
              setUser((prev) => ({
                ...prev,
                token,
                isAuthenticated: true,
              }));
            },
          }));
        }
      } else if (result.isOAuthUser === false) {
        Alert.alert("로그인 실패", "개인 회원으로 가입한 회원입니다.", [
          { text: "확인" },
        ]);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogoutWithGoogle = async () => {
    await AsyncStorage.removeItem("@user");
    setGoogleUserInfo(null);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.image}
        activeOpacity={0.6}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          resizeMode={"contain"}
          source={require("../assets/images/smallGoogle.png")}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginTop: 2,
  },
});
