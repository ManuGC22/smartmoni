import Mixins from "@/Core/Mixins";
import { StyledUtils } from "@/Utils";
import { ComponentProps } from "react";
import {
  Avatar as RNAvatar,
  AvatarImageProps,
  AvatarTextProps,
} from "react-native-paper";

const StyledAvatarImage = StyledUtils.styled<AvatarImageProps>(RNAvatar.Image);
const StyledAvatarText = StyledUtils.styled<AvatarTextProps>(RNAvatar.Text);

export type IAvatarProps =
  | (ComponentProps<typeof StyledAvatarImage> & {
      label?: undefined;
      source: AvatarImageProps["source"];
    })
  | (ComponentProps<typeof StyledAvatarText> & {
      label: string;
      source?: undefined;
    });

const Avatar = ({ label, source, ...props }: IAvatarProps) => {
  if (source) {
    return <StyledAvatarImage source={source} size={Mixins.s(54)} {...props} />;
  }

  return (
    <StyledAvatarText size={Mixins.s(54)} label={label || ""} {...props} />
  );
};

export default Avatar;
