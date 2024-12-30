import { GradientButton } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import { ReadableAssetType, useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const PurchaseConetianSuccess = () => {
  const { t } = useTranslation()

  const { setRouter, conetianPurchaseDetails } = useGameContext();

  const getFriendlyCoinName = (selectedCoin: any) => {
    switch (selectedCoin) {
      case "bnb":
        return 'BNB'
      case "wusdt":
        return 'USDT'
      default:
        return 'BNB'
    }
  };

  const getNativeCoin = (selectedCoin: any) => {
    switch (selectedCoin) {
      case "bnb":
      case "wusdt":
      default:
        return 'bnb'
    }
  };

  return (
    <PageWrapper>
      <Div $padding="0 10px">
        <Image src={Img.TransactionCheckImg} width={32} height={32} alt="" />
        <Div>
          <P $fontSize="45px">{t('purchaseConetianSuccess.title1')}</P>
          <P $fontSize="45px" $color="#79F8FF">
            {t('purchaseConetianSuccess.title2')}
          </P>
        </Div>
        <Div>
          <P>{t('purchaseConetianSuccess.summary')}</P>
          <Div
            $background="#262626"
            $padding="20px"
            $radius="16px"
            $margin="10px 0 0 0"
          >
            <FlexDiv $justify="space-between">
              <P $fontSize="14px">{t('purchaseConetianSuccess.conetianNft')}</P>
              <P $fontSize="14px">{conetianPurchaseDetails?.total} {getFriendlyCoinName(conetianPurchaseDetails?.selectedCoin)}</P>
            </FlexDiv>
            <FlexDiv $justify="space-between" $margin="10px 0">
              <P $fontSize="14px">{t('purchaseConetianSuccess.gasFee')}</P>
              <P $fontSize="14px">{conetianPurchaseDetails?.gasFee} {getNativeCoin(conetianPurchaseDetails?.selectedCoin).toUpperCase()} </P>
            </FlexDiv>
          </Div>
        </Div>

        <FlexDiv
          $width="100%"
          $justify="center"
          $direction="column"
          $align="center"
          $margin="50px 0 100px 0"
          $gap="5px"
        >
          <GradientButton
            width="100%"
            height="56px"
            onClick={() => setRouter?.("/")}>
            {t('purchaseConetianSuccess.backToHome')}
          </GradientButton>

          <FlexDiv $justify="center" $align="center" $gap="5px">
            <Image src={Img.SecureImg} width={11} height={14} alt="" />
            <P $fontSize="11px" $color="#FFFFFF">
              {t('purchaseConetianSuccess.securePayment')}
            </P>
          </FlexDiv>
        </FlexDiv>
      </Div>
    </PageWrapper>
  );
};

export default PurchaseConetianSuccess;
