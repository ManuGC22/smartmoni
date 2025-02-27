import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "expo-router";
import { Routes } from "@/Routes";
import GoogleAuth from "@/Services/GoogleAuth";
import { IUser } from "@/Types";
import UserInactivity from "react-native-user-inactivity";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

interface IAuthContext {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  currentUser: IUser | null;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  currentUser: null,
  loading: false,
});

interface IProviderProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProviderProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const isLoggedIn = useMemo(() => Boolean(currentUser), [currentUser]);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        setLoading(true);
        const isSignedIn = await GoogleAuth.checkIsSignedIn();

        if (isSignedIn) {
          const user = await GoogleAuth.getCurrentUser();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error checking sign-in status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSignInStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(Routes.MAIN_STACK);
    } else {
      router.replace(Routes.AUTH_LOGIN);
    }
  }, [isLoggedIn, router]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      const userInfo = await GoogleAuth.signIn();
      setCurrentUser(userInfo.data);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await GoogleAuth.signOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      currentUser,
      loading,
    }),
    [isLoggedIn, login, logout, currentUser, loading],
  );

  return (
    <UserInactivity
      timeForInactivity={INACTIVITY_TIMEOUT}
      onAction={(isActive) => {
        if (!isActive && isLoggedIn) {
          logout();
        }
      }}
      style={{ flex: 1 }}
    >
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </UserInactivity>
  );
};

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};
