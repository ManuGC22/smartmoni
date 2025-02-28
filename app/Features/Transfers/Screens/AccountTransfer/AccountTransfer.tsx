import { useState } from "react";
import { DisplayText, Box, Button } from "@/UI/Atoms";
import {
  HeaderContainer,
  TitleBar,
  AccountCard,
  NumericField,
} from "@/UI/Molecules";
import { TouchableOpacity, Keyboard } from "react-native";
import { I18nContext, AccountsContext, SnackbarContext } from "@/Contexts";
import { useRouter } from "expo-router";
import { Routes } from "@/Routes";
import { TransactionAPI } from "@/API";

const AccountTransfer = () => {
  const { t } = I18nContext.useLocalization();
  const router = useRouter();
  const showSnackbar = SnackbarContext.useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const {
    sourceAccount,
    destinationAccount,
    setSelectingFor,
    setSourceAccount,
    setDestinationAccount,
    amount,
    setAmount,
  } = AccountsContext.useAccounts();

  const handleSelectSource = () => {
    setSelectingFor("source");
    router.push(Routes.ACCOUNTS_SELECT);
  };

  const handleSelectDestination = () => {
    setSelectingFor("destination");
    router.push(Routes.ACCOUNTS_SELECT);
  };

  const handleTransfer = async () => {
    if (!sourceAccount || !destinationAccount || !amount) {
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showSnackbar({ text: t("Transactions.moreThanZero") });
      return;
    }

    if (sourceAccount.balance < numericAmount) {
      showSnackbar({ text: t("Transactions.insufficientFunds") });
      return;
    }
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      await TransactionAPI.transfer({
        sourceAccount,
        destinationAccount,
        amount: numericAmount,
        description: "Transferencia entre cuentas",
      });

      setAmount("");
      setSourceAccount(null);
      setDestinationAccount(null);

      showSnackbar({
        text: t("Transactions.transferSuccess"),
      });
    } catch (error) {
      console.error("Error al realizar transferencia:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("Transactions.transferError");
      showSnackbar({ text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeaderContainer containerProps={{ rowGap: "m" }}>
        <DisplayText variant={"subTitle"} color={"textSecondary"}>
          {t("Transactions.transferToOtherAccounts")}
        </DisplayText>
      </HeaderContainer>
      <Box>
        <TitleBar title={t("Transactions.from")} />

        {sourceAccount ? (
          <AccountCard
            onPress={handleSelectSource}
            account={sourceAccount}
            containerProps={{
              borderColor: "carrot",
              marginVertical: "m",
              marginHorizontal: "s",
            }}
          />
        ) : (
          <TouchableOpacity onPress={handleSelectSource}>
            <Box
              padding={"l"}
              justifyContent={"center"}
              alignItems={"center"}
              borderWidth={0.5}
              borderRadius={"card"}
              m={"s"}
            >
              <DisplayText variant={"bodyBold"} color={"carrot"}>
                {t("Accounts.chooseAccount")}
              </DisplayText>
            </Box>
          </TouchableOpacity>
        )}

        <TitleBar title={t("Transactions.to")} />
        {destinationAccount ? (
          <AccountCard
            onPress={handleSelectDestination}
            account={destinationAccount}
            containerProps={{
              borderColor: "primary",
              marginVertical: "m",
              marginHorizontal: "s",
            }}
          />
        ) : (
          <TouchableOpacity onPress={handleSelectDestination}>
            <Box
              padding={"l"}
              justifyContent={"center"}
              alignItems={"center"}
              borderWidth={0.5}
              borderRadius={"card"}
              m={"s"}
            >
              <DisplayText variant={"bodyBold"} color={"textAccent"}>
                {t("Accounts.chooseAccount")}
              </DisplayText>
            </Box>
          </TouchableOpacity>
        )}
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
        <NumericField value={amount} onChangeText={setAmount} />
      </Box>
      <Box margin={"m"}>
        <Button
          backgroundColor="carrot"
          loading={isLoading}
          onPress={handleTransfer}
          disabled={
            !sourceAccount || !destinationAccount || !amount || isLoading
          }
        >
          {t("Actions.transfer")}
        </Button>
      </Box>
    </>
  );
};

export default AccountTransfer;
