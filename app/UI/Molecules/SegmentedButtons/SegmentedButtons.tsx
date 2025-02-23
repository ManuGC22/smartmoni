import {
  SegmentedButtons as RNSegmentedButtons,
  SegmentedButtonsProps,
} from "react-native-paper";

export type ISegmentedButtonsProps = {} & SegmentedButtonsProps;

const SegmentedButtons = ({ ...props }: ISegmentedButtonsProps) => {
  return <RNSegmentedButtons {...props} />;
};

export default SegmentedButtons;
