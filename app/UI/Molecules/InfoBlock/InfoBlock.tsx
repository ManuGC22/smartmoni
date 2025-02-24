import { useMemo } from "react";
import { Box, DisplayText, IDisplayTextProps } from "@/UI/Atoms";
import DisplayCurrency, { IDisplayCurrencyProps } from "../DisplayCurrency";
import { IBoxComponentProps } from "@/Types";

interface ICommonProps {
  label: string;
  labelProps?: Omit<IDisplayTextProps, "children">;
  containerProps?: IBoxComponentProps;
}

type ITextProps = ICommonProps & {
  type: "text";
  value: string;
} & Omit<IDisplayTextProps, "children">;

type ICurrencyProps = ICommonProps & {
  type: "currency";
} & IDisplayCurrencyProps;

export type IInfoBlockProps = ITextProps | ICurrencyProps;

const InfoBlock = ({
  label,
  type,
  labelProps,
  containerProps,
  ...props
}: IInfoBlockProps) => {
  const renderComponent = useMemo(() => {
    switch (type) {
      case "text":
        const { value, ...rest } = props as ITextProps;
        return (
          <DisplayText {...rest} color="textSecondary">
            {value}
          </DisplayText>
        );
      case "currency":
        return (
          <DisplayCurrency
            color={"textSecondary"}
            {...(props as ICurrencyProps)}
          />
        );
      default:
        return null;
    }
  }, [props, type]);

  return (
    <Box flexDirection="column" alignItems="center" {...containerProps}>
      <DisplayText color="textSecondary" {...labelProps}>
        {label}
      </DisplayText>
      {renderComponent}
    </Box>
  );
};

export default InfoBlock;
