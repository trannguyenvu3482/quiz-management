import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/resources";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

i18n
  .on("failedLoading", (lng, ns, msg) => console.error(msg))
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(
    resourcesToBackend((language, namespace) =>
      import(`./locales/${language}/${namespace}.json`)
    )
  )
  .on("failedLoading", (lng, ns, msg) => console.error(msg))
  .init({
    debug: true,
    // resources,
    supportedLngs: ["en", "vi", "fr"],
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false, //   <---- this will do the magic
    },
  });

export default i18n;
