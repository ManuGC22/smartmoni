import { DisplayText, Box, Button } from "@/UI/Atoms";
import { IAccount, AccountTypeEnum } from "@/Types";
import {
  HeaderContainer,
  TitleBar,
  AccountCard,
  NumericField,
} from "@/UI/Molecules";
import { I18nContext } from "@/Contexts";
import { useRouter } from "expo-router";
import { Routes } from "@/Routes";
const AccountTransfer = () => {
  const { t } = I18nContext.useLocalization();
  const router = useRouter();
  const accountsData: IAccount[] = [
    {
      id: "1",
      type: AccountTypeEnum.CHECKING,
      number: "00123456789",
      balance: 120000,
      isActive: true,
      currency: "DOP",
      createdAt: "2024-02-23T12:00:00Z",
    },
    {
      id: "2",
      type: AccountTypeEnum.SAVINGS,
      number: "00987654321",
      balance: 85000,
      isActive: true,
      currency: "DOP",
      createdAt: "2024-02-20T15:30:00Z",
    },
    {
      id: "3",
      type: AccountTypeEnum.CHECKING,
      number: "00345678901",
      balance: 45000,
      isActive: true,
      currency: "DOP",
      createdAt: "2024-01-15T09:45:00Z",
    },
    {
      id: "4",
      type: AccountTypeEnum.SAVINGS,
      number: "00456789012",
      balance: 97000,
      isActive: true,
      currency: "DOP",
      createdAt: "2023-12-10T11:20:00Z",
    },
    {
      id: "5",
      type: AccountTypeEnum.CHECKING,
      number: "00567890123",
      balance: 35000,
      isActive: true,
      currency: "DOP",
      createdAt: "2023-11-05T08:10:00Z",
    },
  ];

  return (
    <>
      <HeaderContainer containerProps={{ rowGap: "m" }}>
        <DisplayText variant={"subTitle"} color={"textSecondary"}>
          {t("Transactions.transferToOtherAccounts")}
        </DisplayText>
      </HeaderContainer>
      <Box>
        <TitleBar title={t("Transactions.from")} />
        <AccountCard
          onPress={() => router.push(Routes.ACCOUNTS_SELECT)}
          account={accountsData[0]}
          containerProps={{
            borderColor: "carrot",
            marginVertical: "m",
            marginHorizontal: "s",
          }}
        />
        <TitleBar title={t("Transactions.to")} />
        <AccountCard
          onPress={() => router.push(Routes.ACCOUNTS_SELECT)}
          account={accountsData[1]}
          containerProps={{
            borderColor: "primary",
            marginVertical: "m",
            marginHorizontal: "s",
          }}
        />
      </Box>
      <Box
        backgroundColor={"background"}
        borderWidth={0.5}
        borderColor={"borderLightGray"}
        padding={"s"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        columnGap={"m"}
      >
        <DisplayText variant={"subTitleBold"} color={"textAccent"}>
          {t("Transactions.amount")}
        </DisplayText>
        <NumericField onChangeText={() => {}} />
      </Box>
      <Box margin={"m"}>
        <Button backgroundColor="carrot" onPress={() => {}}>
          {t("Actions.transfer")}
        </Button>
      </Box>
    </>
  );
};

export default AccountTransfer;
