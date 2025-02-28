import { filterTransactions } from "@/Utils/TransactionUtils";
import {
  ITransaction,
  TransactionTypeEnum,
  TransactionStatusEnum,
} from "@/Types";

describe("filterTransactions", () => {
  const mockTransactions: ITransaction[] = [
    {
      id: "t1",
      amount: 500,
      currency: "USD",
      createdAt: new Date().toISOString(),
      status: TransactionStatusEnum.COMPLETED,
      fromAccountNumber: "1234",
      toAccountNumber: "9999",
      description: "Salary Deposit",
    },
    {
      id: "t2",
      amount: 100,
      currency: "USD",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: TransactionStatusEnum.COMPLETED,
      fromAccountNumber: "9999",
      toAccountNumber: "1234",
      description: "Groceries",
    },
    {
      id: "t3",
      amount: 2000,
      currency: "USD",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: TransactionStatusEnum.COMPLETED,
      fromAccountNumber: "1234",
      toAccountNumber: "1111",
      description: "Big Purchase",
    },
    {
      id: "t4",
      amount: 50,
      currency: "USD",
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      status: TransactionStatusEnum.COMPLETED,
      fromAccountNumber: "0000",
      toAccountNumber: "1234",
      description: "Refund",
    },
  ];

  const currentAccountNumber = "1234";

  test("returns empty array if there are no transactions", () => {
    const result = filterTransactions(
      [],
      currentAccountNumber,
      null,
      null,
      "",
      "",
    );
    expect(result).toEqual([]);
  });

  test("returns empty array if currentAccountNumber is undefined", () => {
    const result = filterTransactions(
      mockTransactions,
      undefined,
      null,
      null,
      "",
      "",
    );
    expect(result).toEqual([]);
  });

  test("filters by dateRange (e.g. last 7 days)", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      "7",
      null,
      "",
      "",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t1");
    expect(ids).toContain("t2");
    expect(ids).not.toContain("t3");
    expect(ids).not.toContain("t4");
  });

  test("filters by dateRange (e.g. last 30 days)", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      "30",
      null,
      "",
      "",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t1");
    expect(ids).toContain("t2");
    expect(ids).toContain("t3");
    expect(ids).not.toContain("t4");
  });

  test("filters by transactionType = DEPOSIT (where toAccountNumber === currentAccountNumber)", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      null,
      TransactionTypeEnum.DEPOSIT,
      "",
      "",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t2");
    expect(ids).toContain("t4");
    expect(ids).not.toContain("t1");
    expect(ids).not.toContain("t3");
  });

  test("filters by transactionType = WITHDRAWAL (where fromAccountNumber === currentAccountNumber)", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      null,
      TransactionTypeEnum.WITHDRAWAL,
      "",
      "",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t1");
    expect(ids).toContain("t3");
    expect(ids).not.toContain("t2");
    expect(ids).not.toContain("t4");
  });

  test("filters by minAmount", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      null,
      null,
      "500",
      "",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t1");
    expect(ids).toContain("t3");
    expect(ids).not.toContain("t2");
    expect(ids).not.toContain("t4");
  });

  test("filters by searchTerm (account number) en fromAccountNumber o toAccountNumber", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      null,
      null,
      "",
      "9999",
    );
    const ids = result.map((tx) => tx.id);
    expect(ids).toContain("t1");
    expect(ids).toContain("t2");
    expect(ids).not.toContain("t3");
    expect(ids).not.toContain("t4");
  });

  test("combines multiple filters: dateRange + transactionType + minAmount", () => {
    const result = filterTransactions(
      mockTransactions,
      currentAccountNumber,
      "30",
      TransactionTypeEnum.DEPOSIT,
      "300",
      "",
    );
    expect(result).toEqual([]);
  });
});
