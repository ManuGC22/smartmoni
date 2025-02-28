import { TouchableOpacity } from "react-native";
import { Box, DisplayText } from "@/UI/Atoms";
import { Card, DisplayDate, DisplayCurrency } from "@/UI/Molecules";
import { ITransaction, IBoxComponentProps } from "@/Types";
import { I18nContext } from "@/Contexts";
import { useMemo } from "react";

export interface ITransactionCardProps {
  transaction: ITransaction;
  containerProps?: IBoxComponentProps;
  currentAccountNumber?: string;
  onPress?: () => void;
}

const TransactionCard = ({
  transaction,
  containerProps,
  currentAccountNumber,
  onPress,
}: ITransactionCardProps) => {
  const { t } = I18nContext.useLocalization();

  const isWithdrawal = useMemo(
    () => transaction.fromAccountNumber === currentAccountNumber,
    [transaction.fromAccountNumber, currentAccountNumber],
  );

  const transactionLabel = useMemo(
    () =>
      isWithdrawal
        ? `${t("Transactions.transferTo")} ${transaction.toAccountNumber}`
        : `${t("Transactions.transferFrom")} ${transaction.fromAccountNumber}`,
    [
      isWithdrawal,
      transaction.fromAccountNumber,
      transaction.toAccountNumber,
      t,
    ],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card
        padding={"s"}
        borderWidth={0.5}
        borderLeftWidth={5}
        borderColor={isWithdrawal ? "carrot" : "primary"}
        backgroundColor={"background"}
        {...containerProps}
      >
        <Box flexDirection="row" columnGap={"xs"} alignItems="center">
          <Box flex={1} rowGap={"m"}>
            <DisplayText variant="body" color="textAccent">
              {transactionLabel}
            </DisplayText>
            <DisplayDate
              variant="fineText"
              color="textPrimary"
              format="D MMMM YYYY"
            >
              {transaction.createdAt}
            </DisplayDate>
          </Box>
          <Box flexDirection={"row"} alignItems="flex-end">
            <DisplayText>{isWithdrawal ? "-" : "+"}</DisplayText>
            <DisplayCurrency value={transaction.amount} variant="bodyBold" />
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default TransactionCard;
