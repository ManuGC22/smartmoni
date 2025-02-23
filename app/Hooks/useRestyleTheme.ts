import { IRestyledTheme } from "@/Core/Theme";
import { IColorKey } from "@/Types";
import { useTheme } from "@shopify/restyle";
import { useCallback } from "react";

const useRestyleTheme = () => {
  const theme = useTheme<IRestyledTheme>();

  const getColor = useCallback(
    (color: IColorKey) => {
      return theme.colors[color];
    },
    [theme.colors],
  );

  const getTextVariant = useCallback(
    (textVariant: keyof IRestyledTheme["textVariants"]) => {
      return theme.textVariants[textVariant];
    },
    [theme.textVariants],
  );

  return { getColor, getTextVariant, theme };
};

export default useRestyleTheme;
