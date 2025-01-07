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
import { fetchTransferNft, fetchTransferToken } from "@/API/getData";
import { useTranslation } from "react-i18next";

const ConfirmProgress = () => {
  const { t } = useTranslation();
  const { setRouter, profile, transferTokenDetails } = useGameContext();

  useEffect(() => {
    const transferToken = async () => {
      const response =
        transferTokenDetails?.assetName &&
        transferTokenDetails?.toAddress &&
        (await fetchTransferToken(
          Number(transferTokenDetails?.amount),
          profile?.keyID,
          transferTokenDetails?.assetName,
          transferTokenDetails?.toAddress
        ));

      if (response) {
        setRouter?.("/transactionsuccess");
      }
    };

    const transferNft = async () => {
      const response =
        transferTokenDetails?.assetName &&
        transferTokenDetails?.toAddress &&
        (await fetchTransferNft(
          Number(transferTokenDetails?.amount),
          profile?.keyID,
          transferTokenDetails?.assetName,
          transferTokenDetails?.toAddress
        ));

      if (response) {
        setRouter?.("/transactionsuccess");
      }
    };

    switch (transferTokenDetails?.assetName.toLowerCase()) {
      case "ccntp": {
        transferToken();
        break;
      }
      default: {
        transferNft();
        break;
      }
    }
  }, []);

  return (
    <PageWrapper margin="12px 16px 88px 16px" vhGap="1.8vh" centralizeVertically>
      <FlexDiv $direction="column" $gap="10vh" $padding="0 8px">
        <FlexDiv $direction="column" $gap="40px">
          <FlexDiv $direction="column" $gap="24px">
            <P $fontSize="24px">{t("components.progress.transactionInProgress")}</P>
            <P $fontSize="14px" $color="#CACACC" $width="321px" $weight="400">
              {t("components.progress.transactionDescription")}
            </P>
          </FlexDiv>

          <Loading />

          <FlexDiv $justify="center">
            <P $fontSize="14px" $align="center" $width="178px">
              {t("components.progress.pleaseWait")}
            </P>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv
          $justify="center"
          $direction="column"
          $align="center"
          $gap="5px"
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
                alt={t("components.progress.progressImageAlt")}
                className="progress"
              />
              <P>{t("components.progress.processing")}</P>
            </FlexDiv>
          </Button>

          <FlexDiv $justify="center" $align="center" $gap="5px">
            <Image
              src={Img.SecureImg}
              width={11}
              height={14}
              alt={t("components.progress.secureImageAlt")}
            />
            <P $fontSize="11px" $color="#FFFFFF">
              {t("components.progress.securePayment")}
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default ConfirmProgress;
