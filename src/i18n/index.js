import { api, configured } from "../lib/portfolioApi";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./locales/uz";
import ru from "./locales/ru";
import en from "./locales/en";

const STORAGE_KEY = "portfolio_lang";

const savedLang = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
})();

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: savedLang || "uz",
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignore storage errors */
  }
});

if(configured && !window.location.pathname.startsWith("/admin")){
 api("/rest/v1/portfolio_content?select=section,content").then(rows=>{
  for(const row of rows) for(const lang of ["uz","ru","en"]){
   if(row.content?.[lang]) i18n.addResourceBundle(lang,"translation",{[row.section]:row.content[lang]},true,true);
  }
  i18n.emit("languageChanged",i18n.language);
 }).catch(console.error);
}
export default i18n;
