import AsyncStorage from "@react-native-async-storage/async-storage";
export const TOKEN = "token";

export async function getTokenApi() {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    return token;
  } catch (e) {
    return null;
  }
}

export async function setTokenApi(token) {
  try {
    await AsyncStorage.setItem(TOKEN, token);
    return true;
  } catch (e) {
    return null;
  }
}

export async function removeTokenApi() {
  try {
    await AsyncStorage.removeItem(TOKEN);
    return true;
  } catch (e) {
    return null;
  }
}
