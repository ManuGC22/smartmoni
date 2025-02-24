import { StyledUtils } from "@/Utils";
import {
  CaretLeft,
  MagnifyingGlass,
  Faders,
  House,
  ArrowsLeftRight,
} from "phosphor-react-native";

import {
  LayoutProps,
  OpacityProps,
  PositionProps,
  SpacingProps,
  SpacingShorthandProps,
  VisibleProps,
} from "@shopify/restyle";
import { IRestyledTheme } from "@/Core/Theme";

export type TRestyleIconProps = LayoutProps<IRestyledTheme> &
  OpacityProps<IRestyledTheme> &
  PositionProps<IRestyledTheme> &
  SpacingProps<IRestyledTheme> &
  SpacingShorthandProps<IRestyledTheme> &
  VisibleProps<IRestyledTheme>;

const IconMapping = {
  Back: StyledUtils.styledIcon<TRestyleIconProps>(CaretLeft),
  Search: StyledUtils.styledIcon<TRestyleIconProps>(MagnifyingGlass),
  Filter: StyledUtils.styledIcon<TRestyleIconProps>(Faders),
  Home: StyledUtils.styledIcon<TRestyleIconProps>(House),
  Swap: StyledUtils.styledIcon<TRestyleIconProps>(ArrowsLeftRight),
};

export default IconMapping;
