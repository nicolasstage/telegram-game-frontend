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
import { fetchEstimateGas, fetchEstimateGasForNftContract, fetchGetNativeBalance } from "@/API/getData";
import { SendImg } from "@/utilitiy/send";

const S = {
  Split: styled.div`
    background-color: #989899;
    height: 1px;
  `,
};

const renderAssetImage = (assetName: string = 'ccntp') => {
  switch (assetName) {
    case 'ticket':
      return SendImg.TicketImg;
    default:
      return SendImg.CntpImg;
  }
}

const SendTicketConfirm = () => {
  const [quoteSecs, setQuoteSecs] = useState<number>(60);
  const [hasInsufficientFee, setHasInsufficientFee] = useState<boolean>(false);

  const {
    setRouter,
    transferTokenDetails,
    profile,
    setTransferTokenDetails,
    setBuyItem,
  } = useGameContext();

  useEffect(() => {
    const getGasFee = async () => {
      const gasResponse =
        transferTokenDetails?.amount &&
        transferTokenDetails?.assetName &&
        transferTokenDetails?.toAddress &&
        (await fetchEstimateGasForNftContract(
          transferTokenDetails?.amount,
          profile?.keyID,
          transferTokenDetails?.assetName,
          transferTokenDetails?.toAddress,
        ));

      setQuoteSecs(60);
      if (gasResponse[0] && gasResponse[1]) {
        setTransferTokenDetails?.((prevState: any) => ({
          ...prevState,
          gasPrice: gasResponse[0],
          gasFee: gasResponse[1],
        }));
        const nativeBalanceResponse = await fetchGetNativeBalance(
          profile?.keyID
        );
        const nativeBalance = formatToken(nativeBalanceResponse[0]);

        if (gasResponse[1] > Number(nativeBalance)) setHasInsufficientFee(true);
      } else {
        console.error("Error to fetch gas fee");
      }

      setBuyItem?.({ price: transferTokenDetails?.amount, send: true });
    };

    getGasFee();

    const interval = setInterval(getGasFee, 60000);
    const countdown = setInterval(() => {
      setQuoteSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text="Confirm your order" to="/sendTicket" />
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
              {transferTokenDetails?.toAddress &&
                slice(transferTokenDetails?.toAddress)}
            </P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="10px">
        <P $fontSize="16px">Sending</P>
        <FlexDiv
          $background="#262626"
          $justify="space-between"
          $radius="16px"
          $align="center"
          $padding="15px 20px"
          $gap="10px"
        >
          <FlexDiv $gap="10px" $align="center">
            <Image src={renderAssetImage(transferTokenDetails?.assetName.toLowerCase())} width={20} height={20} alt="" />
            <P $fontSize="16px">Ticket</P>
          </FlexDiv>
          <P>{transferTokenDetails?.amount}</P>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="5px" $margin="0 0 50px 0">
        <FlexDiv $justify="space-between">
          <P>Tax</P>
          <FlexDiv $align="center" $gap="5px">
            <Image src={Img?.AlarmImg} width={16} height={16} alt="" />
            <P $fontSize="12px" $color="#CACACC">
              Quote updates in {quoteSecs}s
            </P>
          </FlexDiv>
        </FlexDiv>
        <S.Split />
        <FlexDiv $justify="space-between">
          <P $fontSize="14px" $color="#989899">
            Estimated Fee
          </P>
          <P $fontSize="14px" $color="#989899">
            &lt; {transferTokenDetails?.gasFee} $CONET
          </P>
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
      </FlexDiv>
      <FlexDiv $direction="column" $gap="10px">
        <GradientButton
          width="100%"
          onClick={() => {
            if (hasInsufficientFee) return;
            setRouter?.("/confirmprogress");
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

export default SendTicketConfirm;
