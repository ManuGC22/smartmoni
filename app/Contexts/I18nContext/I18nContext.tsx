import { i18n } from "@/Modules/Internationalization";
import { TranslateOptions, Scope } from "i18n-js/typings";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

interface II18nContext {
  locale: string;
  setLocale: (locale: string) => void;
  t: <T = string>(scope: Scope, options?: TranslateOptions) => string | T;
}

const I18nContext = createContext<II18nContext>({
  locale: "es",
  setLocale: () => {},
  t: () => "",
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>("es");

  useEffect(() => {
    const loadLocale = async () => {
      // const defaultLocale = Localization.getLocales()[0].languageCode || "es";
      const defaultLocale = "es";
      setLocale(defaultLocale);
      i18n.locale = defaultLocale;
    };
    loadLocale();
  }, []);

  const setLanguage = useCallback(
    async (newLocale: string) => {
      setLocale(newLocale);
      i18n.locale = newLocale;
    },
    [setLocale],
  );

  const t = useCallback(
    <T extends string>(scope: Scope, options?: TranslateOptions) => {
      return i18n.t<T>(scope, options);
    },
    [],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale: setLanguage,
      t,
    }),
    [locale, setLanguage, t],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useLocalization = (): II18nContext => useContext(I18nContext);
