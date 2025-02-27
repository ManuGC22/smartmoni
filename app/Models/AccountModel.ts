import { IAccount } from "@/Types";

const AccountModel = (data: IAccount): IAccount => {
  return {
    id: data.id,
    type: data.type,
    number: data.number,
    balance: data.balance,
    isActive: data.isActive,
    currency: data.currency,
    createdAt: data.createdAt,
  };
};

export default AccountModel;
