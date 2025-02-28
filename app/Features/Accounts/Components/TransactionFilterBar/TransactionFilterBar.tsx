import { Box, Icon, Button } from "@/UI/Atoms";
import { SearchInput } from "@/UI/Molecules";
import { I18nContext } from "@/Contexts";

export interface ITransactionFilterBarProps {
  onSearchChange: (term: string) => void;
  onFilterPress: () => void;
  hasTransactions: boolean;
}

const TransactionFilterBar = ({
  onSearchChange,
  onFilterPress,
  hasTransactions,
}: ITransactionFilterBarProps) => {
  const { t } = I18nContext.useLocalization();

  if (!hasTransactions) {
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
        onSearchTermChange={onSearchChange}
        placeholder={t("Accounts.searchTransactions")}
      />
      <Button mode="outlined" onPress={onFilterPress}>
        <Icon name="Filter" color="primary" />
      </Button>
    </Box>
  );
};

export default TransactionFilterBar;
