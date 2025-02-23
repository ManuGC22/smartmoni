import { IBoxComponentProps } from "@/Types";
import { Box } from "@/UI/Atoms";

export interface ICardProps extends IBoxComponentProps {}

const Card = (props: ICardProps) => {
  return (
    <Box
      borderRadius={"card"}
      borderWidth={1}
      borderColor={"borderLightGray"}
      p={"m"}
      {...props}
    />
  );
};

export default Card;
