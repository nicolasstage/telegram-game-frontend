import { GradientButton } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { Img } from "@/utilitiy/images";
import { ReadableAssetType, useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";

const PurchaseConetianSuccess = () => {
  const { setRouter, buyItem, conetianPurchaseDetails } = useGameContext();

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
          <P $fontSize="45px">The purchase </P>
          <P $fontSize="45px" $color="#79F8FF">
            was successful
          </P>
        </Div>
        <Div>
          <P>Summary</P>
          <Div
            $background="#262626"
            $padding="20px"
            $radius="16px"
            $margin="10px 0 0 0"
          >
            <FlexDiv $justify="space-between">
              <P $fontSize="14px">CoNETian NFT</P>
              <P $fontSize="14px">{conetianPurchaseDetails?.total} {getFriendlyCoinName(conetianPurchaseDetails?.selectedCoin)}</P>
            </FlexDiv>
            <FlexDiv $justify="space-between" $margin="10px 0">
              <P $fontSize="14px">GAS fee</P>
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
            Back to Home
          </GradientButton>

          <FlexDiv $justify="center" $align="center" $gap="5px">
            <Image src={Img.SecureImg} width={11} height={14} alt="" />
            <P $fontSize="11px" $color="#FFFFFF">
              Secure payment
            </P>
          </FlexDiv>
        </FlexDiv>
      </Div>
    </PageWrapper>
  );
};

export default PurchaseConetianSuccess;
