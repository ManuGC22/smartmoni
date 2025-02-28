import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { IAccount } from "@/Types";

interface IAccountsContext {
  sourceAccount: IAccount | null;
  destinationAccount: IAccount | null;
  setSourceAccount: (account: IAccount | null) => void;
  setDestinationAccount: (account: IAccount | null) => void;
  selectingFor: "source" | "destination" | null;
  setSelectingFor: (type: "source" | "destination" | null) => void;
  amount: string;
  setAmount: (amount: string) => void;
}

const AccountsContext = createContext<IAccountsContext>({
  sourceAccount: null,
  destinationAccount: null,
  setSourceAccount: () => {},
  setDestinationAccount: () => {},
  selectingFor: null,
  setSelectingFor: () => {},
  amount: "",
  setAmount: () => {},
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [sourceAccount, setSourceAccount] = useState<IAccount | null>(null);
  const [destinationAccount, setDestinationAccount] = useState<IAccount | null>(
    null,
  );
  const [selectingFor, setSelectingFor] = useState<
    "source" | "destination" | null
  >(null);
  const [amount, setAmount] = useState<string>("");

  const value = useMemo(
    () => ({
      sourceAccount,
      destinationAccount,
      setSourceAccount,
      setDestinationAccount,
      selectingFor,
      setSelectingFor,
      amount,
      setAmount,
    }),
    [sourceAccount, destinationAccount, selectingFor, amount],
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = (): IAccountsContext => useContext(AccountsContext);
