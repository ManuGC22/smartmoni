import { ThemeProvider } from "@shopify/restyle";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Theme, RestyledTheme } from "@/Core/Theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={RestyledTheme}>
        <PaperProvider theme={Theme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
