import { useEffect, useState } from "react";
import { DisplayText } from "@/UI/Atoms";
import { IAccount } from "@/Types";
import { HeaderContainer } from "@/UI/Molecules";
import { I18nContext } from "@/Contexts";
import { AccountsList } from "../../Components";
import { AccountAPI } from "@/API";
const AccountsMain = () => {
  const { t } = I18nContext.useLocalization();
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
        onAccountCardPress={() => {
          console.log("Press");
        }}
      />
    </>
  );
};

export default AccountsMain;
