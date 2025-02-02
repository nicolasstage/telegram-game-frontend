import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import BackButton from "@/components/backButton";
import { GradientButton } from "@/components/button";
import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { Img } from "@/utilitiy/images";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import { formatToken, slice } from "@/utilitiy/functions";
import { fetchPrePurchase, fetchGetNativeBalance } from "@/API/getData";
import { useTranslation } from "react-i18next";

const S = {
  Split: styled.div`
    background-color: #989899;
    height: 1px;
  `,
};

const PurchaseConetianConfirm = () => {
  const [quoteSecs, setQuoteSecs] = useState<number>(60);
  const [hasInsufficientFee, setHasInsufficientFee] = useState<boolean>(false);
  const [coinImage, setCoinImage] = useState<string>("");
  const [errorGettingGasFee, setErrorGettingGasFee] = useState<boolean>(false);

  const { t } = useTranslation();

  const {
    setRouter,
    conetianPurchaseDetails,
    profile,
    setConetianPurchaseDetails,
    setBuyItem,
  } = useGameContext();

  const getNativeCoin = (selectedCoin: any) => {
    switch (selectedCoin) {
      case "bnb":
      case "wusdt":
      default:
        return 'bnb';
    }
  };

  const getFriendlyCoinName = (selectedCoin: any) => {
    switch (selectedCoin) {
      case "bnb":
        return 'BNB';
      case "wusdt":
        return 'USDT';
      default:
        return 'BNB';
    }
  };

  useEffect(() => {
    function changeCoinImage(value: any) {
      switch (value) {
        case "bnb":
          setCoinImage(Img.BnbIcon);
          break;
        case "wusdt":
          setCoinImage(Img.UsdtBnbIcon);
          break;
        default:
          setCoinImage(Img.UsdtBnbIcon);
          break;
      }
    }

    const getGasFee = async () => {
      const gasResponse =
        conetianPurchaseDetails?.total &&
        conetianPurchaseDetails?.selectedCoin &&
        (await fetchPrePurchase(
          profile?.keyID,
          conetianPurchaseDetails?.total,
          conetianPurchaseDetails?.selectedCoin
        ));

      setQuoteSecs(60);

      if (gasResponse[0] && gasResponse[1]) {
        setConetianPurchaseDetails?.((prevState: any) => ({
          ...prevState,
          gasPrice: gasResponse[0],
          gasFee: gasResponse[1],
        }));

        const nativeCoin = getNativeCoin(conetianPurchaseDetails?.selectedCoin);

        let nativeBalance = null;
        if (conetianPurchaseDetails?.selectedCoin)
          nativeBalance = profile.tokens[nativeCoin]?.balance;

        if (!nativeBalance || nativeBalance === '0' || gasResponse[1] > Number(nativeBalance)) setHasInsufficientFee(true);

        setErrorGettingGasFee(false);
      } else {
        console.error("Error to fetch gas fee");
        setErrorGettingGasFee(true);
      }

      setBuyItem?.({ price: conetianPurchaseDetails?.total, send: true });
    };

    getGasFee();

    const interval = setInterval(getGasFee, 60000);
    const countdown = setInterval(() => {
      setQuoteSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    changeCoinImage(conetianPurchaseDetails?.selectedCoin);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [conetianPurchaseDetails]);

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text={t('purchaseConetianConfirm.confirmOrder')} to="/purchaseConetian" />

      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">{t('purchaseConetianConfirm.payingWith')}</P>
        <FlexDiv
          $background="#262626"
          $justify="space-between"
          $radius="16px"
          $align="center"
          $padding="16px 20px"
          $gap="10px"
        >
          <FlexDiv $gap="10px" $align="center">
            <Image src={coinImage} width={24} height={24} alt="" />
            <P $fontSize="16px">{getFriendlyCoinName(conetianPurchaseDetails?.selectedCoin)}</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">{t('purchaseConetianConfirm.wallet')}</P>
        <FlexDiv
          $background="#262626"
          $radius="16px"
          $align="center"
          $padding="16px 20px"
          $gap="10px"
        >
          <Image src={Img.BioDefaultImg} width={24} height={24} alt="" />
          <FlexDiv $direction="column">
            <P $fontSize="14px">{t('purchaseConetianConfirm.anonymousUser')}</P>
            <P $fontSize="12px" $color="#989899">
              {profile?.keyID &&
                slice(profile?.keyID)}
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="5px" $margin="0 0 50px 0">
        <FlexDiv $justify="space-between">
          <P>{t('purchaseConetianConfirm.summary')}</P>
          <FlexDiv $align="center" $gap="5px">
            <Image src={Img?.AlarmImg} width={16} height={16} alt="" />
            <P $fontSize="12px" $color="#CACACC">
              {t('purchaseConetianConfirm.quoteUpdates')} {quoteSecs}s
            </P>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv
          $background="#262626"
          $radius="16px"
          $align="center"
          $padding="16px"
          $gap="10px"
          $direction="column"
        >
          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">{t('purchaseConetianConfirm.conetianNft')}</P>
            <P $fontSize="14px">
              {conetianPurchaseDetails?.total} {getFriendlyCoinName(conetianPurchaseDetails?.selectedCoin)}
            </P>
          </FlexDiv>

          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">{t('purchaseConetianConfirm.gasFee')}</P>
            <P $fontSize="14px">
              &lt; {conetianPurchaseDetails?.gasFee || 0} {getNativeCoin(conetianPurchaseDetails?.selectedCoin).toUpperCase()}
            </P>
          </FlexDiv>

          <S.Split style={{ width: "100%" }} />

          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">{t('purchaseConetianConfirm.total')}</P>
            <P $fontSize="14px">
              {Number(conetianPurchaseDetails?.total)} {getFriendlyCoinName(conetianPurchaseDetails?.selectedCoin)} + {Number(conetianPurchaseDetails?.gasFee || 0)} {getNativeCoin(conetianPurchaseDetails?.selectedCoin).toUpperCase()}
            </P>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv $justify="center" $margin="10px">
          <p
            style={{
              fontSize: "14px",
              color: "#C70039",
              display: hasInsufficientFee ? "block" : "none",
            }}
          >
            {t('purchaseConetianConfirm.insufficientGasFee')}
          </p>
        </FlexDiv>

        <FlexDiv $justify="center" $margin="10px">
          <p
            style={{
              fontSize: "14px",
              color: "#C70039",
              display: errorGettingGasFee ? "block" : "none",
            }}
          >
            {t('purchaseConetianConfirm.errorGettingGasFee')}
          </p>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="10px">
        <GradientButton
          width="100%"
          height="56px"
          disabled={hasInsufficientFee || errorGettingGasFee}
          onClick={() => {
            if (hasInsufficientFee || errorGettingGasFee) return;
            setRouter?.("/purchaseConetianProgress");
          }}
        >
          {t('purchaseConetianConfirm.confirmPayment')}
        </GradientButton>

        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img?.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            {t('purchaseConetianConfirm.securePayment')}
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetianConfirm;
