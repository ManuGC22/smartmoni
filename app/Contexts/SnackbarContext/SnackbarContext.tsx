import Snackbar from "@/UI/Molecules/Snackbar";
import { EventUtils } from "@/Utils";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type SnackbarType = { text: string };

const SnackbarContext = createContext<{
  showSnackbar: (s: SnackbarType) => void;
}>({
  showSnackbar: () => {},
});

export interface ISnackbarProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ISnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarType | null>(null);

  const showSnackbarHandler = useCallback((props: SnackbarType) => {
    setSnackbar(props);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar: showSnackbarHandler }}>
      {children}
      {snackbar && (
        <Snackbar visible onDismiss={EventUtils.callEvent(setSnackbar, null)}>
          {snackbar.text}
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar was called outside SnackbarProvider");
  }

  const { showSnackbar } = context;

  return showSnackbar;
};
