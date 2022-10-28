import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const initialValue = localStorage.getItem("language") || "uz";

  const [language, setLanguage] = useState(initialValue);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
