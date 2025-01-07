"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { aboutEn, aboutZh } from "./translations/about";
import { settingsEn, settingsZh } from "./translations/settings";
import { MyWalletEn, MyWalletZh } from "./translations/myWallet";
import { HomeEn, HomeZh } from "./translations/home";
import { EarnEn, EarnZh } from "./translations/earn";
import { componentsEn, componentsZh } from "./translations/components";
import { sendTicketEn, sendTicketZh } from "./translations/sendTicket";
import { sendCntpEn, sendCntpZh } from "./translations/sendCntp";
import { shoppingEn, shoppingZh } from "./translations/shopping";
import { skinEn, skinZh } from "./translations/skin";
import { transactionEn, transactionZh } from "./translations/transaction";
import { purchaseConetian } from "./API";
import {
  purchaseConetianConfirmEn,
  purchaseConetianConfirmZh,
  purchaseConetianEn,
  purchaseConetianProgressEn,
  purchaseConetianProgressZh,
  purchaseConetianSuccessEn,
  purchaseConetianSuccessZh,
  purchaseConetianZh,
} from "./translations/purchaseConetian";
import { startEn, startZh } from "./translations/start";
import {
  sendNftConfirmEn,
  sendNftConfirmZh,
  sendNftEn,
  sendNftZh,
} from "./translations/sendNft";

const resources = {
  "en-US": {
    translation: {
      start: startEn,
      about: aboutEn,
      settings: settingsEn,
      wallet: MyWalletEn,
      home: HomeEn,
      earn: EarnEn,
      components: componentsEn,
      sendCntp: sendCntpEn,
      shopping: shoppingEn,
      skin: skinEn,
      transaction: transactionEn,
      purchaseConetian: purchaseConetianEn,
      purchaseConetianConfirm: purchaseConetianConfirmEn,
      purchaseConetianProgress: purchaseConetianProgressEn,
      purchaseConetianSuccess: purchaseConetianSuccessEn,
      sendNft: sendNftEn,
      sendNftConfirm: sendNftConfirmEn,
    },
  },
  "zh-CN": {
    translation: {
      start: startZh,
      about: aboutZh,
      settings: settingsZh,
      wallet: MyWalletZh,
      home: HomeZh,
      earn: EarnZh,
      components: componentsZh,
      sendCntp: sendCntpZh,
      shopping: shoppingZh,
      skin: skinZh,
      transaction: transactionZh,
      purchaseConetian: purchaseConetianZh,
      purchaseConetianConfirm: purchaseConetianConfirmZh,
      purchaseConetianProgress: purchaseConetianProgressZh,
      purchaseConetianSuccess: purchaseConetianSuccessZh,
      sendNft: sendNftZh,
      sendNftConfirm: sendNftConfirmZh,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
