import { Redirect } from "expo-router";
import { Routes } from "@/Routes";

export default function MainIndex() {
  return <Redirect href={Routes.ACCOUNTS_MAIN} />;
}
