import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "./locales/en.json";
import es from "./locales/es.json";

const translations = {
  en: en,
  es: es,
};
const i18n = new I18n(translations);

// i18n.locale = Localization.getLocales()[0].languageCode || "es";
i18n.locale = "es";

i18n.enableFallback = true;

export default i18n;
