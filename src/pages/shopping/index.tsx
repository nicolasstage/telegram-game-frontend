import BackButton from "@/components/backButton";
import PageWrapper from "@/components/pageWrapper";

import "./index.css";
import { FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import Image from "next/image";
import { Img } from "@/utilitiy/images";
import { Button } from "@/components/button";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Supplies from "@/components/supplies";
import { useTranslation } from 'react-i18next';

export default function Shopping() {
  const { setRouter } = useGameContext();

  const { t } = useTranslation();

  const shoppingOptions = [
    {
      key: 1,
      title: t("shopping.spinWheel"),
      caption: t("shopping.spinCaption"),
      image: Img.RouletteIcon,
      link: "/roulette",
    },
  ];

  const comingSoonOptions = [
    {
      key: 2,
      image: Img.BoxBlurImg,
      title: t("shopping.openBox"),
      caption: t("shopping.boxCaption"),
      link: "/box",
    },
    {
      key: 3,
      image: Img.SkinStoreBlurImg,
      title: t("shopping.skinStore"),
      caption: t("shopping.skinStoreCaption"),
      link: "/skinstore",
    },
    {
      key: 4,
      image: Img.ItemsBlurImg,
      title: t("shopping.gameItems"),
      caption: t("shopping.gameItemsCaption"),
      link: "/gameitem",
    },
  ];

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text={t("shopping.shop")} />
      <Supplies />
      <div className="split"></div>
      <FlexDiv $direction="column" $gap="12px">
        <P $fontSize="24px">{t("shopping.storageLounge")}</P>
        <P $color="#C8C6C8" className="text-max-width">
          {t("shopping.storageCaption")}
        </P>
      </FlexDiv>
      <FlexDiv $direction="column" $gap="16px">
        {shoppingOptions.map((option) => (
          <Button
            key={option.key}
            $padding="16px"
            $radius="16px"
            $height="104px"
            className="option-button"
            $background="#262527"
            $border="1px solid #79F8FF"
            onClick={() => setRouter?.(option.link)}
          >
            <FlexDiv $justify="space-between" $width="100%" $align="center">
              <FlexDiv $gap="14px" $align="center">
                <FlexDiv $align="center">
                  <Image
                    src={option.image}
                    alt={option.title}
                    width={55}
                    height={55}
                  />
                </FlexDiv>
                <FlexDiv $direction="column" $gap="6px">
                  <P $fontSize="24px">{option.title}</P>
                  <P $fontSize="12px">{option.caption}</P>
                </FlexDiv>
              </FlexDiv>
              <Image
                src={Img.RightArrowImg}
                alt={t("shopping.arrow")}
                width={32}
                height={32}
              />
            </FlexDiv>
          </Button>
        ))}
        {comingSoonOptions.map((option) => (
          <div
            key={option.key}
            style={{
              position: "relative",
              width: "100%",
              height: "104px",
              cursor: "not-allowed",
              display: "flex",
              border: "1px solid #535254",
              alignItems: "center",
              borderRadius: "16px",
              backgroundColor: "#262527",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "14px",
              }}
            >
              <Image
                src={option.image}
                alt={t("shopping.comingSoon")}
                width={50}
                height={50}
              />
              <div>
                <p
                  style={{
                    color: "#ADAAAD",
                    fontSize: "24px",
                    lineHeight: "28px",
                  }}
                >
                  {option.title}
                </p>
                <p
                  style={{
                    color: "#ADAAAD",
                    fontSize: "12px",
                    lineHeight: "20px",
                  }}
                >
                  {t("shopping.comingSoonText")}
                </p>
              </div>
            </div>
            <Image src={Img.Lock} alt={t("shopping.lock")} width={30} height={30} />
          </div>
        ))}
      </FlexDiv>
    </PageWrapper>
  );
}
