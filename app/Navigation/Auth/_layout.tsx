import { Box, DisplayText } from "@/UI/Atoms";
import { Stack } from "expo-router";
import { useRestyleTheme } from "@/Hooks";
import { I18nContext } from "@/Contexts";
export default function AuthLayout() {
  const { getColor } = useRestyleTheme();
  const { t } = I18nContext.useLocalization();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <Box flexDirection="row" justifyContent={"center"}>
            <DisplayText variant="subTitleBold" color="white">
              {t("Login.welcome")}
            </DisplayText>
          </Box>
        ),
        headerStyle: {
          backgroundColor: getColor("primary"),
        },
        contentStyle: {
          backgroundColor: getColor("background"),
        },
      }}
      initialRouteName={"Login"}
    />
  );
}
