import { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Box, DisplayText } from "@/UI/Atoms";
import DisplayCurrency from "../DisplayCurrency";
import { AccountTypeEnum, IAccount, IBoxComponentProps } from "@/Types";
import { I18nContext } from "@/Contexts";
import Card from "../Card";

export interface IAccountCardProps {
  account: IAccount;
  containerProps?: IBoxComponentProps;
  onPress?: () => void;
}

const AccountCard = ({
  account,
  containerProps,
  onPress,
}: IAccountCardProps) => {
  const { t } = I18nContext.useLocalization();

  const accountTypeLabels = useMemo(
    () => ({
      [AccountTypeEnum.CHECKING]: t("Accounts.checkingAccount"),
      [AccountTypeEnum.SAVINGS]: t("Accounts.savingsAccount"),
    }),
    [t],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card
        padding={"s"}
        borderWidth={0.5}
        borderBottomWidth={5}
        borderBottomColor={"primary"}
        borderColor={"borderLightGray"}
        backgroundColor={"background"}
        {...containerProps}
      >
        <Box
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"m"}
        >
          <DisplayText variant={"subTitleBold"} color={"textAccent"}>
            {accountTypeLabels[account.type]}
          </DisplayText>
          <DisplayText variant={"body"}>{account.number}</DisplayText>
        </Box>

        <Box marginTop={"s"} alignItems={"center"}>
          <DisplayCurrency value={account.balance} variant={"titleSemiBold"} />
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default AccountCard;
