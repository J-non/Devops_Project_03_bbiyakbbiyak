import AsyncStorage from "@react-native-async-storage/async-storage";

export const logDateFn = async () => {
  try {
    const loggedDate = await AsyncStorage.getItem('@loggedDate')
    const date = new Date().toISOString().split('T')[0];
    if (loggedDate === null) {
      await AsyncStorage.setItem('@loggedDate', date);
    } else if (loggedDate === date) {
      await AsyncStorage.setItem('@loggedDate', date);
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
  }
}