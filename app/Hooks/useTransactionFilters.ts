import { useState, useCallback, useEffect } from "react";
import { ITransaction, TransactionTypeEnum } from "@/Types";
import { TransactionUtils } from "@/Utils";

const useTransactionFilters = (
  allTransactions: ITransaction[],
  accountNumber?: string,
) => {
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionTypeEnum | null>(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);

  useEffect(() => {
    if (!accountNumber || !allTransactions.length) {
      setFilteredTransactions([]);
      return;
    }

    const filtered = TransactionUtils.filterTransactions(
      allTransactions,
      accountNumber,
      dateRange,
      transactionType,
      transactionAmount,
      searchTerm,
    );

    setFilteredTransactions(filtered);
  }, [
    dateRange,
    transactionType,
    transactionAmount,
    searchTerm,
    accountNumber,
    allTransactions,
  ]);

  const clearFilters = useCallback(() => {
    setDateRange(null);
    setTransactionType(null);
    setTransactionAmount("");
  }, []);

  return {
    filters: {
      dateRange,
      transactionType,
      transactionAmount,
      searchTerm,
    },
    setters: {
      setDateRange,
      setTransactionType,
      setTransactionAmount,
      setSearchTerm,
    },
    filteredTransactions,
    clearFilters,
  };
};

export default useTransactionFilters;
