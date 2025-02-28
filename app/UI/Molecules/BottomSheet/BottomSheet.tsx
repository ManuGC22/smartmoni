import GBottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyledUtils } from "@/Utils";
import { IBoxComponentProps } from "@/Types";

export interface IBottomSheetProps {
  children: React.ReactNode;
  containerProps?: IBoxComponentProps;
  sheetRef: React.RefObject<GBottomSheet>;
  onChange?: (index: number) => void;
}

const StyledBottomSheetView = StyledUtils.styled(BottomSheetView);

const BottomSheet = ({
  children,
  containerProps,
  sheetRef,
  onChange,
}: IBottomSheetProps) => {
  return (
    <GBottomSheet
      ref={sheetRef}
      snapPoints={["1%", "25%", "50%", "75%", "100%"]}
      index={3} // This makes it hidden by default
      enablePanDownToClose={true}
      onChange={onChange}
    >
      <StyledBottomSheetView {...containerProps}>
        {children}
      </StyledBottomSheetView>
    </GBottomSheet>
  );
};

export default BottomSheet;
