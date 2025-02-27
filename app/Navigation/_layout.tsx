import { ThemeProvider } from "@shopify/restyle";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Theme, RestyledTheme } from "@/Core/Theme";
import { SnackbarContext, I18nContext, AuthContext } from "@/Contexts";
import { Slot } from "expo-router";

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
        <I18nContext.Provider>
          <PaperProvider theme={Theme}>
            <AuthContext.Provider>
              <SnackbarContext.Provider>
                <Slot />
              </SnackbarContext.Provider>
            </AuthContext.Provider>
          </PaperProvider>
        </I18nContext.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
