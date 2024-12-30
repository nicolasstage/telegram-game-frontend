import BackButton from "@/components/backButton";
import { Button } from "@/components/button";
import CurrentBalance from "@/components/currentBalance";
import { FlexDiv } from "@/components/div";
import MiningStatus from "@/components/miningStatus";
import { P } from "@/components/p";
import { slice } from "@/utilitiy/functions";
import { Img } from "@/utilitiy/images";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaCheck } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import { fetchImportWallet, fetchstopMining } from "@/API/getData";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/modal/confirmModal";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const S = {
  BuyButton: styled(FlexDiv)`
    width: 100%;
    background-image: linear-gradient(90deg, #79f8ff 0%, #d775ff 50%);
    border-radius: 16px;
    padding: 1px;
  `,
};

export default function Wallet() {
  const { t } = useTranslation();
  const [newWalletPrivateKey, setNewWalletPrivateKey] = useState<string>("");
  const [copiedReferrer, setCopiedReferrer] = useState<boolean>(false);
  const [copiedPrivateKey, setCopiedPrivateKey] = useState<boolean>(false);
  const [copiedWalletAddress, setCopiedWalletAddress] =
    useState<boolean>(false);
  const [showImportWalletConfirmModal, setShowImportWalletConfirmModal] =
    useState<boolean>(false);
  const [isImportingWallet, setIsImportingWallet] = useState<boolean>(false);

  const { profile, setProfile, setMining, miningErrorTimeout, setRouter } =
    useGameContext();

  useEffect(() => {
    if (copiedWalletAddress) {
      setTimeout(() => {
        setCopiedWalletAddress(false);
      }, 4000);
    }
    if (copiedPrivateKey) {
      setTimeout(() => {
        setCopiedPrivateKey(false);
      }, 4000);
    }
    if (copiedReferrer) {
      setTimeout(() => {
        setCopiedReferrer(false);
      }, 4000);
    }
  }, [copiedWalletAddress, copiedPrivateKey, copiedReferrer]);

  const copyText = (text: string, type: string) => {
    copy(text);
    toast.success(t("wallet.copySuccessMessage"));
    if (type === "walletAddress") {
      setCopiedWalletAddress(true);
      return;
    }
    if (type === "walletPrivateKey") {
      setCopiedPrivateKey(true);
      return;
    }
    if (type === "referrer") {
      setCopiedReferrer(true);
      return;
    }
  };

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
      const stopMiningResult = await fetchstopMining(profile?.keyID);

      if (stopMiningResult && !stopMiningResult?.error) {
        miningErrorTimeout?.current && clearTimeout(miningErrorTimeout.current);
        setMining?.(false);

        const importResult = await fetchImportWallet(newWalletPrivateKey);
        if (importResult && !importResult?.error) {
          setProfile?.(importResult);
          setNewWalletPrivateKey("");
          toast.success(t("wallet.importWalletSuccessMessage"));
        } else {
          toast.error(importResult?.message || t("wallet.importWalletError"));
        }
      } else {
        toast.error(t("wallet.stopMiningError"));
      }
    } else {
      toast.error(t("wallet.noPrivateKeyError"));
    }

    setIsImportingWallet(false);
    setShowImportWalletConfirmModal(false);
  };

  return (
    <>
      <FlexDiv $direction="column" $gap="22px" $margin="12px 16px 140px 16px">
        <MiningStatus />
        <BackButton text={t("wallet.backButtonText")} />
        <FlexDiv>
          <CurrentBalance asset="cntp" secondaryAsset="conet" />
        </FlexDiv>
        <div className="split"></div>
        <FlexDiv $direction="column" $gap="10px">
          <P $fontSize="24px">{t("wallet.assetsExchangeTitle")}</P>
          <P $color="#C8C6C8">{t("wallet.assetsExchangeDescription")}</P>
          <S.BuyButton>
            <Button
              $background="#17181F"
              $fontSize="16px"
              $width="100%"
              $radius="16px"
              $padding="5px 0"
              $height="56px"
              onClick={() => setRouter?.("/send")}
            >
              <FlexDiv $align="center" $gap="5px">
                <Image src={Img.SendImg} width={24} height={22} alt="" />
                {t("wallet.sendButton")}
              </FlexDiv>
            </Button>
          </S.BuyButton>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="8px" $width="100%">
          <FlexDiv
            $direction="column"
            $gap="16px"
            $width="100%"
            $padding="14px 24px"
            $border="1px solid rgba(255, 255, 255, .1)"
            $radius="16px"
          >
            <P $fontSize="24px">{t("wallet.walletSectionTitle")}</P>
            <FlexDiv $direction="column" $gap="16px">
              <FlexDiv $direction="column" $gap="12px">
                <P $color="#C8C6C8">{t("wallet.walletAddressLabel")}</P>
                <FlexDiv $padding="0 16px" $justify="space-between">
                  <P>
                    {slice(profile?.keyID)}
                    {!profile?.keyID && <Skeleton width={100} />}
                  </P>
                  <Button
                    onClick={() => copyText(profile?.keyID, "walletAddress")}
                  >
                    {copiedWalletAddress ? (
                      <FaCheck />
                    ) : (
                      <Image
                        height={24}
                        width={24}
                        alt={t("wallet.copyAltText")}
                        src={Img.CopyImg}
                      />
                    )}
                  </Button>
                </FlexDiv>
              </FlexDiv>
              <FlexDiv $direction="column" $gap="12px">
                <P $color="#C8C6C8">{t("wallet.privateKeyLabel")}</P>
                <FlexDiv $padding="0 16px" $justify="space-between">
                  <P>
                    {slice(profile?.privateKeyArmor)}
                    {!profile?.privateKeyArmor && <Skeleton width={100} />}
                  </P>
                  <Button
                    onClick={() =>
                      copyText(profile?.privateKeyArmor, "walletPrivateKey")
                    }
                  >
                    {copiedPrivateKey ? (
                      <FaCheck />
                    ) : (
                      <Image
                        height={24}
                        width={24}
                        alt={t("wallet.copyAltText")}
                        src={Img.CopyImg}
                      />
                    )}
                  </Button>
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          {profile?.referrer && (
            <FlexDiv $gap="8px" $align="center" $padding="0 0 0 24px">
              <P $fontSize="14px" $color="#C8C6C8">
                {t("wallet.inviterLabel")}
              </P>
              <FlexDiv $gap="8px" $align="center">
                <P $fontSize="12px">{slice(profile?.referrer)}</P>
                <Button
                  onClick={() => copyText(profile?.referrer, "referrer")}
                >
                  <Image
                    height={16}
                    width={16}
                    alt={t("wallet.copyAltText")}
                    src={copiedReferrer ? Img.CheckImg : Img.CopyImg}
                  />
                </Button>
              </FlexDiv>
            </FlexDiv>
          )}
        </FlexDiv>
        <FlexDiv $direction="column" $gap="18px">
          <FlexDiv $direction="column" $gap="8px">
            <P $fontSize="24px">{t("wallet.importWalletTitle")}</P>
            <P $color="#C8C6C8">{t("wallet.importWalletDescription")}</P>
          </FlexDiv>
          <input
            value={newWalletPrivateKey}
            onChange={(e) => setNewWalletPrivateKey(e.target.value)}
            placeholder={t("wallet.importWalletPlaceholder")}
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
            {t("wallet.importWalletButton")}
          </Button>
        </FlexDiv>
      </FlexDiv>
      <ConfirmModal
        title={t("wallet.importWalletConfirmTitle")}
        message={t("wallet.importWalletConfirmMessage")}
        confirmButtonText={t("wallet.importWalletConfirmButton")}
        cancelButtonText={t("wallet.importWalletCancelButton")}
        confirmButtonAction={handleImportWalletConfirm}
        cancelButtonAction={() => setShowImportWalletConfirmModal(false)}
        closeButtonAction={() => setShowImportWalletConfirmModal(false)}
        showConfirmModal={showImportWalletConfirmModal}
      />
    </>
  );
}
