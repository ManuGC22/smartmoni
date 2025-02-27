import ServiceAPI from "./ServiceAPI";
import { ITransaction } from "@/Types";
import { TransactionModel } from "@/Models";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const DELAY_TIME = 500;

const TransactionAPI = {
  getAllByAccountNumber: async (
    accountNumber: string,
  ): Promise<ITransaction[]> => {
    await delay(DELAY_TIME);
    const response = await ServiceAPI.get("/transactions");
    const rawTransactions = response.data || [];
    const filteredTransactions = rawTransactions
      .filter(
        (trx: ITransaction) =>
          trx.fromAccountNumber === accountNumber ||
          trx.toAccountNumber === accountNumber,
      )
      .map(TransactionModel);

    return filteredTransactions;
  },

  create: async (
    transactionData: Omit<ITransaction, "id">,
  ): Promise<ITransaction> => {
    const response = await ServiceAPI.post("/transactions", transactionData);

    return TransactionModel(response.data);
  },
};

export default TransactionAPI;
