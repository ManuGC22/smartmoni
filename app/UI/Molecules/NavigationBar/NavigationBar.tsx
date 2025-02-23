import { Appbar, AppbarProps } from "react-native-paper";
import { useMemo } from "react";

import { StyledUtils } from "@/Utils";
import { Box, DisplayText } from "@/UI/Atoms";

const StyledAppbarHeader = StyledUtils.styled<AppbarProps>(Appbar.Header);

export interface INavigationBarProps
  extends Omit<AppbarProps, "children" | "style"> {
  title?: string;
}

const NavigationBar = ({
  title,
  elevated = true,

  ...props
}: INavigationBarProps) => {
  const contentNode = useMemo(() => {
    if (title) {
      return (
        <Box justifyContent={"center"}>
          <DisplayText variant={"titleSemiBold"}>{title}</DisplayText>
        </Box>
      );
    }

    return null;
  }, [title]);

  return (
    <StyledAppbarHeader
      mode="center-aligned"
      backgroundColor={"background"}
      elevated={elevated}
      {...props}
    >
      {contentNode && <Appbar.Content title={contentNode} />}
    </StyledAppbarHeader>
  );
};

export default NavigationBar;
