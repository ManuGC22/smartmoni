import { ITransaction, TransactionTypeEnum } from "@/Types";

/**
 * Filter transactions based on various criteria
 *
 * @param transactions The full list of transactions to filter
 * @param currentAccountNumber The account number of the current account being viewed
 * @param dateRange Optional period in days to filter transactions (7, 30, 90)
 * @param transactionType Optional type of transactions to show (deposit/withdrawal)
 * @param minAmount Optional minimum amount transactions should have
 * @param searchTerm Optional search term to filter by account number
 * @returns Filtered transactions array
 */
export const filterTransactions = (
  transactions: ITransaction[],
  currentAccountNumber: string | undefined,
  dateRange: string | null,
  transactionType: TransactionTypeEnum | null,
  minAmount: string,
  searchTerm: string,
): ITransaction[] => {
  if (!transactions.length || !currentAccountNumber) return [];

  let result = [...transactions];

  // Filter by date range
  if (dateRange) {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - parseInt(dateRange));

    result = result.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= pastDate && transactionDate <= now;
    });
  }

  // Filter by transaction type (deposit or withdrawal)
  if (transactionType) {
    if (transactionType === TransactionTypeEnum.DEPOSIT) {
      result = result.filter(
        (transaction) => transaction.toAccountNumber === currentAccountNumber,
      );
    } else if (transactionType === TransactionTypeEnum.WITHDRAWAL) {
      result = result.filter(
        (transaction) => transaction.fromAccountNumber === currentAccountNumber,
      );
    }
  }

  // Filter by minimum amount
  if (minAmount && !isNaN(parseFloat(minAmount))) {
    const minAmountValue = parseFloat(minAmount);
    result = result.filter(
      (transaction) => transaction.amount >= minAmountValue,
    );
  }

  // Filter by search term (account number)
  if (searchTerm) {
    result = result.filter(
      (transaction) =>
        transaction.fromAccountNumber.includes(searchTerm) ||
        transaction.toAccountNumber.includes(searchTerm),
    );
  }

  return result;
};
