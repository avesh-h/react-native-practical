import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setNewAddress(key: string, value: any) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const address: any[] = JSON.parse(data);
      address.push(value);
      await setStorage(key, address);
      return { success: true, message: "SuccessFully saved the address" };
    }
    await setStorage(key, [value]);
    return { success: true, message: "SuccessFully saved the address" };
  } catch (err: any) {
    return { success: false };
  }
}

export async function getAllAddress(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const addressList: any[] = JSON.parse(data);
      return addressList;
    } else return [];
  } catch (err: any) {
    return [];
  }
}

const setStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log("Stored Data:", result);
  } catch (error) {
    console.log("Error fetching AsyncStorage data:", error);
  }
};
// getAllData();
// AsyncStorage.clear();
