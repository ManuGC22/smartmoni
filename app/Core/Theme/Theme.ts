import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { createTheme } from "@shopify/restyle";
import { Platform } from "react-native";

import TextVariants from "./variants/TextVariants";
import Mixins from "../Mixins";

const palette = {
  white: "#FFFFFF",
  black: "#0B1215",
  blackCoffee: "#32292F",
  blueMetal: "#244B6B",
  blackHover: "#232326E5",
  gray: "#B8B8B8",
  darkgray: "#787878",
  borderLightGray: "#8A8A8A80",
  whiteHover: "#F4F4F4",
  error: "#d32f2f",
  carrot: "#F89429",
  success: "#2e7d32",
  yellow: "#ffcc00",
};

const Theme: typeof DefaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.blueMetal,
    onPrimary: palette.white,
    secondary: palette.carrot,
    background: palette.white,
    secondaryContainer: palette.blueMetal,
    onSecondaryContainer: palette.white,
    outline: palette.borderLightGray,
  },
};

const RestyledTheme = createTheme({
  colors: {
    primary: palette.blueMetal,
    textPrimary: palette.blackCoffee,
    textSecondary: palette.white,
    textAccent: palette.blueMetal,
    disabledPrimary: Mixins.hexToRGB(palette.blueMetal, 0.5),
    overlay: Mixins.hexToRGB(palette.white, 0.95),
    disabled: palette.whiteHover,
    background: palette.white,
    foreground: palette.whiteHover,
    borderLightGray: palette.borderLightGray,
    gray: palette.gray,
    white: palette.white,
    error: palette.error,
    errorbg: Mixins.hexToRGB(palette.error, 0.1),
    success: palette.success,
    successbg: Mixins.hexToRGB(palette.success, 0.1),
    warning: "#be8b32",
    warningbg: "#ffefbc",
    carrot: palette.carrot,
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 50,
  },
  breakpoints: {
    phone: 0,
    largePhone: {
      width: 0,
      height: Platform.select({
        ios: 736,
        default: 640,
      }),
    },
    tablet: 768,
  },
  zIndices: {
    none: 0,
    overlay: 99,
  },
  borderRadii: {
    none: 0,
  },
  textVariants: TextVariants,
});

type ITheme = typeof Theme;
type IRestyledTheme = typeof RestyledTheme;

export type { ITheme, IRestyledTheme };

export { RestyledTheme, Theme };
