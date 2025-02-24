import { ActivityIndicator } from "react-native-paper";
import { Box, DisplayText } from "@/UI/Atoms";

export interface IOverlayLoaderProps {
  isLoading: boolean;
  mode?: "modal" | "component";
  title?: string;
}

const OverlayLoader = ({
  isLoading,
  mode = "modal",
  title,
}: IOverlayLoaderProps) => {
  return (
    <Box
      {...(mode === "modal"
        ? {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }
        : { height: "100%", flex: 1 })}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"foreground"}
      zIndex={"overlay"}
    >
      <Box justifyContent={"center"} alignItems={"center"} rowGap={"xl"}>
        {title && <DisplayText variant={"heading"}>{title}</DisplayText>}
        <ActivityIndicator
          size={"large"}
          color={"primary"}
          animating={isLoading}
        />
      </Box>
    </Box>
  );
};

export default OverlayLoader;
