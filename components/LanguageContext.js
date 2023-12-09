import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const storedLanguage = Cookies.get('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    Cookies.set('language', newLanguage, { expires: 7 });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
