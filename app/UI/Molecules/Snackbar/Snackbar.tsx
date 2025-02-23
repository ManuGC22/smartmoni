import { Snackbar as SnackbarRNP, SnackbarProps } from "react-native-paper";
import { DisplayText } from "@/UI/Atoms";
import Mixins from "@/Core/Mixins";

export interface ISnackbarProps extends SnackbarProps {
  severity?: "success" | "error";
}

const Snackbar = ({ severity, ...props }: ISnackbarProps) => {
  return (
    <SnackbarRNP
      duration={3000}
      wrapperStyle={{
        paddingHorizontal: Mixins.s(8),
      }}
      theme={{
        roundness: Mixins.s(12),
      }}
      {...props}
    >
      <DisplayText variant={"fineText"} color={"white"}>
        {props.children}
      </DisplayText>
    </SnackbarRNP>
  );
};

export default Snackbar;
