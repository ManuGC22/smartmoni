import { TextField, ITextFieldProps } from "@/UI/Atoms";
import { useCallback } from "react";

export interface INumericFieldProps extends ITextFieldProps {}

const NumericField = ({ onChangeText, ...props }: INumericFieldProps) => {
  const handleOnChangeText = useCallback(
    (text: string) => {
      const numericText = text.replace(/[^0-9]/g, "");
      onChangeText?.(numericText);
    },
    [onChangeText],
  );

  return (
    <TextField
      {...props}
      onChangeText={handleOnChangeText}
      keyboardType="numeric"
    />
  );
};

export default NumericField;
