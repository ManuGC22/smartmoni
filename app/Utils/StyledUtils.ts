import { IRestyledTheme } from "@/Core/Theme";
import { IBoxComponentProps } from "@/Types";
import {
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  shadow,
  position,
  border,
  backgroundColorShorthand,
  spacingShorthand,
  createRestyleComponent,
} from "@shopify/restyle";

export const restyleFunctions = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  layout,
  spacing,
  spacingShorthand,
  shadow,
  position,
  border,
];

export const styledIcon = <T extends { [key: string]: any }>(
  Icon: React.ComponentType,
) =>
  createRestyleComponent<T, IRestyledTheme>(
    [opacity, visible, layout, spacing, spacingShorthand],
    Icon,
  );

export const styled = <T>(Component: React.ComponentType<any>) =>
  createRestyleComponent<IBoxComponentProps & T, IRestyledTheme>(
    restyleFunctions,
    Component,
  );
