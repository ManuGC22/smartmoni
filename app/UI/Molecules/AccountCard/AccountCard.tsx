import { Box, DisplayText } from "@/UI/Atoms";
import { IBoxComponentProps } from "@/Types";
import DisplayCurrency from "../DisplayCurrency";

export interface IAccountCardProps {
  type: string;
  number: string;
  balance: number;
  containerProps?: IBoxComponentProps;
}

const AccountCard = ({
  type,
  number,
  balance,
  containerProps,
}: IAccountCardProps) => {
  return (
    <Box
      width={"100%"}
      padding={"s"}
      borderRadius={"card"}
      borderWidth={0.5}
      borderBottomWidth={5}
      borderBottomColor={"primary"}
      borderColor={"borderLightGray"}
      backgroundColor={"background"}
      alignItems={"center"}
      {...containerProps}
    >
      <Box
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"m"}
      >
        <DisplayText variant={"subTitleBold"} color={"textAccent"}>
          {type}
        </DisplayText>
        <DisplayText variant={"body"}>{number}</DisplayText>
      </Box>

      <Box marginTop={"s"} alignItems={"center"}>
        <DisplayCurrency value={balance} variant={"titleSemiBold"} />
      </Box>
    </Box>
  );
};

export default AccountCard;
