import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
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
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CircularProgress, SvgIcon, Typography } from "@mui/material";
import PageWrapper from "@/components/pageWrapper";

export default function Start() {
  const { t } = useTranslation();

  const [newWalletPrivateKey, setNewWalletPrivateKey] = useState<string>("");
  const [showImportWalletConfirmModal, setShowImportWalletConfirmModal] =
    useState<boolean>(false);
  const [isImportingWallet, setIsImportingWallet] = useState<boolean>(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState<boolean>(false);
  const { profile, setProfile, setMining, miningErrorTimeout, setRouter, isDebox } =
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
    <PageWrapper margin="12px 16px 88px 16px" vhGap="1.8vh" centralizeVertically showMiningStatus={false}>
      <FlexDiv $direction="column" $gap="60px">
        <FlexDiv $direction="column" $align="center" $justify="center">
          <Image
            width={100}
            height={100}
            src={Img.ConetLogo}
            alt='conet-logo'
            style={{
              cursor: "pointer",
              marginRight: "10px",
            }}
          />

          <Typography fontSize={'40px'} fontWeight={700} color="#FFFFFF">
            {t("start.title")}
          </Typography>

          <Typography fontSize={'14px'} color="#FFFFFF">
            {t("start.subtitle")}
          </Typography>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="22px" >
          <FlexDiv $direction="column" $gap="18px">
            <Button
              $padding="18px"
              $radius="32px"
              $border="1px solid #04DAE8"
              onClick={isCreatingWallet ? () => { } : handleCreateNewWallet}
              disabled={isCreatingWallet}
            >
              {isCreatingWallet ?
                <CircularProgress size={24} color="inherit" />
                : <> {t("start.createWalletButton")} </>
              }
            </Button>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="22px" >
          <FlexDiv $direction="column" $gap="18px">
            <FlexDiv $direction="column" $gap="8px">
              <P $fontSize="24px">{t("start.importWalletTitle")}</P>
              <P $color="#C8C6C8">{t("start.importWalletDescription")}</P>
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
                borderRadius: "16px",
              }}
            />

            <Button
              $padding="18px"
              $radius="32px"
              $border="1px solid #04DAE8"
              onClick={isImportingWallet ? () => { } : handleImportWalletButton}
              disabled={isImportingWallet}
            >
              {t("start.importWalletButton")}
            </Button>
          </FlexDiv>
        </FlexDiv>
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
