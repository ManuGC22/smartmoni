import Constants from "@/Core/Constants";
import { StyledUtils } from "@/Utils";
import { ComponentProps } from "react";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

const KeyboardAwareScrollViewStyled =
  StyledUtils.styled<KeyboardAwareScrollViewProps>(KeyboardAwareScrollView);

export interface IKeyboardAvoidingViewProps
  extends ComponentProps<typeof KeyboardAwareScrollViewStyled> {}

const KeyboardAvoidingView = ({ ...props }: IKeyboardAvoidingViewProps) => {
  return (
    <KeyboardAwareScrollViewStyled
      flex={1}
      enableAutomaticScroll
      extraScrollHeight={Constants.INPUT_HEIGHT / 2}
      {...props}
    />
  );
};

export default KeyboardAvoidingView;
