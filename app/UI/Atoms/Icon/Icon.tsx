import React, { useMemo } from "react";
import { IColorKey } from "@/Types";
import { useRestyleTheme } from "@/Hooks";

import IconMapping, { TRestyleIconProps } from "./IconMapping";

export type TIconName = keyof typeof IconMapping;
export interface IIconProps extends TRestyleIconProps {
  name: TIconName;
  color?: IColorKey;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  size?: number;
  mirrored?: boolean;
  style?: React.CSSProperties;
}

const Icon = ({
  name,
  color: customColor = "textPrimary",
  ...props
}: IIconProps & { mirrored?: boolean }) => {
  const { getColor } = useRestyleTheme();

  const color = useMemo(
    () => (!customColor ? undefined : getColor(customColor)),
    [customColor, getColor],
  );

  if (!IconMapping[name]) {
    return null;
  }

  const IconComponent = IconMapping[name] as React.ElementType;

  return <IconComponent color={color} {...props} />;
};

export default Icon;
