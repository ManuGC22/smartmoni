import { IRestyledTheme } from "@/Core/Theme";
import { createText } from "@shopify/restyle";
import React, { ComponentProps, useMemo } from "react";

const TextStyled = createText<IRestyledTheme>();
export interface IDisplayTextProps extends ComponentProps<typeof TextStyled> {
  children: React.ReactNode;
}

const DisplayText = ({
  children,
  ...props
}: IDisplayTextProps): JSX.Element => {
  const displayValue = useMemo(() => {
    return (typeof children === "number" && isNaN(children)) || !children
      ? "-"
      : children;
  }, [children]);

  return <TextStyled {...props}>{displayValue}</TextStyled>;
};

export default DisplayText;
