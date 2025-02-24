import { TouchableOpacity } from "react-native";
import { Box, DisplayText } from "@/UI/Atoms";
import { Card, DisplayDate, DisplayCurrency } from "@/UI/Molecules";
import { ITransaction, TransactionTypeEnum, IBoxComponentProps } from "@/Types";
import { I18nContext } from "@/Contexts";
import { useMemo } from "react";

export interface ITransactionCardProps {
  transaction: ITransaction;
  containerProps?: IBoxComponentProps;
  onPress?: () => void;
}

const TransactionCard = ({
  transaction,
  containerProps,
  onPress,
}: ITransactionCardProps) => {
  const { t } = I18nContext.useLocalization();

  const transactionTypeLabels = useMemo(
    () => ({
      [TransactionTypeEnum.DEPOSIT]: `${t("Transactions.transferFrom")} ${transaction.fromAccountId}`,
      [TransactionTypeEnum.WITHDRAWAL]: `${t("Transactions.transferTo")} ${transaction.toAccountId}`,
    }),
    [t, transaction.fromAccountId, transaction.toAccountId],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card
        padding={"s"}
        borderWidth={0.5}
        borderLeftWidth={5}
        borderLeftColor={
          transaction.type === TransactionTypeEnum.DEPOSIT
            ? "primary"
            : "carrot"
        }
        borderColor={"borderLightGray"}
        backgroundColor={"background"}
        {...containerProps}
      >
        <Box flexDirection="row" columnGap={"xs"} alignItems="center">
          <Box flex={1} rowGap={"m"}>
            <DisplayText variant="body" color="textAccent">
              {transactionTypeLabels[transaction.type]}
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
            <DisplayText>
              {transaction.type === TransactionTypeEnum.DEPOSIT ? "+" : "-"}
            </DisplayText>
            <DisplayCurrency value={transaction.amount} variant="bodyBold" />
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default TransactionCard;
