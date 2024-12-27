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

const PurchaseConetianProgress = () => {
  const { setRouter, profile, conetianPurchaseDetails } = useGameContext();
  useEffect(() => {
    const purchaseConetian = async () => {
      const response =
        conetianPurchaseDetails?.amount &&
        conetianPurchaseDetails?.selectedCoin &&
        conetianPurchaseDetails?.total &&
        conetianPurchaseDetails?.agentWallet &&
        (await fetchPurchaseConetian(
          profile?.keyID,
          Number(conetianPurchaseDetails?.amount),
          conetianPurchaseDetails?.selectedCoin,
          conetianPurchaseDetails?.total,
          conetianPurchaseDetails?.agentWallet
        ));

      if (response) {
        setRouter?.("/transactionsuccess");
      }
    };

    purchaseConetian();
  }, []);

  return (
    <PageWrapper>
      <Div $padding="0 10px">
        <P $fontSize="24px">Transaction in progress</P>
        <P $fontSize="14px" $color="#CACACC" $width="321px" $weight="400">
          Your order completion time may vary, please wait and we’ll let you
          know when it’s completed.
        </P>
      </Div>

      <Loading />

      <FlexDiv $justify="center">
        <P $fontSize="14px" $align="center" $width="178px">
          Please wait, this may take a few seconds.
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
            <P>Processing</P>
          </FlexDiv>
        </Button>
        <FlexDiv $justify="center" $align="center" $gap="5px">
          <Image src={Img.SecureImg} width={11} height={14} alt="" />
          <P $fontSize="11px" $color="#FFFFFF">
            Secure payment
          </P>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetianProgress;
