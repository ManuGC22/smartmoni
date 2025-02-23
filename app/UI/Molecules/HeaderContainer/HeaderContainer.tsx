import { Box } from "@/UI/Atoms";
import { IBoxComponentProps } from "@/Types";

export interface IHeaderContainerProps {
  children: React.ReactNode;
  containerProps?: IBoxComponentProps;
}

const HeaderContainer = ({
  children,
  containerProps,
}: IHeaderContainerProps) => {
  return (
    <Box
      width="100%"
      backgroundColor="primary"
      padding="m"
      alignItems="center"
      justifyContent="center"
      {...containerProps}
    >
      {children}
    </Box>
  );
};

export default HeaderContainer;
