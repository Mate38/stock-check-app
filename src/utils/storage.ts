import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    // console.error('Error saving token', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    // console.error('Error fetching token', error);
    return null;
  }
};
