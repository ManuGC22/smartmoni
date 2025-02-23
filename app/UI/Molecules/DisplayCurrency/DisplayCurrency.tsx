import { DisplayText, IDisplayTextProps } from "@/UI/Atoms";

export interface IDisplayCurrencyProps
  extends Omit<IDisplayTextProps, "children"> {
  value: number;
  locale?: string;
  currency?: string;
}

const DisplayCurrency = ({
  value,
  locale = "es-DO",
  currency = "DOP",
  ...props
}: IDisplayCurrencyProps): JSX.Element => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(value);

  return <DisplayText {...props}>{formattedValue}</DisplayText>;
};

export default DisplayCurrency;
