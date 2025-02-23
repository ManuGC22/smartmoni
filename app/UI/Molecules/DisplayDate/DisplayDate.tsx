import { DisplayText, IDisplayTextProps } from "@/UI/Atoms";
import { DateModule } from "@/Modules/Date";

export interface IDisplayDateProps extends Omit<IDisplayTextProps, "children"> {
  children: string | Date;
  format?: string;
}

const DisplayDate = ({
  children,
  format = "L",
  ...props
}: IDisplayDateProps) => {
  return (
    <DisplayText {...props}>
      {DateModule.str2DateFormat(children, format)}
    </DisplayText>
  );
};

export default DisplayDate;
