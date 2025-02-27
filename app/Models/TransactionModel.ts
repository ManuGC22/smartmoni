// models/TransactionModel.ts
import { ITransaction } from "@/Types";

const TransactionModel = (data: ITransaction): ITransaction => {
  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
    createdAt: data.createdAt,
    status: data.status,
    fromAccountNumber: data.fromAccountNumber,
    toAccountNumber: data.toAccountNumber,
    description: data.description,
  };
};

export default TransactionModel;
