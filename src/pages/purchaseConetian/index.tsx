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
import UserData from "@/components/userData";
import { Img } from "@/utilitiy/images";
import { Box, Checkbox, ListSubheader, MenuItem, Select, Skeleton, Stack, SvgIcon, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { isWalletAgent } from "@/API";
import { useTranslation } from "react-i18next";

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
    color: white;
    background: none;
    border: none;
    outline: none;

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

const CONETIAN_PRICE = 100
const DEFAULT_AGENT_WALLET = '0x9d20C7F8bA93bEEf2DA8f9b9D7ffa891Af3bBf91'

const PurchaseConetian = () => {
  const [amount, setAmount] = useState<number>(1);
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [agentWallet, setAgentWallet] = useState<string>("");
  const [isAgentWallet, setIsAgentWallet] = useState<boolean>(false);
  const [isAddressChecking, setIsAddressChecking] = useState<boolean>(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState<boolean>(false)
  const [isAgreementSigned, setIsAgreementSigned] = useState<boolean>(false)
  const [coinImage, setCoinImage] = useState<string>("");
  const [displayCoin, setDisplayCoin] = useState<string>("wusdt");
  const [selectedCoin, setSelectedCoin] = useState<string>("wusdt");
  const [isLoadingPrices, setIsLoadingPrices] = useState<boolean>(false)
  const [nftPriceByCoin, setNftPriceByCoin] = useState<number>(CONETIAN_PRICE);
  const [total, setTotal] = useState<number>(0);
  const [agentError, setAgentError] = useState<string>('')

  const { t } = useTranslation()

  const { setRouter, setConetianPurchaseDetails, profile, oracleAssets } = useGameContext();

  function validateFunds(asset: string): boolean {
    let userBalance = profile?.tokens?.[asset]

    if (!oracleAssets) return false

    const _oracleAssets: { name: string, price: string }[] = oracleAssets.assets
    const foundAsset: any = findAsset(asset)

    if (foundAsset.name === 'usdt') foundAsset.price = 1

    return (parseFloat(userBalance?.balance) >= parseFloat(((CONETIAN_PRICE / parseFloat(foundAsset.price)) * amount).toFixed(4)))

    function findAsset(asset: string): { name: string, price: string } | undefined {
      if (asset === 'wusdt') asset = 'usdt'
      return _oracleAssets.find((a) => a.name === asset)
    }
  }

  useEffect(() => {
    async function validateAddress(): Promise<void> {
      const isAgent: any = await isWalletAgent(agentWallet)

      if (isAgent.length >= 1 && typeof isAgent[0] === 'string' && (isAgent[0] === 'INVALID DATA' || isAgent[0] === 'false')) {
        setIsAgentWallet(false);
        setAgentError('Insert a valid wallet')
      } else if (isAgent[1][0] === true) {
        setIsAgentWallet(true);
        setAgentError('')
      }
    }

    setIsAddressChecking(true);

    if (agentWallet !== '')
      validateAddress()
    else {
      setAgentError('')
    }

    setIsAddressChecking(false);
  }, [agentWallet])

  const handleAgentWalletChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setAgentWallet(e.target.value);
  };

  const handleChangeNftAmount = (e: any) => {
    const value = Number(e.target.value)

    if (typeof value === 'number' && !isNaN(value) && value > 0)
      setAmount(value)
  }

  const handleIncreaseNftAmount = () => {
    setAmount(prev => prev + 1)
  }

  const handleDecreaseNftAmount = () => {
    setAmount(prev => {
      if (prev == 1) return 1

      return prev - 1
    })
  }

  const handleCoinChange = async (event: any) => {
    changeCoinImage(event.target.value);
    setSelectedCoin(event.target.value.split("-")[1]);
  };

  function changeCoinImage(value: any) {
    switch (value) {
      case "bnb":
        setCoinImage(Img.BnbIcon);
        break;
      case "wusdt":
        setCoinImage(Img.UsdtBnbIcon);
        break;
      default:
        setCoinImage(Img.UsdtBnbIcon);
        break;
    }
  }

  const updateNftPrice = async () => {
    setIsLoadingPrices(true);
    let coin = selectedCoin;

    switch (selectedCoin) {
      case "arb_usdt":
      case "wusdt":
      case "tronUSDT":
      case "usdt":
        coin = "usdt";
        break;
      case "arb_eth":
      case "eth":
        coin = "eth";
        break;
      case "wbnb":
        coin = "bnb";
        break;
      case "tron":
        coin = "tron";
        break;
    }
    let currency_data;
    let coin_price;

    currency_data =
      oracleAssets && oracleAssets.assets
        ? oracleAssets.assets.find((item: any) => item.name === coin)
        : "";
    coin_price =
      currency_data && oracleAssets.assets ? currency_data.price : 1;

    if (selectedCoin !== "none") {
      setDisplayCoin(coin);
    }
    if (coin === "usdt") {
      setNftPriceByCoin(CONETIAN_PRICE);
    } else {
      coin_price
        ? await setNftPriceByCoin(CONETIAN_PRICE / parseFloat(coin_price))
        : 1;
    }

    setIsLoadingPrices(false);
  };

  useEffect(() => {
    updateNftPrice();
  }, [selectedCoin]);

  useEffect(() => {
    setTotal(amount * nftPriceByCoin);
  }, [amount, nftPriceByCoin]);

  const handlePurchase = async () => {
    // return if amount is 0
    if ((agentWallet && !isAgentWallet) || amount <= 0 || !isAgreementSigned) {
      return;
    }

    let agentToUse = agentWallet ? agentWallet : new URLSearchParams(window.location.search).get("agent");

    if (!agentToUse) agentToUse = DEFAULT_AGENT_WALLET;

    // set transfer token details for confirmation page
    setConetianPurchaseDetails?.({
      agentWallet: agentToUse,
      selectedCoin,
      amount,
      nftPriceByCoin,
      total
    });

    setRouter?.("/purchaseConetianConfirm");
  };

  return (
    <PageWrapper>
      <BackButton text={t('purchaseConetian.backButton')} to="/" />

      {/* nft information */}
      <FlexDiv $gap="24px" $direction="column" $padding="0 10px">
        <FlexDiv $width="100%" $direction="column" $justify="center" $align="center" $height="300px" style={{ overflow: 'hidden', borderRadius: "16px" }}>
          <img src={Img.BuyConetianBanner2} alt="buy conetian banner" style={{ width: "100%" }} />
        </FlexDiv>

        <FlexDiv $direction="column" $gap="16px">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv>
              <P $color="#79F8FF" $fontSize="14px">
                {t("purchaseConetian.conetianBenefits")}
              </P>
            </FlexDiv>

            <FlexDiv $direction="column">
              <ul style={{ paddingLeft: "20px", color: "#C8C6C8", fontSize: "14px" }}>
                <li> {t("purchaseConetian.benefitsList.first")}</li>
                <li> {t("purchaseConetian.benefitsList.second")}</li>
                <li> {t("purchaseConetian.benefitsList.third")}</li>
                <li> {t("purchaseConetian.benefitsList.fourth")}</li>
                <li> {t("purchaseConetian.benefitsList.fifth")}</li>
                <li> {t("purchaseConetian.benefitsList.sixth")}</li>
              </ul>
            </FlexDiv>
          </FlexDiv>

          <FlexDiv >
            <P $color="#929092" $fontSize="12px">{t("purchaseConetian.duration")}: {t("purchaseConetian.benefitsDuration")}</P>
          </FlexDiv>

          <FlexDiv $direction="row" $justify="center" $align="center" $margin="30px 0" $radius="16px" $padding="10px" $background="#303032" >
            <P $color="#929092" $fontSize="22px">{t("purchaseConetian.endOfEvent")}</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetian;
