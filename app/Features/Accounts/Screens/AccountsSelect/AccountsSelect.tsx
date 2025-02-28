import { useCallback, useState } from "react";
import { DisplayText } from "@/UI/Atoms";
import { IAccount } from "@/Types";
import { HeaderContainer } from "@/UI/Molecules";
import { I18nContext, AccountsContext } from "@/Contexts";
import { Routes } from "@/Routes";
import { AccountsList } from "../../Components";
import { AccountAPI } from "@/API";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const AccountsSelect = () => {
  const { t } = I18nContext.useLocalization();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    setSourceAccount,
    setDestinationAccount,
    selectingFor,
    sourceAccount,
    destinationAccount,
  } = AccountsContext.useAccounts();

  const fetchAccounts = useCallback(async () => {
    try {
      const data = await AccountAPI.getAll();

      let filteredAccounts = [...data];

      if (selectingFor === "source" && destinationAccount) {
        filteredAccounts = data.filter(
          (account: IAccount) => account.id !== destinationAccount.id,
        );
      } else if (selectingFor === "destination" && sourceAccount) {
        filteredAccounts = data.filter(
          (account: IAccount) => account.id !== sourceAccount.id,
        );
      }

      setAccounts(filteredAccounts);
    } catch (error) {
      console.error("Error al obtener cuentas:", error);
    } finally {
      setLoading(false);
    }
  }, [selectingFor, destinationAccount, sourceAccount]);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts]),
  );

  const handleAccountSelect = (account: IAccount) => {
    if (selectingFor === "source") {
      setSourceAccount(account);
    } else if (selectingFor === "destination") {
      setDestinationAccount(account);
    }
    router.push(Routes.ACCOUNTS_TRANSFERS);
  };

  return (
    <>
      <HeaderContainer containerProps={{ rowGap: "m" }}>
        <DisplayText variant={"subTitle"} color={"textSecondary"}>
          {t("Accounts.chooseAccount")}
        </DisplayText>
      </HeaderContainer>
      <AccountsList
        isLoading={loading}
        accounts={accounts}
        onAccountCardPress={handleAccountSelect}
      />
    </>
  );
};

export default AccountsSelect;
