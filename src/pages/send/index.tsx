import BackButton from "@/components/backButton";
import { Button } from "@/components/button";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SendImg } from "@/utilitiy/send";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const actives = [
  {
    key: 1,
    img: SendImg.CntpImg,
    title: "CNTP",
    router: "/sendCNTP",
  },
  {
    key: 2,
    img: SendImg.TicketImg,
    title: "Ticket",
    router: "/sendTicket",
  },
  {
    key: 3,
    img: SendImg.NftImg,
    title: "NFT",
    router: "/sendNft",
  },
];

const locks = [
  {
    key: 1,
    img: SendImg.SkinBlurImg,
    title: "Skin",
  },
  {
    key: 2,
    img: SendImg.KeyBlurImg,
    title: "Key",
  },
  {
    key: 3,
    img: SendImg.ItemBlurImg,
    title: "Item",
  },
];

const S = {
  BuyButton: styled(FlexDiv)`
    background-image: linear-gradient(90deg, #79f8ff 0%, #d775ff 50%);
    border-radius: 16px;
    padding: 1px;
  `,
};

const Send = () => {
  const { setRouter } = useGameContext();

  const { t } = useTranslation();

  return (
    <PageWrapper>
      <BackButton text={t("sendCntp.sendBackButton")} to="/wallet" />
      <Div $padding="0 10px">
        <P $color="#C8C6C8">{t("sendCntp.sendCta")}</P>
      </Div>
      <div className="split"></div>
      <FlexDiv $wrap="wrap" $align="center" $justify="center" $gap="10px">
        {actives.map((active) => {
          return (
            <S.BuyButton key={active.key}>
              <Button
                $background="#17181F"
                $fontSize="16px"
                $width="191px"
                $height="118px"
                $radius="16px"
                onClick={() => setRouter?.(active.router)}
              >
                <FlexDiv
                  $align="start"
                  $gap="5px"
                  $width="100%"
                  $height="100%"
                  $direction="column"
                  $justify="flex-start"
                  $padding="16px 24px"
                >
                  <FlexDiv $direction="column" $align="start" $gap="10px">
                    <Image src={active.img} width={48} height={48} alt="" />
                    <P $fontSize="24px">{active.title}</P>
                  </FlexDiv>
                </FlexDiv>
              </Button>
            </S.BuyButton>
          );
        })}

        {locks.map((lock) => {
          return (
            <div key={lock.key} style={{ cursor: "not-allowed" }}>
              <Image src={lock.img} width={191} height={120} alt="" />
            </div>
          );
        })}
      </FlexDiv>

      {/* Substitute the following lines for the implementation of transaction history */}
      {/* <Button
        $margin="0 20px 100px 20px"
        $border="1px solid #535254"
        $direction="row"
        $radius="16px"
        $padding="24px"
      >
        <FlexDiv $justify="space-between" $width="100%" $align="center">
          <P>Transaction history</P>
          <Image src={SendImg.ArrowDownImg} width={12} height={8} alt="" />
        </FlexDiv>
      </Button> */}
    </PageWrapper>
  );
};

export default Send;
