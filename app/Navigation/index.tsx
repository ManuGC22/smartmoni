import { Redirect } from "expo-router";
import { Routes } from "@/Routes";
import { AuthContext } from "@/Contexts";
const AppIndex = () => {
  const { isLoggedIn } = AuthContext.useAuth();

  if (isLoggedIn) {
    return <Redirect href={Routes.MAIN_STACK} />;
  }

  return <Redirect href={Routes.AUTH_LOGIN} />;
};

export default AppIndex;
