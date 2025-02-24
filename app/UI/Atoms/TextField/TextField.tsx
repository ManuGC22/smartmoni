import Constants from "@/Core/Constants";
import { useRestyleTheme } from "@/Hooks";
import * as React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import Icon, { TIconName } from "../Icon";
import Mixins from "@/Core/Mixins";

export interface ITextFieldProps
  extends Omit<TextInputProps, "label" | "mode"> {
  leftIcon?: TIconName;
  onLeftIconPress?: () => void;
  rightIcon?: TIconName;
  onRightIconPress?: () => void;
  variant?: TextInputProps["mode"];
}

const TextField = ({
  variant = "outlined",
  leftIcon,
  onLeftIconPress,
  rightIcon,
  onRightIconPress,
  ...props
}: ITextFieldProps) => {
  const [isFocused, setFocused] = React.useState(false);
  const {
    theme: { colors, borderRadii },
  } = useRestyleTheme();

  const onFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  const renderLeftNode = React.useMemo(() => {
    if (leftIcon) {
      return (
        <TextInput.Icon
          icon={({ size }) => (
            <Icon name={leftIcon} color="textPrimary" size={Mixins.s(size)} />
          )}
          disabled={!onLeftIconPress}
          accessible={!onLeftIconPress}
          {...(onLeftIconPress ? { onPress: onLeftIconPress } : {})}
        />
      );
    }

    return null;
  }, [leftIcon, onLeftIconPress]);

  const renderRightNode = React.useMemo(() => {
    if (rightIcon) {
      return (
        <TextInput.Icon
          icon={({ size }) => (
            <Icon name={rightIcon} color="textPrimary" size={Mixins.s(size)} />
          )}
          disabled={!onRightIconPress}
          accessible={!onRightIconPress}
          {...(onRightIconPress ? { onPress: onRightIconPress } : {})}
        />
      );
    }

    return null;
  }, [onRightIconPress, rightIcon]);

  return (
    <TextInput
      {...props}
      textColor={colors.textPrimary}
      mode={variant}
      onFocus={onFocus}
      onBlur={onBlur}
      left={renderLeftNode}
      right={renderRightNode}
      style={{
        height: Constants.INPUT_HEIGHT,
        flex: 1,
      }}
      outlineColor={colors.borderLightGray}
      activeOutlineColor={colors.textPrimary}
      outlineStyle={{
        backgroundColor: isFocused ? colors.foreground : colors.background,
        borderWidth: 1,
        borderRadius: borderRadii.textField,
      }}
    />
  );
};

export default TextField;
