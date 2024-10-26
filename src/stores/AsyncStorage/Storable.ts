import { MMKV } from 'react-native-mmkv';

export class Storable {
  storage: MMKV = new MMKV();

  constructor() {
    this.getStorage = this.getStorage.bind(this);
    this.setStorage = this.setStorage.bind(this);
  }

  getStorage(key: string) {
    try {
      const data = this.storage.getString(key);
      return data && JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  setStorage(key: string, value: any) {
    try {
      if (value !== null && value !== undefined) {
        return this.storage.set(key, JSON.stringify(value));
      } else {
        return this.storage.set(key, '');
      }
    } catch (e) {
      return;
    }
  }

  removeKey(key: string) {
    try {
      this.storage.delete(key);
    } catch (e) {}
  }
}
