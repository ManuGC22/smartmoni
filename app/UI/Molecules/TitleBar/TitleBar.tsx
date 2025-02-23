import { Box, DisplayText } from "@/UI/Atoms";
import { IBoxComponentProps } from "@/Types";

export interface ITitleBarProps {
  title: string;
  containerProps?: IBoxComponentProps;
}

const TitleBar = ({ title, containerProps }: ITitleBarProps) => {
  return (
    <Box
      borderWidth={0.5}
      borderColor={"borderLightGray"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"xs"}
      {...containerProps}
    >
      <DisplayText variant={"subTitleBold"} color={"textAccent"}>
        {title}
      </DisplayText>
    </Box>
  );
};

export default TitleBar;
