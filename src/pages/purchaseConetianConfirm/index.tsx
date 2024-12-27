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

  const {
    setRouter,
    conetianPurchaseDetails,
    profile,
    setConetianPurchaseDetails,
    setBuyItem,
  } = useGameContext();

  useEffect(() => {
    function changeCoinImage(value: any) {
      switch (value) {
        case "bnb":
          setCoinImage(Img.BnbIcon);
          break;
        case "usdt":
          setCoinImage(Img.UsdtIcon);
          break;
        default:
          setCoinImage(Img.UsdtIcon);
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

        const nativeBalanceResponse = await fetchGetNativeBalance(
          profile?.keyID
        );

        let nativeBalance = null
        if (conetianPurchaseDetails?.selectedCoin)
          nativeBalance = profile.tokens[conetianPurchaseDetails.selectedCoin]?.balance

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
  }, []);

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text="Confirm your order" to="/purchaseConetian" />

      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Paying with</P>
        <FlexDiv
          $background="#262626"
          $justify="space-between"
          $radius="16px"
          $align="center"
          $padding="15px 20px"
          $gap="10px"
        >
          <FlexDiv $gap="10px" $align="center">
            <Image src={coinImage} width={20} height={20} alt="" />
            <P $fontSize="16px">{conetianPurchaseDetails?.selectedCoin.toUpperCase()}</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Wallet</P>
        <FlexDiv
          $background="#262626"
          $radius="16px"
          $align="center"
          $padding="5px 20px"
          $gap="10px"
        >
          <Image src={Img.BioDefaultImg} width={24} height={24} alt="" />
          <FlexDiv $direction="column">
            <P $fontSize="14px">Anonymous User</P>
            <P $fontSize="12px" $color="#989899">
              {profile?.keyID &&
                slice(profile?.keyID)}
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="5px" $margin="0 0 50px 0">
        <FlexDiv $justify="space-between">
          <P>Summary</P>
          <FlexDiv $align="center" $gap="5px">
            <Image src={Img?.AlarmImg} width={16} height={16} alt="" />

            <P $fontSize="12px" $color="#CACACC">
              Quote updates in {quoteSecs}s
            </P>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv
          $background="#262626"
          $radius="16px"
          $align="center"
          $padding="5px 20px"
          $gap="10px"
          $direction="column"
        >
          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">
              CoNETian NFT
            </P>

            <P $fontSize="14px">
              {conetianPurchaseDetails?.total} {conetianPurchaseDetails?.selectedCoin.toUpperCase()}
            </P>
          </FlexDiv>

          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">
              Gas Fee
            </P>

            <P $fontSize="14px">
              &lt; {conetianPurchaseDetails?.gasFee || 0} {conetianPurchaseDetails?.selectedCoin.toUpperCase()}
            </P>
          </FlexDiv>

          <S.Split style={{ width: "100%" }} />

          <FlexDiv $justify="space-between" $width="100%">
            <P $fontSize="14px">
              Total
            </P>

            <P $fontSize="14px">
              {Number(conetianPurchaseDetails?.total) + Number(conetianPurchaseDetails?.gasFee || 0)} {conetianPurchaseDetails?.selectedCoin.toUpperCase()}
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
            Insufficient Gas Fee
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
            Error getting gas fee. Please try again later.
          </p>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $direction="column" $gap="10px">
        <GradientButton
          width="100%"
          disabled={hasInsufficientFee || errorGettingGasFee}
          onClick={() => {
            if (hasInsufficientFee || errorGettingGasFee) return;
            setRouter?.("/purchaseConetianProgress");
          }}
        >
          Confirm payment
        </GradientButton>

        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img?.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            Secure payment
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetianConfirm;
