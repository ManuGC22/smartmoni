import { Redirect } from "expo-router";
import { Routes } from "@/Routes";

const AppIndex = () => {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return <Redirect href={Routes.MAIN_STACK} />;
  }

  return <Redirect href={Routes.AUTH_STACK} />;
};

export default AppIndex;
