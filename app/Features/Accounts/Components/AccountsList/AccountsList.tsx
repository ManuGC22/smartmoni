import { Box, DisplayText } from "@/UI/Atoms";
import { IAccount } from "@/Types";
import { List, AccountCard } from "@/UI/Molecules";
import { I18nContext } from "@/Contexts";

export interface IAccountsListProps {
  accounts: IAccount[];
  onAccountCardPress?: () => void;
}

const AccountsList = ({ accounts, onAccountCardPress }: IAccountsListProps) => {
  const { t } = I18nContext.useLocalization();
  return (
    <>
      <List
        data={accounts}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <DisplayText variant={"title"} textAlign={"center"}>
              {t("Accounts.noAccounts")}
            </DisplayText>
          </Box>
        )}
        renderItem={({ item, index }) => (
          <AccountCard
            onPress={onAccountCardPress}
            account={item}
            containerProps={{ marginTop: index === 0 ? "m" : "s" }}
          />
        )}
      />
    </>
  );
};

export default AccountsList;
