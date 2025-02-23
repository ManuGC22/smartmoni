import { IRestyledTheme } from "@/Core/Theme";
import {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  BorderProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  ShadowProps,
  SpacingProps,
  SpacingShorthandProps,
  VisibleProps,
} from "@shopify/restyle";
import { View } from "react-native";

export type IBoxProps = BackgroundColorProps<IRestyledTheme> &
  BackgroundColorShorthandProps<IRestyledTheme> &
  OpacityProps<IRestyledTheme> &
  VisibleProps<IRestyledTheme> &
  LayoutProps<IRestyledTheme> &
  SpacingProps<IRestyledTheme> &
  SpacingShorthandProps<IRestyledTheme> &
  ShadowProps<IRestyledTheme> &
  PositionProps<IRestyledTheme> &
  BorderProps<IRestyledTheme>;

export type IBoxComponentProps = React.ComponentProps<typeof View> & {
  children?: React.ReactNode;
} & IBoxProps;

export type IColorKey = keyof IRestyledTheme["colors"];

export type TInscriptionRecord = number;
