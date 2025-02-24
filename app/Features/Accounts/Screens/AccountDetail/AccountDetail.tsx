import { useMemo, useCallback } from "react";
import {
  TransactionTypeEnum,
  ITransaction,
  TransactionStatusEnum,
  AccountTypeEnum,
} from "@/Types";
import {
  HeaderContainer,
  InfoBlock,
  TitleBar,
  SearchInput,
} from "@/UI/Molecules";
import { Box, Icon, Button } from "@/UI/Atoms";
import { I18nContext } from "@/Contexts";
import { TransactionsList } from "../../Components";

const AccountsDetail = () => {
  const { t } = I18nContext.useLocalization();
  const accountData = {
    id: "5",
    type: AccountTypeEnum.CHECKING,
    number: "00567890123",
    balance: 35000,
    isActive: true,
    currency: "DOP",
    createdAt: "2023-11-05T08:10:00Z",
  };
  const transactionsData: ITransaction[] = [
    {
      id: "1",
      type: TransactionTypeEnum.DEPOSIT,
      amount: 5000,
      currency: "DOP",
      createdAt: "2024-02-23T12:30:00Z",
      status: TransactionStatusEnum.COMPLETED,
      fromAccountId: "00123456",
      toAccountId: "00987654",
      description: "Transferencia a cuenta de ahorros",
    },
    {
      id: "2",
      type: TransactionTypeEnum.WITHDRAWAL,
      amount: 1200,
      currency: "USD",
      createdAt: "2024-02-20T14:15:00Z",
      status: TransactionStatusEnum.PENDING,
      fromAccountId: "00345678",
      toAccountId: "00987654",
      description: "Pago de suscripción mensual",
    },
    {
      id: "3",
      type: TransactionTypeEnum.DEPOSIT,
      amount: 30000,
      currency: "DOP",
      createdAt: "2024-01-10T09:00:00Z",
      status: TransactionStatusEnum.COMPLETED,
      toAccountId: "00123459",
      fromAccountId: "00987654",
      description: "Depósito de nómina",
    },
    {
      id: "4",
      type: TransactionTypeEnum.WITHDRAWAL,
      amount: 5000,
      currency: "DOP",
      createdAt: "2024-01-08T11:45:00Z",
      status: TransactionStatusEnum.FAILED,
      toAccountId: "00987654",
      fromAccountId: "00123456",
      description: "Retiro fallido en cajero automático",
    },
    {
      id: "5",
      type: TransactionTypeEnum.DEPOSIT,
      amount: 15000,
      currency: "DOP",
      createdAt: "2024-02-18T08:20:00Z",
      status: TransactionStatusEnum.COMPLETED,
      fromAccountId: "00987654",
      toAccountId: "00123456",
      description: "Transferencia recibida de amigo",
    },
  ];
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
      <TransactionsList transactions={transactionsData} />
    </>
  );
};

export default AccountsDetail;
