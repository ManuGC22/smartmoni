import { Box, Button, DisplayText } from "@/UI/Atoms";
import { BottomSheet, SegmentedButtons, NumericField } from "@/UI/Molecules";
import GBottomSheet from "@gorhom/bottom-sheet";
import { TransactionTypeEnum } from "@/Types";
import { I18nContext } from "@/Contexts";

export interface ITransactionFiltersBottomSheetProps {
  sheetRef: React.RefObject<GBottomSheet>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dateRange: string | null;
  onDateRangeChange: (value: string | null) => void;
  transactionType: TransactionTypeEnum | null;
  onTransactionTypeChange: (value: TransactionTypeEnum | null) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const TransactionFiltersBottomSheet = ({
  sheetRef,
  isOpen,
  onOpenChange,
  dateRange,
  onDateRangeChange,
  transactionType,
  onTransactionTypeChange,
  amount,
  onAmountChange,
  onClear,
  onClose,
}: ITransactionFiltersBottomSheetProps) => {
  const { t } = I18nContext.useLocalization();

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onChange={(index) => onOpenChange(index !== -1)}
    >
      <Box padding={"m"} rowGap={"xl"}>
        <Box rowGap={"s"}>
          <DisplayText variant={"bodyBold"} color={"textAccent"}>
            {t("Transactions.date")}
          </DisplayText>
          <Box>
            <SegmentedButtons
              value={dateRange || ""}
              onValueChange={(value) =>
                onDateRangeChange(value !== "" ? value : null)
              }
              buttons={[
                { value: "7", label: t("Transactions.last7Days") },
                { value: "30", label: t("Transactions.last30Days") },
                { value: "90", label: t("Transactions.last90Days") },
              ]}
            />
          </Box>
        </Box>
        <Box rowGap={"s"}>
          <DisplayText variant={"bodyBold"} color={"textAccent"}>
            {t("Transactions.type")}
          </DisplayText>
          <SegmentedButtons
            value={transactionType || ""}
            onValueChange={(value) =>
              onTransactionTypeChange(
                value !== "" ? (value as TransactionTypeEnum) : null,
              )
            }
            buttons={[
              {
                value: TransactionTypeEnum.DEPOSIT,
                label: t("Transactions.deposits"),
              },
              {
                value: TransactionTypeEnum.WITHDRAWAL,
                label: t("Transactions.withdrawals"),
              },
            ]}
          />
        </Box>
        <Box
          columnGap={"s"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <DisplayText variant={"bodyBold"} color={"textAccent"}>
            {t("Transactions.minAmount")}
          </DisplayText>
          <NumericField value={amount} onChangeText={onAmountChange} />
        </Box>
        <Box flexDirection="row" columnGap={"l"} justifyContent={"center"}>
          <Button mode="outlined" onPress={onClear}>
            {t("Actions.clearFilters")}
          </Button>
          <Button mode="contained" onPress={onClose}>
            {t("Actions.close")}
          </Button>
        </Box>
      </Box>
    </BottomSheet>
  );
};

export default TransactionFiltersBottomSheet;
