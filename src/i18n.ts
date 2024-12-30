"use client";
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import { aboutEn, aboutZh } from './translations/about';
import { settingsEn, settingsZh } from './translations/settings';
import { MyWalletEn, MyWalletZh } from './translations/myWallet';
import { HomeEn, HomeZh } from './translations/home';
import { EarnEn, EarnZh } from './translations/earn';
import { componentsEn, componentsZh } from './translations/components';
import { sendTicketEn, sendTicketZh } from './translations/sendTicket';
import { sendCntpEn, sendCntpZh } from './translations/sendCntp';
import { shoppingEn, shoppingZh } from './translations/shopping';
import { skinEn, skinZh } from './translations/skin';
import { transactionEn, transactionZh } from './translations/transaction';

const resources = {
  "en-US": {
    translation: {
      "about": aboutEn,
      "settings": settingsEn,
      "wallet": MyWalletEn,
      "home": HomeEn,
      "earn": EarnEn,
      "components": componentsEn,
      "sendCntp": sendCntpEn,
      "shopping": shoppingEn,
      "skin": skinEn,
      "transaction": transactionEn
    }
  },
  "zh-CN": {
    translation: {
      "about": aboutZh,
      "settings": settingsZh,
      "wallet": MyWalletZh,
      "home": HomeZh,
      "earn": EarnZh,
      "components": componentsZh,
      "sendCntp": sendCntpZh,
      "shopping": shoppingZh,
      "skin": skinZh,
      "transaction": transactionZh,
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
