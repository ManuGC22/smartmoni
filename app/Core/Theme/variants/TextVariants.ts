import { StyleProp, TextStyle } from "react-native";
import Typography from "../Typography";
import Mixins from "../../Mixins";

const TextVariants = {
  defaults: {
    fontFamily: Typography.regular,
    fontSize: Mixins.s(16),
    fontWeight: "normal",
    lineHeight: Mixins.s(24),
    color: "textPrimary",
  },
  heading: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(35),
    fontWeight: "500",
    lineHeight: Mixins.s(52),
    color: "textPrimary",
  },
  heading40: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(40),
    fontWeight: "500",
    lineHeight: Mixins.s(52),
    color: "textPrimary",
  },
  title: {
    fontFamily: Typography.regular,
    fontSize: Mixins.s(20),
    fontWeight: "400",
    lineHeight: Mixins.s(30),
    color: "textPrimary",
  },
  titleSemiBold: {
    fontFamily: Typography.semiBold,
    fontSize: Mixins.s(20),
    fontWeight: "600",
    lineHeight: Mixins.s(30),
    color: "textPrimary",
  },
  subTitle: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(18),
    fontWeight: "500",
    lineHeight: Mixins.s(27),
    color: "gray",
  },
  subTitleBold: {
    fontFamily: Typography.bold,
    fontSize: Mixins.s(18),
    fontWeight: "700",
    lineHeight: Mixins.s(27),
    color: "gray",
  },
  bodyRegular: {
    fontFamily: Typography.regular,
    fontSize: Mixins.s(16),
    fontWeight: "400",
    lineHeight: Mixins.s(24),
    color: "textPrimary",
  },
  body: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(16),
    fontWeight: "400",
    lineHeight: Mixins.s(24),
    color: "textPrimary",
  },
  bodyBold: {
    fontFamily: Typography.bold,
    fontSize: Mixins.s(16),
    fontWeight: "700",
    lineHeight: Mixins.s(24),
    color: "textPrimary",
  },
  fineText: {
    fontFamily: Typography.regular,
    fontSize: Mixins.s(13),
    fontWeight: "400",
    lineHeight: Mixins.s(19.5),
    color: "textPrimary",
  },
  button: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(18),
    fontWeight: "700",
    lineHeight: Mixins.s(23),
    textTransform: "uppercase",
  },
  buttonTextSecondary: {
    fontFamily: Typography.medium,
    fontSize: Mixins.s(13),
    fontWeight: "600",
    textDecorationLine: "underline",
  },
};

export default TextVariants as Record<
  keyof typeof TextVariants,
  StyleProp<TextStyle>
>;
