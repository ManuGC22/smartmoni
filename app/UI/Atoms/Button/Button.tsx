import { ComponentProps, forwardRef, useMemo } from "react";
import { Button as RNPBUtton, ButtonProps, MD3Theme } from "react-native-paper";

import { useRestyleTheme } from "@/Hooks";
import { IColorKey } from "@/Types";
import Constants from "@/Core/Constants";
import { StyledUtils } from "@/Utils";
import { IRestyledTheme } from "@/Core/Theme";

const StyledButton = StyledUtils.styled<ButtonProps>(RNPBUtton);
type $DeepPartial<T> = { [P in keyof T]?: $DeepPartial<T[P]> };
type ThemeProp = $DeepPartial<MD3Theme>;

export interface IButtonProps
  extends Omit<
    ComponentProps<typeof StyledButton>,
    | "textColor"
    | "buttonColor"
    | "background"
    | "bg"
    | "backgroundColor"
    | "color"
  > {
  textColor?: IColorKey;
  backgroundColor?: IColorKey;
  textVariant?: keyof IRestyledTheme["textVariants"];
  theme?: ThemeProp;
}

const Button = (
  {
    mode = "contained",
    textVariant = "button",
    textColor,
    backgroundColor,
    disabled,
    style,
    contentStyle,
    labelStyle = {},
    theme: buttonTheme,
    ...props
  }: IButtonProps,
  ref: React.ForwardedRef<unknown>,
) => {
  const { getColor, theme, getTextVariant } = useRestyleTheme();
  const isDisabledAndOutlined = useMemo(
    () => disabled && mode === "outlined",
    [disabled, mode],
  );

  const restyleProps = useMemo(() => {
    return {
      ...(textColor ? { textColor: getColor(textColor) } : {}),
      ...(backgroundColor ? { buttonColor: getColor(backgroundColor) } : {}),
      labelStyle: [labelStyle, getTextVariant(textVariant)],
    };
  }, [
    backgroundColor,
    getColor,
    getTextVariant,
    labelStyle,
    textColor,
    textVariant,
  ]);

  const overrideTheme = useMemo((): ThemeProp => {
    if (!disabled) {
      return buttonTheme as ThemeProp;
    }

    return {
      ...buttonTheme,
      colors: {
        ...buttonTheme?.colors,
        onSurfaceDisabled: mode === "contained" ? "white" : "error",
        ...(disabled && mode === "contained"
          ? {
              onSurfaceDisabled: theme.colors.white,
              surfaceDisabled:
                buttonTheme?.colors?.surfaceDisabled ||
                theme.colors.disabledPrimary,
            }
          : {}),
        ...(isDisabledAndOutlined
          ? {
              onSurfaceDisabled: theme.colors.textPrimary,
              surfaceDisabled: theme.colors.borderLightGray,
            }
          : {}),
      },
    };
  }, [
    buttonTheme,
    disabled,
    isDisabledAndOutlined,
    mode,
    theme.colors.borderLightGray,
    theme.colors.disabledPrimary,
    theme.colors.textPrimary,
    theme.colors.white,
  ]);

  return (
    <StyledButton
      ref={ref}
      mode={mode}
      {...props}
      contentStyle={[
        {
          height: Constants.BUTTON_HEIGHT,
        },
        contentStyle,
      ]}
      style={[
        {
          ...(isDisabledAndOutlined
            ? { backgroundColor: theme.colors.disabled }
            : {}),
        },
        style,
      ]}
      disabled={disabled}
      theme={overrideTheme}
      {...restyleProps}
    />
  );
};

export default forwardRef(Button);
