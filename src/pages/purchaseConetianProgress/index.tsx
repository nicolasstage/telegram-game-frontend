import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import Image from "next/image";
import "./index.css";
import { Button } from "@/components/button";
import { useEffect } from "react";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Loading from "@/components/loading";
import { fetchPurchaseConetian } from "@/API/getData";
import { useTranslation } from "react-i18next";

const PurchaseConetianProgress = () => {
  const { t } = useTranslation();

  const { setRouter, profile, conetianPurchaseDetails } = useGameContext();
  useEffect(() => {
    const purchaseConetian = async () => {
      if (conetianPurchaseDetails?.amount &&
        conetianPurchaseDetails?.selectedCoin &&
        conetianPurchaseDetails?.total) {
        const response = await fetchPurchaseConetian(
          profile?.keyID,
          Number(conetianPurchaseDetails?.amount),
          conetianPurchaseDetails?.selectedCoin,
          conetianPurchaseDetails?.total,
          conetianPurchaseDetails?.agentWallet
        );

        if (response) {
          setRouter?.("/purchaseConetianSuccess");
        }
      }
    };

    purchaseConetian();
  }, []);

  return (
    <PageWrapper>
      <Div $padding="0 10px">
        <P $fontSize="24px">{t('purchaseConetianProgress.title')}</P>
        <P $fontSize="14px" $color="#CACACC" $width="321px" $weight="400">
          {t('purchaseConetianProgress.subtitle')}
        </P>
      </Div>

      <Loading />

      <FlexDiv $justify="center">
        <P $fontSize="14px" $align="center" $width="178px">
          {t('purchaseConetianProgress.pleaseWait')}
        </P>
      </FlexDiv>
      <FlexDiv
        $justify="center"
        $direction="column"
        $align="center"
        $gap="5px"
        $margin="50px 0 100px 0"
      >
        <Button
          $width="296px"
          $height="56px"
          $background="#363E59"
          $radius="16px"
        >
          <FlexDiv $align="center" $gap="5px">
            <Image
              src={Img.ProgressImg}
              width={21}
              height={20}
              alt=""
              className="progress"
            />
            <P>{t("purchaseConetianProgress.processing")}</P>
          </FlexDiv>
        </Button>
        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            {t("purchaseConetianProgress.securePayment")}
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetianProgress;
