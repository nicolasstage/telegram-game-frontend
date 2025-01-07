import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import BackButton from "@/components/backButton";
import { Button, GradientButton } from "@/components/button";
import CurrentBalance from "@/components/currentBalance";
import { Div, FlexDiv } from "@/components/div";
import { P } from "@/components/p";
import PageWrapper from "@/components/pageWrapper";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import { SendImg } from "@/utilitiy/send";
import { formatToken } from "@/utilitiy/functions";
import { fetchIsAddress } from "@/API/getData";
import { useTranslation } from 'react-i18next';
import Selection from "@/components/selection";

const nftOptions: Option[] = [
  {
    id: 1,
    title: "Conetian NFT",
    value: "conetian",
    icon: "/send/nft.png"
  },
  // uncomment this to allow transfer of Conetian Agent NFT
  // {
  //   id: 2,
  //   title: "Conetian Agent NFT",
  //   value: "conetianReferrer",
  //   icon: "/send/nft.png"
  // }
]

const S = {
  ToInput: styled.input`
    background: none;
    border: none;
    outline: none;
    width: 95%;
    color: #989899;
    padding: 5px;
    `,
  BalanceInput: styled.input`
    background: none;
    border: none;
    outline: none;
    width: 95%;
    color: #989899;
    padding: 5px;

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
  Split: styled.div`
    background-color: #989899;
    height: 1px;
  `,
};

type NftTypes = 'conetian' | 'conetianReferrer';


const SendNft = () => {
  const [amount, setAmount] = useState<string>("0");
  const [selectedNft, setSelectedNft] = useState<NftTypes>('conetian')
  const [selectedNftBalance, setSelectedNftBalance] = useState<string>('0')
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [toAddress, setToAddress] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [isAddressChecking, setIsAddressChecking] = useState<boolean>(false);

  const { setRouter, setTransferTokenDetails, profile } = useGameContext();

  useEffect(() => {
    const getSelectedNftBalance = (nftName: NftTypes) => {
      if (nftName === 'conetian') {
        return profile?.tokens?.ConetianNFT?.balance;
      }
      if (nftName === 'conetianReferrer') {
        return profile?.tokens?.ConetianAgentNFT?.balance;
      }
    }

    const balance = getSelectedNftBalance(selectedNft);

    setSelectedNftBalance(balance)
  }, [selectedNft])

  const handleToAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setToAddress(e.target.value);
    try {
      setIsAddressChecking(true);
      const isAddress = await fetchIsAddress(e.target.value);
      if (isAddress[0]) setIsValidAddress(true);
      else setIsValidAddress(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAddressChecking(false);
    }
  };

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const rawValue = e.target.value;

    // Allow only empty string or valid integers
    if (rawValue !== "" && !/^[0-9]+$/.test(rawValue)) {
      return;
    }

    // If the initial value is "0", replace it with the typed value
    const cutZeroString =
      rawValue[0] === "0" && rawValue[1] >= "1" && rawValue[1] <= "9"
        ? rawValue.slice(1)
        : rawValue;

    // Ensure the number is within the allowed range
    if (Number(cutZeroString) > Number(selectedNftBalance) || Number(cutZeroString) < 0) {
      return;
    }

    // Update the amount
    setAmount(cutZeroString);

    // Set validity of the amount
    if (cutZeroString === "0" || cutZeroString === "") {
      setIsValidAmount(false);
    } else {
      setIsValidAmount(true);
    }
  };

  const handleSend = async () => {
    // return if amount is 0
    if (!isValidAddress || !isValidAmount) {
      return;
    }

    // set transfer token details for confirmation page
    setTransferTokenDetails?.({
      assetName: selectedNft,
      toAddress,
      amount,
    });

    setRouter?.("/sendNftConfirm");
  };

  const handleNftChange = (value: NftTypes) => {
    setSelectedNft(value);
  }

  const { t } = useTranslation();

  return (
    <PageWrapper>
      <BackButton text={t("sendNft.sendBackButton")} to="/send" />

      <Div $padding="0 10px">
        <CurrentBalance asset={selectedNft} />
      </Div>

      <div className="split"></div>

      <FlexDiv $direction="column" $padding="0 10px" $gap="32px">
        <Selection options={nftOptions} selectedOption={selectedNft} changeOption={handleNftChange} title={t("sendNft.selectNft")} />

        <Button
          $background="#262626"
          $padding="12px 16px"
          $radius="16px"
          $width="100%"
        >
          <FlexDiv $justify="space-between" $width="100%" $align="center">
            <FlexDiv $direction="column" $grow="1">
              <P>{t("sendNft.to")}</P>
              <S.ToInput
                placeholder={t("sendNft.walletPlaceholder")}
                value={toAddress}
                onChange={handleToAddressChange}
              />
            </FlexDiv>
            {isAddressChecking ? (
              <Image src={SendImg.LoadingImg} width={20} height={20} alt="" />
            ) : isValidAddress ? (
              <Image src={SendImg.CheckedImg} width={20} height={20} alt="" />
            ) : (
              <></>
            )}
          </FlexDiv>
        </Button>


        <FlexDiv
          $background="#262626"
          $padding="12px 16px"
          $radius="16px"
          $justify="space-between"
        >
          <FlexDiv $justify="space-between" $width="100%" $align="center">
            <FlexDiv $direction="column" $grow="1">
              <P>{t("sendNft.amount")}</P>
              <S.BalanceInput
                value={amount}
                onChange={handleAmountInputChange}
                type="number"
              />
            </FlexDiv>
          </FlexDiv>

          <Button
            $background="#30333b"
            $color="#8DA8FF"
            $padding="10px 16px"
            $radius="8px"
            onClick={() => setAmount(selectedNftBalance)}
          >
            {t("sendNft.max")}
          </Button>
        </FlexDiv>

        <FlexDiv $margin="0 0 100px 0" $width="100%" $direction="column">
          <GradientButton
            width="100%"
            onClick={handleSend}
            disabled={!isValidAddress || !isValidAmount}
          >
            {t("sendNft.estimateGas")}
          </GradientButton>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default SendNft;
