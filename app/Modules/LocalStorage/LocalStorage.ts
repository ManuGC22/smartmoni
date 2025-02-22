import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const LocalStorage = {
  save: async (key: string, value: string) => {
    return storage.set(key, value);
  },
  saveData: async (key: string, value: Record<string, any>) => {
    return LocalStorage.save(key, JSON.stringify(value));
  },
  get: async (key: string) => {
    return storage.getString(key);
  },
  getSync: (key: string) => {
    return storage.getString(key);
  },
  getData: async <T>(key: string) => {
    const item = await LocalStorage.get(key);
    if (!item) {
      return null;
    }

    const data = JSON.parse(item) as T;
    return data;
  },
  getDataSync: <T>(key: string) => {
    const item = storage.getString(key);
    if (!item) {
      return null;
    }

    const data = JSON.parse(item) as T;
    return data;
  },
  remove: async (key: string) => {
    return storage.delete(key);
  },
  getAllKeys: () => {
    return storage.getAllKeys();
  },
};

export default LocalStorage;
