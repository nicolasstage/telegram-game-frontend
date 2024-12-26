"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode, useEffect,
  useCallback
} from "react";
import { useTranslation } from 'react-i18next';
import { parseQueryParams } from '../parseQueryParams';

interface IUserLanguage{
  currentLanguage: string;
  changeLanguage: (value: string) => void;
}

const LanguageContext = createContext<IUserLanguage>({
  currentLanguage: "zh-CN",
  changeLanguage: (language: string) => {},
});

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  return context;
}

type LanguageProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en-US");
  const { i18n } = useTranslation()

  const changeLanguage = useCallback((language: string) => {
    if(language === "en-US" || language === "zh-CN"){
      i18n.changeLanguage(language)
      setCurrentLanguage(language);
    }
  }, [i18n]);

  useEffect(() => {
    const queryParams = parseQueryParams(window.location.search);

    if (window.location.search && queryParams) {
      const langPreference = queryParams.get("lang");
      if (langPreference) {
        changeLanguage(langPreference)
      };
    }
  }, [currentLanguage, changeLanguage])

  return (
    <LanguageContext.Provider
      value={{currentLanguage, changeLanguage}}
    >
      {children}
    </LanguageContext.Provider>
  );
}
