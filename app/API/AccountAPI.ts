import ServiceAPI from "./ServiceAPI";
import { IAccount } from "@/Types";
import { AccountModel } from "@/Models";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const DELAY_TIME = 500;

const AccountAPI = {
  getAll: async (): Promise<IAccount[]> => {
    await delay(DELAY_TIME);
    const response = await ServiceAPI.get("/accounts");
    const rawAccounts = response.data || [];
    return rawAccounts.map((acc: IAccount) => AccountModel(acc));
  },

  getById: async (accountId: string): Promise<IAccount | null> => {
    await delay(DELAY_TIME);
    const response = await ServiceAPI.get(`/accounts/${accountId}`);
    if (!response.data) {
      return null;
    }
    return AccountModel(response.data);
  },
};

export default AccountAPI;
