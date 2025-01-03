import { Button } from "@/components/button";
import { FlexDiv, Div } from "@/components/div";
import { P } from "@/components/p";
import { slice } from "@/utilitiy/functions";
import { Img } from "@/utilitiy/images";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaCheck } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import { fetchImportWallet, fetchCreateWallet } from "@/API/getData";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/modal/confirmModal";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { CircularProgress, SvgIcon, Typography } from "@mui/material";
import PageWrapper from "@/components/pageWrapper";


const floatAnimation = keyframes`
  0% {
    transform: translate(-48%, -40%);
  }

  50% {
    transform: translate(-48%, calc(-40% - 10px));
  }

  100% {
    transform: translate(-48%, -40%);
  }
`

const S = {
  PlayButton: styled(Div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30vh;
    height: 30vh;
    position: relative;

    img:first-child {
      width: 28vh !important;
      height: 28vh !important;
    }

    img:last-child {
      width: 16vh !important;
      height: 16vh !important;

      top: 50% !important;
      left: 50% !important;

      transform: translate(-48%, -45%);

      animation: ${floatAnimation} 4s ease-in-out infinite;
    }
  `,
};


export default function Start() {
  const { t } = useTranslation();

  const [newWalletPrivateKey, setNewWalletPrivateKey] = useState<string>("");
  const [showImportWalletConfirmModal, setShowImportWalletConfirmModal] =
    useState<boolean>(false);
  const [isImportingWallet, setIsImportingWallet] = useState<boolean>(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState<boolean>(false);
  const { profile, setProfile, setMining, miningErrorTimeout, setRouter } =
    useGameContext();

  const handleImportWalletButton = () => {
    if (newWalletPrivateKey) {
      setShowImportWalletConfirmModal(true);
    } else {
      toast.error(t("wallet.noPrivateKeyError"));
    }
  };

  const handleImportWalletConfirm = async () => {
    setIsImportingWallet(true);

    if (newWalletPrivateKey) {
      const importResult = await fetchImportWallet(newWalletPrivateKey);

      if (importResult && !importResult?.error) {
        setProfile?.(importResult);
        setNewWalletPrivateKey("");
        toast.success(t("wallet.importWalletSuccessMessage"));
        setRouter?.("/");
      } else {
        toast.error(importResult?.message || t("wallet.importWalletError"));
      }
    } else {
      toast.error(t("wallet.noPrivateKeyError"));
    }

    setIsImportingWallet(false);
    setShowImportWalletConfirmModal(false);
  };

  const handleCreateNewWallet = async () => {
    setIsCreatingWallet(true);

    const createResult = await fetchCreateWallet();

    if (createResult && !createResult?.error) {
      setProfile?.(createResult);
      toast.success("Wallet created successfully");
      setRouter?.("/");
    } else {
      toast.error(createResult?.message || "Error creating wallet. Please try again later.");
    }

    setIsCreatingWallet(false);
  };

  return (
    <PageWrapper margin="0" centralizeVertically showMiningStatus={false}>
      <FlexDiv $direction="column" $padding="8px" $height="100vh" $justify='space-around'>
        <FlexDiv $direction="column" $align="center" $justify="center">
          <Image
            width={40}
            height={40}
            src={Img.ConetLogo}
            alt='conet-logo'
            style={{
              cursor: "pointer",
            }}
          />

          <Typography fontSize={'36px'} fontWeight={700} color="#FFFFFF">
            {t("start.title")}
          </Typography>
        </FlexDiv>

        <FlexDiv $justify="center">
        <Button $radius="50%">
          <S.PlayButton>
            <Image
              width={269}
              height={269}
              src={Img.BackgroundAstronautNoPlay}
              alt={t("home.playButtonAlt")}
            />
            <Image
              fill
              src={Img.Astronaut}
              alt={t("home.astronautAlt")}
            />
          </S.PlayButton>
        </Button>
      </FlexDiv>

        <FlexDiv $direction="column" $gap="22px" >
          <FlexDiv $direction="column" $gap="18px">
            <Typography fontSize={'18px'} fontWeight={400} textAlign={'center'} color="#FFFFFF">
              Start Playing
            </Typography>
            <Button
              $padding="12px"
              $radius="16px"
              $border="1px solid #04DAE8"
              $color="#79F8FF"
              onClick={isCreatingWallet ? () => { } : handleCreateNewWallet}
              disabled={isCreatingWallet}
            >
              {isCreatingWallet ?
                <CircularProgress size={24} color="inherit" />
                : <Typography fontSize={'14px'} fontWeight={400} textAlign={'center'}> {t("start.createWalletButton")} </Typography>
              }
            </Button>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="22px" $background="#262527" $radius="16px" $padding="16px">
          <FlexDiv $direction="column" $gap="18px">
            <FlexDiv $direction="column" $gap="4px">
              <P $fontSize="16px" $weight="400">{t("start.importWalletTitle")}</P>
            </FlexDiv>

            <input
              value={newWalletPrivateKey}
              onChange={(e) => setNewWalletPrivateKey(e.target.value)}
              placeholder={t("start.importWalletPlaceholder")}
              style={{
                padding: "14px 16px",
                fontSize: "16px",
                background: "rgba(99, 99, 99, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color:'white'
              }}
            />

            <Button
              $padding="12px"
              $radius="16px"
              $border="1px solid #04DAE8"
              onClick={isImportingWallet ? () => { } : handleImportWalletButton}
              disabled={isImportingWallet}
              $fontSize="14px"
            >
              {t("start.importWalletButton")}
            </Button>
          </FlexDiv>
        </FlexDiv>
        <a href="https://conet.network" target="_blank">
          <Typography fontSize={'16px'} fontWeight={600} textAlign={'center'} color="#FFFFFF"> {t("start.learnMore")} </Typography>
        </a>
      </FlexDiv>


      <ConfirmModal
        title={t("start.importWalletConfirmTitle")}
        message={t("start.importWalletConfirmMessage")}
        confirmButtonText={t("start.importWalletConfirmButton")}
        cancelButtonText={t("start.importWalletCancelButton")}
        confirmButtonAction={handleImportWalletConfirm}
        cancelButtonAction={() => setShowImportWalletConfirmModal(false)}
        closeButtonAction={() => setShowImportWalletConfirmModal(false)}
        showConfirmModal={showImportWalletConfirmModal}
      />
    </PageWrapper>
  );
}
