import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import th from "./th/translation.json";

const resources = {
  en: { translation: en },
  th: { translation: th },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// import React from 'react';
// import { useTranslation } from 'react-i18next';

// function App() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (language: string) => {
//     i18n.changeLanguage(language);
//   };

//   return (
//     <div>
//       <h1>{t('welcome')}</h1>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('th')}>ภาษาไทย</button>
//     </div>
//   );
// }

// export default App;