import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_CS } from "./localization.cs";
import { TRANSLATIONS_EN } from "./localization.en";
 
i18n
 //.use(LanguageDetector)
 .use(initReactI18next)
 .init({
   resources: {
     en: {
       translation: TRANSLATIONS_EN
     },
     cs: {
       translation: TRANSLATIONS_CS
     }
   }
 });
 
i18n.changeLanguage("cs");