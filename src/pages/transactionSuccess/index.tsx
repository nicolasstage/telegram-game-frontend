import { GradientButton, GradientSquareButton } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import { ReadableAssetType, useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

const TransactionSuccess = () => {
  const { setRouter, buyItem, transferTokenDetails } = useGameContext();

  const { t } = useTranslation();

  return (
    <PageWrapper margin="12px 16px 88px 16px" vhGap="1.8vh" centralizeVertically>
      <FlexDiv $direction="column" $gap="10vh" $padding="0 8px">
        <FlexDiv $direction="column" $gap="40px">
          <FlexDiv $direction="column" $gap="24px">
            <Image src={Img.TransactionCheckImg} width={32} height={32} alt="" />

            <Div>
              <P $fontSize="36px">{t("transaction.title1")}</P>
              <P $fontSize="36px" $color="#79F8FF">
                {t("transaction.title2")}
              </P>
            </Div>
          </FlexDiv>

          <Div>
            <P>{t("transaction.summary")}</P>
            <Div
              $background="#262626"
              $padding="20px"
              $radius="16px"
              $margin="10px 0 0 0"
            >
              <FlexDiv $justify="space-between">
                <P $fontSize="14px">{t("transaction.sent")}</P>
                <P $fontSize="14px">
                  {buyItem?.price} {ReadableAssetType[transferTokenDetails ? transferTokenDetails.assetName : 'cCNTP']}
                </P>
              </FlexDiv>
              <FlexDiv $justify="space-between" $margin="10px 0">
                <P $fontSize="14px">{t("transaction.gasFee")}</P>
                <P $fontSize="14px">{transferTokenDetails?.gasFee} $CONET</P>
              </FlexDiv>
            </Div>
          </Div>
        </FlexDiv>

        <FlexDiv
          $justify="center"
          $direction="column"
          $align="center"
          $gap="8px"
        >
          {buyItem?.buyTitle ? (
            <GradientSquareButton width="264px" radius="16px" onClick={() => setRouter?.("/gameitem")}>
              {t("transaction.backToItems")}
            </GradientSquareButton>
          ) : buyItem?.send ? (
            <GradientSquareButton width="264px" radius="16px" onClick={() => setRouter?.("/wallet")}>
              {t("transaction.backToWallet")}
            </GradientSquareButton>
          ) : (
            <GradientSquareButton width="264px" radius="16px" onClick={() => setRouter?.("/skinstore")}>
              {t("transaction.backToSkinsStore")}
            </GradientSquareButton>
          )}

          <FlexDiv $justify="center" $align="center" $gap="5px">
            <Image src={Img.SecureImg} width={11} height={14} alt="" />
            <P $fontSize="11px" $color="#FFFFFF">
              {t("transaction.securePayment")}
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default TransactionSuccess;
