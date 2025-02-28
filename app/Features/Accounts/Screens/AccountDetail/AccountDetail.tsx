import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { ITransaction, IAccount, AccountTypeEnum } from "@/Types";
import {
  HeaderContainer,
  InfoBlock,
  TitleBar,
  OverlayLoader,
} from "@/UI/Molecules";

import { I18nContext } from "@/Contexts";
import {
  TransactionsList,
  TransactionFilterBar,
  TransactionFiltersBottomSheet,
} from "../../Components";
import { useLocalSearchParams } from "expo-router";
import { AccountAPI, TransactionAPI } from "@/API";
import GBottomSheet from "@gorhom/bottom-sheet";
import { useTransactionFilters } from "@/Hooks";

const AccountsDetail = () => {
  const { t } = I18nContext.useLocalization();
  const { id } = useLocalSearchParams();
  const [accountData, setAccountData] = useState<IAccount | null>(null);
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomSheetRef = useRef<GBottomSheet>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { filters, setters, filteredTransactions, clearFilters } =
    useTransactionFilters(allTransactions, accountData?.number);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setLoading(true);
      setAllTransactions([]);

      try {
        const account = await AccountAPI.getById(id as string);
        if (!account) {
          return null;
        }
        const transactions = await TransactionAPI.getAllByAccountNumber(
          account.number,
        );
        setAccountData(account);
        setAllTransactions(transactions);
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [id]);

  const toggleBottomSheet = useCallback(() => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close();
      setIsBottomSheetOpen(false);
    } else {
      bottomSheetRef.current?.snapToIndex(3);
      setIsBottomSheetOpen(true);
    }
  }, [isBottomSheetOpen]);

  const accountTypeLabels = useMemo(
    () => ({
      [AccountTypeEnum.CHECKING]: t("Accounts.checkingAccount"),
      [AccountTypeEnum.SAVINGS]: t("Accounts.savingsAccount"),
    }),
    [t],
  );

  const handleCloseFilter = useCallback(() => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }, []);

  if (!accountData) {
    return null;
  }

  if (loading) {
    return <OverlayLoader mode="component" isLoading />;
  }
  return (
    <>
      <HeaderContainer containerProps={{ rowGap: "m" }}>
        <InfoBlock
          labelProps={{ variant: "fineText" }}
          label={t("Accounts.availableBalance")}
          type="currency"
          value={accountData.balance}
          variant={"titleSemiBold"}
        />
        <InfoBlock
          labelProps={{ variant: "fineText" }}
          label={accountTypeLabels[accountData.type]}
          type="text"
          value={accountData.number}
          variant={"bodyBold"}
        />
      </HeaderContainer>
      <TitleBar title={t("Transactions.transactions")} />
      <TransactionFilterBar
        onSearchChange={setters.setSearchTerm}
        hasTransactions={allTransactions.length > 0}
        onFilterPress={toggleBottomSheet}
      />
      <TransactionsList
        currentAccountNumber={accountData.number}
        transactions={filteredTransactions}
      />
      <TransactionFiltersBottomSheet
        sheetRef={bottomSheetRef}
        isOpen={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        dateRange={filters.dateRange}
        onDateRangeChange={setters.setDateRange}
        transactionType={filters.transactionType}
        onTransactionTypeChange={setters.setTransactionType}
        amount={filters.transactionAmount}
        onAmountChange={setters.setTransactionAmount}
        onClear={clearFilters}
        onClose={handleCloseFilter}
      />
    </>
  );
};

export default AccountsDetail;
