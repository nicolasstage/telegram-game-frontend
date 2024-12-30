import BackButton from "@/components/backButton";
import PageWrapper from "@/components/pageWrapper";

import "./index.css";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import Image from "next/image";
import { Button, GradientButton } from "@/components/button";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { formatToken } from "@/utilitiy/functions";
import Skeleton from "react-loading-skeleton";
import { SkinImg } from "@/utilitiy/skinStoreImage";
import styled from "styled-components";
import Skin from "./skin";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const S = {
  Preview: styled(Div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("/background_astronaut.png");
    background-position: center;
    background-size: 100% 100%;
    border-radius: 50%;
    width: 195px;
    height: 195px;
  `,
  BuyButton: styled(FlexDiv)`
    width: 100%;
    background-image: linear-gradient(90deg, #79f8ff 0%, #d775ff 50%);
    border-radius: 32px;
    padding: 1px;
  `,
  Skins: styled(FlexDiv)`
    overflow-y: scroll;
  `,
};

interface Skin {
  key: any;
  Img: any;
  status: String;
  title: String;
  desc: String;
  price: Number;
}

export default function SkinStore() {
  const { t } = useTranslation();

  const { setRouter, profile, setBuyItem } = useGameContext();
  const [skins, setSkins] = useState<Skin[]>([
    {
      key: 1,
      Img: SkinImg.Fssuit,
      status: "used",
      title: "FS Suit",
      desc: t("skin.store.desc.fssuit"), // Placeholder for description
      price: 0,
    },
    {
      key: 2,
      Img: SkinImg.Shibnet,
      status: "mine",
      title: "ShibNET",
      desc: t("skin.store.desc.shibnet"), // Placeholder for description
      price: 0,
    },
    {
      key: 3,
      Img: SkinImg.Grmpnet,
      status: "buy",
      title: "GrmpNET",
      desc: t("skin.store.desc.grmpnet"), // Placeholder for description
      price: 2,
    },
    {
      key: 4,
      Img: SkinImg.Cofrog,
      status: "buy",
      title: "CoFROG",
      desc: t("skin.store.desc.cofrog"), // Placeholder for description
      price: 2,
    },
    {
      key: 5,
      Img: SkinImg.Johnnyet,
      status: "buy",
      title: "JohnNyET",
      desc: t("skin.store.desc.johnnyet"), // Placeholder for description
      price: 2,
    },
    {
      key: 6,
      Img: SkinImg.Cowave,
      status: "buy",
      title: "CoWave",
      desc: t("skin.store.desc.cowave"), // Placeholder for description
      price: 5,
    },
    {
      key: 7,
      Img: SkinImg.Netarry,
      status: "buy",
      title: "NETarry",
      desc: t("skin.store.desc.netarry"), // Placeholder for description
      price: 5,
    },
    {
      key: 8,
      Img: SkinImg.Cofry,
      status: "buy",
      title: "CoFRY",
      desc: t("skin.store.desc.cofry"), // Placeholder for description
      price: 5,
    },
    {
      key: 9,
      Img: SkinImg.Facenet,
      status: "buy",
      title: "FaceNET",
      desc: t("skin.store.desc.facenet"), // Placeholder for description
      price: 5,
    },
    {
      key: 10,
      Img: SkinImg.Cocpz,
      status: "buy",
      title: "CoCPZ",
      desc: t("skin.store.desc.cocpz"), // Placeholder for description
      price: 10,
    },
    {
      key: 11,
      Img: SkinImg.Cotalik,
      status: "buy",
      title: "CoTalik",
      desc: t("skin.store.desc.cotalik"), // Placeholder for description
      price: 10,
    },
    {
      key: 12,
      Img: SkinImg.Emco,
      status: "buy",
      title: "EMCo",
      desc: t("skin.store.desc.emco"), // Placeholder for description
      price: 10,
    },
    {
      key: 13,
      Img: SkinImg.Tconet,
      status: "buy",
      title: "T-CoNET",
      desc: t("skin.store.desc.tconet"), // Placeholder for description
      price: 10,
    },
    {
      key: 14,
      Img: SkinImg.Conetrix,
      status: "buy",
      title: "CoNETrix",
      desc: t("skin.store.desc.conetrix"), // Placeholder for description
      price: 20,
    },
    {
      key: 15,
      Img: SkinImg.Corvin,
      status: "buy",
      title: "CoRVIN",
      desc: t("skin.store.desc.corvin"), // Placeholder for description
      price: 20,
    },
    {
      key: 16,
      Img: SkinImg.Covdr,
      status: "buy",
      title: "CoVDR",
      desc: t("skin.store.desc.covdr"), // Placeholder for description
      price: 20,
    },
    {
      key: 17,
      Img: SkinImg.Vulconet,
      status: "buy",
      title: "VulCoNET",
      desc: t("skin.store.desc.vulconet"), // Placeholder for description
      price: 20,
    },
    {
      key: 18,
      Img: SkinImg.Netwid,
      status: "buy",
      title: "NETwid",
      desc: t("skin.store.desc.netwid"), // Placeholder for description
      price: 50,
    },
    {
      key: 19,
      Img: SkinImg.Spmanet,
      status: "buy",
      title: "SPMaNET",
      desc: t("skin.store.desc.spmanet"), // Placeholder for description
      price: 50,
    },
    {
      key: 20,
      Img: SkinImg.Wwnet,
      status: "buy",
      title: "wwNET",
      desc: t("skin.store.desc.wwnet"), // Placeholder for description
      price: 50,
    },
    {
      key: 21,
      Img: SkinImg.Batnet,
      status: "buy",
      title: "BatNET",
      desc: t("skin.store.desc.batnet"), // Placeholder for description
      price: 50,
    },
  ]);

  const [selected, setSelected] = useState<any>(() => {
    let temp = {};
    skins.forEach((skin) => {
      if (skin.status === "used") {
        temp = skin;
      }
    });
    return temp;
  });

  const select = (index: any) => {
    setSelected?.(skins[index - 1]);
  };

  const choose = () => {
    const skinsCopy = skins.map((skin) => {
      if (skin.status === "used") {
        skin.status = "mine";
      }
      return skin;
    });
    skinsCopy[selected?.key - 1].status = "used";
    setSkins(skinsCopy);
  };

  const buy = () => {
    setBuyItem?.(selected);
    setRouter?.("/skinconfirm");
  };

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text="Skins Store" to="/shopping" />
      <FlexDiv $gap="8px" $align="center">
        {profile ? (
          <>
            <P $fontSize="20px" style={{ lineHeight: "16px" }}>
              {formatToken(profile?.tokens?.cCNTP?.balance)}
            </P>
            <P $fontSize="12px" style={{ lineHeight: "16px" }}>
              {t("skin.store.cntpEarned")}
            </P>
          </>
        ) : (
          <Skeleton width={200} />
        )}
      </FlexDiv>
      <div className="split"></div>
      <FlexDiv>
        <FlexDiv $width="50%" $direction="column">
          <FlexDiv>
            <S.Preview $margin="0 0 30px 0">
              <Image
                src={selected.Img}
                width={116}
                height={127}
                alt={selected.desc}
              />
            </S.Preview>
          </FlexDiv>
          <FlexDiv
            $direction="column"
            $background="#FFFFFF0A"
            $justify="center"
            $align="center"
            $padding="15px 10px"
            $radius="16px"
          >
            <P $fontSize="18px">{selected.title}</P>
            <Div $margin="20px 0">
              <P $fontSize="12px" $align="center">
                {selected.desc}
              </P>
            </Div>
            {selected.price === 0 ? (
              <P $color="#79f8ff" $fontSize="14px">
                {t("skin.store.purchased")}
              </P>
            ) : (
              <FlexDiv $align="center" $gap="5px" $margin="10px 0">
                <Image
                  src={SkinImg.Rewards}
                  width={24}
                  height={24}
                  alt="rewards"
                />
                <P $fontSize="14px">{selected.price} CNTP</P>
              </FlexDiv>
            )}
            <FlexDiv $width="100%" $padding="10px">
              {selected.price === 0 ? (
                <GradientButton flex={1} height="36px" onClick={choose}>
                  <P>{t("skin.store.choose")}</P>
                </GradientButton>
              ) : (
                <S.BuyButton>
                  <Button
                    $background="#17181F"
                    $fontSize="16px"
                    $width="100%"
                    $radius="16px"
                    $padding="5px 0"
                    onClick={buy}
                  >
                    {t("skin.store.buySkin")}
                  </Button>
                </S.BuyButton>
              )}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $width="50%">
          <S.Skins
            $justify="flex-end"
            $wrap="wrap"
            $gap="10px"
            $height="80vh"
            className="scroll"
            $padding="0 5px 0 0 "
          >
            {skins.map((e) => {
              return (
                <div key={e?.key}>
                  <Skin
                    data={e}
                    index={selected?.key}
                    selected={(index) => select(index)}
                  />
                </div>
              );
            })}
          </S.Skins>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
}
