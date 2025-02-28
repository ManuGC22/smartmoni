import ServiceAPI from "./ServiceAPI";
import AccountAPI from "./AccountAPI";
import { ITransaction, IAccount, TransactionStatusEnum } from "@/Types";
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
      .map(TransactionModel)
      .sort(
        (a: ITransaction, b: ITransaction) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    return filteredTransactions;
  },

  create: async (
    transactionData: Omit<ITransaction, "id">,
  ): Promise<ITransaction> => {
    const response = await ServiceAPI.post("/transactions", transactionData);

    return TransactionModel(response.data);
  },
  transfer: async ({
    sourceAccount,
    destinationAccount,
    amount,
    description = "Transferencia entre cuentas",
  }: {
    sourceAccount: IAccount;
    destinationAccount: IAccount;
    amount: number;
    description?: string;
  }): Promise<ITransaction> => {
    if (!sourceAccount || !destinationAccount) {
      throw new Error("Source and destination accounts are required");
    }

    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    if (sourceAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    try {
      await delay(1500);

      const transactionData: Omit<ITransaction, "id"> = {
        amount,
        currency: sourceAccount.currency,
        createdAt: new Date().toISOString(),
        status: TransactionStatusEnum.COMPLETED,
        fromAccountNumber: sourceAccount.number,
        toAccountNumber: destinationAccount.number,
        description,
      };

      const transaction = await TransactionAPI.create(transactionData);

      await AccountAPI.update(sourceAccount.id, {
        balance: sourceAccount.balance - amount,
      });

      await AccountAPI.update(destinationAccount.id, {
        balance: destinationAccount.balance + amount,
      });

      return transaction;
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    }
  },
};

export default TransactionAPI;
