import { User } from "@react-native-google-signin/google-signin";

export enum AccountTypeEnum {
  SAVINGS = "SAVINGS",
  CHECKING = "CHECKING",
}

export enum TransactionTypeEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
}

export enum TransactionStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface IAccount {
  id: string;
  type: AccountTypeEnum;
  number: string;
  balance: number;
  isActive: boolean;
  currency: string;
  createdAt: string;
}

export interface ITransaction {
  id: string;
  type: TransactionTypeEnum;
  amount: number;
  currency: string;
  createdAt: string;
  status: TransactionStatusEnum;
  fromAccountId: string;
  toAccountId: string;
  description?: string;
}

export interface IUser extends User {}
