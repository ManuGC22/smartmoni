import { Box, DisplayText } from "@/UI/Atoms";
import { List } from "@/UI/Molecules";
import { ITransaction } from "@/Types";
import { I18nContext } from "@/Contexts";
import TransactionCard from "../TransactionCard";

export interface ITransactionsListProps {
  transactions: ITransaction[];
  currentAccountNumber: string;
  onTransactionCardPress?: () => void;
}

const TransactionsList = ({
  transactions,
  currentAccountNumber,
  onTransactionCardPress,
}: ITransactionsListProps) => {
  const { t } = I18nContext.useLocalization();

  return (
    <>
      <List
        data={transactions}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <DisplayText variant={"title"} textAlign={"center"}>
              {t("Accounts.noTransactions")}
            </DisplayText>
          </Box>
        )}
        renderItem={({ item, index }) => (
          <TransactionCard
            currentAccountNumber={currentAccountNumber}
            onPress={onTransactionCardPress}
            transaction={item}
            containerProps={{ marginTop: index === 0 ? "m" : "s" }}
          />
        )}
      />
    </>
  );
};

export default TransactionsList;
