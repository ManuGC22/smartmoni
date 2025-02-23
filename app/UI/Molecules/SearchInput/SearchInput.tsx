import { debounce } from "radash";
import { TextField, ITextFieldProps } from "@/UI/Atoms";
import { useCallback } from "react";

export interface ISearchInputProps extends ITextFieldProps {
  placeholder?: string;
  onSearchTermChange: (text: string) => void;
}

const SearchInput = ({
  placeholder,
  onSearchTermChange,
  ...props
}: ISearchInputProps) => {
  const handleOnSearchTermChangeDebounced = debounce(
    {
      delay: 500,
    },
    (text: string) => {
      onSearchTermChange(text);
    },
  );

  const handleOnChangeText = useCallback(
    (text: string) => {
      handleOnSearchTermChangeDebounced(text);
    },
    [handleOnSearchTermChangeDebounced],
  );

  return (
    <TextField
      {...props}
      placeholder={placeholder}
      onChangeText={handleOnChangeText}
      leftIcon="Search"
    />
  );
};

export default SearchInput;
