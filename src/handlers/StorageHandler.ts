import * as SecureStore from 'expo-secure-store';

export class StorageHandler {
  public async saveValue(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getValue(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
