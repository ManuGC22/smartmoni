import { useState, useEffect, useMemo } from "react";
import { DisplayText } from "@/UI/Atoms";
import { IAccount } from "@/Types";
import { HeaderContainer, InfoBlock, TitleBar } from "@/UI/Molecules";
import { I18nContext, AuthContext } from "@/Contexts";
import { AccountsList } from "../../Components";
import { Routes } from "@/Routes";
import { useRouter } from "expo-router";
import { AccountAPI } from "@/API";

const AccountsMain = () => {
  const { t } = I18nContext.useLocalization();
  const { currentUser } = AuthContext.useAuth();
  const router = useRouter();
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await AccountAPI.getAll();
        setAccounts(data);
      } catch (error) {
        console.error("Error al obtener cuentas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const accountsTotal = useMemo(
    () => accounts.reduce((total, account) => total + account.balance, 0),
    [accounts],
  );
  return (
    <>
      <HeaderContainer containerProps={{ rowGap: "m" }}>
        <InfoBlock
          labelProps={{ variant: "fineText" }}
          label={t("Accounts.totalBalance")}
          type="currency"
          value={accountsTotal}
          variant={"titleSemiBold"}
        />
        <DisplayText variant={"bodyBold"} color={"textSecondary"}>
          {`${t("General.hello")} ${currentUser?.user.name}!`}
        </DisplayText>
      </HeaderContainer>
      <TitleBar title={t("Accounts.accounts")} />
      <AccountsList
        accounts={accounts}
        isLoading={loading}
        onAccountCardPress={(account) => {
          router.push(`${Routes.ACCOUNT_DETAIL}/${account.id}`);
        }}
      />
    </>
  );
};

export default AccountsMain;
