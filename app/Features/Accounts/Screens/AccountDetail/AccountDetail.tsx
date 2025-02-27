import { useMemo, useCallback, useState, useEffect } from "react";
import { ITransaction, IAccount, AccountTypeEnum } from "@/Types";
import {
  HeaderContainer,
  InfoBlock,
  TitleBar,
  SearchInput,
  OverlayLoader,
} from "@/UI/Molecules";
import { Box, Icon, Button } from "@/UI/Atoms";
import { I18nContext } from "@/Contexts";
import { TransactionsList } from "../../Components";
import { useLocalSearchParams } from "expo-router";
import { AccountAPI, TransactionAPI } from "@/API";

const AccountsDetail = () => {
  const { t } = I18nContext.useLocalization();
  const { id } = useLocalSearchParams();
  const [accountData, setAccountData] = useState<IAccount | null>(null);
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setLoading(true);
      setTransactionsData([]); // 🔹 Clear transactions immediately

      try {
        const account = await AccountAPI.getById(id as string);
        if (!account) {
          return null;
        }
        const transactions = await TransactionAPI.getAllByAccountNumber(
          account.number,
        );
        setAccountData(account);
        setTransactionsData(transactions);
      } catch (error) {
        console.error("Error fetching account details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [id]);

  const accountTypeLabels = useMemo(
    () => ({
      [AccountTypeEnum.CHECKING]: t("Accounts.checkingAccount"),
      [AccountTypeEnum.SAVINGS]: t("Accounts.savingsAccount"),
    }),
    [t],
  );
  const renderHeader = useCallback(() => {
    if (!transactionsData.length) {
      return null;
    }

    return (
      <Box
        backgroundColor={"background"}
        width={"100%"}
        padding={"s"}
        flexDirection={"row"}
        columnGap={"m"}
        justifyContent={"space-between"}
        borderBottomWidth={0.5}
        borderBottomColor={"borderLightGray"}
      >
        <SearchInput
          onSearchTermChange={() => {}}
          placeholder={t("Accounts.searchTransactions")}
        />
        <Button mode="outlined" onPress={() => {}}>
          <Icon name="Filter" color="primary" />
        </Button>
      </Box>
    );
  }, [t, transactionsData.length]);

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
      {renderHeader()}
      <TransactionsList
        currentAccountNumber={accountData.number}
        transactions={transactionsData}
      />
    </>
  );
};

export default AccountsDetail;
