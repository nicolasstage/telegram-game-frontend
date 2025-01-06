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
const DEBOX_AGENT_WALLET = '0x13Ce806fDA865c3bc341a1C487C8d3F15f543807'

const PurchaseConetian = () => {
  const [amount, setAmount] = useState<number>(0);
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
      if (prev < 1) return 0

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

    let agentToUse = new URLSearchParams(window.location.search).get("agent");

    if (!agentToUse) agentToUse = '';

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

      {/* user information */}
      <FlexDiv $gap="16px" $padding="0 10px">
        <UserData />
        <Button
          $width="32px"
          $height="32px"
          $background="#474648"
          $radius="50%"
          onClick={() => setRouter?.("/profile")}
        >
          <Image
            width={16}
            height={16}
            src={Img.RightArrowImg}
            alt="right arrow image"
          />
        </Button>
      </FlexDiv>

      {/* nft information */}
      <FlexDiv $gap="24px" $direction="column" $padding="0 10px">
        <img src={Img.BuyConetianBanner} alt="buy conetian banner" style={{ width: "100%" }} />

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
        </FlexDiv>
      </FlexDiv>

      {/* title */}
      <FlexDiv $justify="space-between" $align="center" $margin="18px 0 0 0" $padding="0 10px">
        <P $fontSize="24px">
          {t("purchaseConetian.title")}
        </P>
      </FlexDiv>

      {/* inputs */}
      <FlexDiv $direction="column" $padding="0 10px" $gap="32px">
        <FlexDiv $direction="column" $gap="4px">
          <P>{t("purchaseConetian.selectQuantity")}</P>

          <Button
            $background="#262626"
            $padding="12px 16px"
            $radius="16px"
            $width="100%"
            $height="52px"
          >
            <FlexDiv $justify="space-between" $width="100%" $align="center">
              <Image src={Img.MinusIcon} alt="Proceed" width={32} height={32} onClick={handleDecreaseNftAmount} />

              <S.ToInput
                placeholder="0"
                style={{ textAlign: 'center', fontSize: '24px' }}
                value={amount}
                onChange={(e) => handleChangeNftAmount(e)}
              />

              <Image src={Img.PlusIcon} alt="Proceed" width={32} height={32} onClick={handleIncreaseNftAmount} />
            </FlexDiv>
          </Button>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="4px">
          <P>{t("purchaseConetian.agentWallet")}</P>

          <Button
            $background="#262626"
            $padding="12px 16px"
            $radius="16px"
            $width="100%"
            $height="52px"
          >
            <FlexDiv $justify="space-between" $width="100%" $align="center">
              <FlexDiv $direction="column" $grow="1">
                <S.ToInput
                  placeholder={t('purchaseConetian.walletAddress')}
                  value={agentWallet}
                  onChange={handleAgentWalletChange}
                />
              </FlexDiv>

              {isAddressChecking ? (
                <Image src={SendImg.LoadingImg} width={20} height={20} alt="" />
              ) : isAgentWallet ? (
                <Image src={SendImg.CheckedImg} width={20} height={20} alt="" />
              ) : (
                <></>
              )}
            </FlexDiv>
          </Button>
          <Typography fontSize={'12px'} color="#E4E4E5">{t("purchaseConetian.extraTokensNote")}</Typography>
          <Typography fontSize={'12px'} color="#C70039">{agentError}</Typography>
        </FlexDiv>

        {/* Token Select */}
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
          <P>
            {t("purchaseConetian.payIn")}
          </P>

          <Button
            $background="#262626"
            $padding="12px 16px"
            $radius="16px"
            $width="100%"
            $height={'52px'}
          >
            <Select
              id='coin-select'
              defaultValue={"select-token"}
              label='ETH'
              onChange={handleCoinChange}
              IconComponent={(props) => (
                <KeyboardArrowDownIcon {...props} sx={{ color: '#FFF !important' }} />
              )}
              variant='standard'
              disableUnderline={true}
              style={{
                color: "#FFF",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                width: "100%",
              }}
            >
              <MenuItem
                value='select-token'
                disabled
                style={{ display: "none" }}
              >
                {t("purchaseConetian.selectYourToken")}
              </MenuItem>

              <ListSubheader
                key={`subheader-bnb`}
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  lineHeight: "14px",
                  background: "none",
                }}
              >
                Binance
              </ListSubheader>

              {validateFunds('wusdt') ? (
                <MenuItem
                  value={`${profile?.tokens?.wusdt?.network}-${profile?.tokens?.wusdt?.name}`}
                >
                  <Image
                    width={25}
                    height={25}
                    src={Img.UsdtBnbIcon}
                    alt='bnb-icon'
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  />
                  USDT
                </MenuItem>
              ) : (
                <ListSubheader
                  key={`insuficient-bnb-nwusdt`}
                  style={{
                    fontSize: "12px",
                    lineHeight: "14px",
                    background: "none",
                    paddingBottom: "8px",
                  }}
                >
                  {t("purchaseConetian.insufficientFunds")}
                </ListSubheader>
              )}

              {validateFunds('bnb') ? (
                <MenuItem
                  value={`${profile?.tokens?.bnb?.network}-${profile?.tokens?.bnb?.name}`}
                >
                  <Image
                    width={25}
                    height={25}
                    src={Img.BnbIcon}
                    alt='usdt-icon'
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  />
                  BNB
                </MenuItem>
              ) : (
                <ListSubheader
                  key={`insuficient-bnb-solo`}
                  style={{
                    fontSize: "12px",
                    lineHeight: "14px",
                    background: "none",
                    paddingBottom: "8px",
                  }}
                >
                  {t("purchaseConetian.insufficientFunds")}
                </ListSubheader>
              )}
            </Select>
          </Button>
        </Box>

        <Box display={'flex'} flexDirection={'row'} gap={'8px'} justifyContent={'center'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} color={'#929092'} fontSize={'16px'}>
            {t('purchaseConetian.total')}
          </Box>

          <Box fontSize={'32px'} color={'#F6F1F2'}>
            {!isLoadingPrices ? (
              <Box display={"flex"} gap={2} alignItems={"center"}>
                <Typography fontSize={[20, 40, 60]}>
                  {selectedCoin == "none"
                    ? CONETIAN_PRICE * amount
                    : Number.isInteger(
                      amount * nftPriceByCoin
                    )
                      ? amount * nftPriceByCoin
                      : (amount * nftPriceByCoin).toFixed(
                        4
                      )}
                </Typography>
                <Typography fontSize='26px'>
                  {displayCoin ? displayCoin.toUpperCase() : 'USDT'}
                </Typography>
              </Box>
            ) : (
              <Skeleton
                variant='rectangular'
                width={"100%"}
                height={85}
              />
            )}
          </Box>
        </Box>

        {/* Agreement */}
        <Box
          borderRadius='16px'
          padding='24px'
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          bgcolor={"#262626"}
          style={{ cursor: "pointer" }}
        >
          <Box
            display='flex'
            gap='8px'
            alignItems='center'
            justifyContent='space-between'
            onClick={() => setIsAgreementOpen(prev => !prev)}
          >
            <Typography
              textAlign='center'
              color={"#FFFFFF"}
            >
              {t("purchaseConetian.agreement")}
            </Typography>
            <SvgIcon
              style={{
                color: "#FFFFFF",
              }}
              component={KeyboardArrowDownIcon}
              inheritViewBox
              sx={{ fontSize: 24 }}
            />
          </Box>

          {isAgreementOpen && (
            <Stack
              style={{
                maxHeight: "320px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
              fontSize={"14px"}
              marginTop={"16px"}
              padding={"0 24px"}
              gap={2}
              color={"#FFFFFF"}
            >
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.first')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.second')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.third')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.fourth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.fifth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.sixth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.seventh')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.eighth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.ninth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.tenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.eleventh')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twelfth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.thirteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.fourteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.fifteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.sixteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.seventeenth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.eighteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.nineteenth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentieth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.twentyFirst')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentySecond')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentyThird')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.twentyFourth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentyFifth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.twentySixth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentySeventh')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.twentyEighth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.twentyNinth')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.thirtieth')}
              </Typography>
              <Typography fontWeight={700}>
                {t('purchaseConetian.agreementText.thirtyFirst')}
              </Typography>
              <Typography>
                {t('purchaseConetian.agreementText.thirtySecond')}
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={() =>
                  setIsAgreementSigned(prev => !prev)
                }
              >
                <Checkbox
                  checked={isAgreementSigned}
                ></Checkbox>
                <Typography
                  style={{
                    fontSize: "12px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                  color={"#FFFFFF"}
                >
                  {t("purchaseConetian.confirmAgreement")}
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>

        <FlexDiv $margin="0 0 100px 0" $width="100%" $direction="column">
          <GradientButton
            width="100%"
            height="56px"
            onClick={handlePurchase}
            disabled={(agentWallet && !isAgentWallet) || amount <= 0 || !isAgreementSigned || !validateFunds(selectedCoin)}
            cursor="pointer"
          >
            {t("purchaseConetian.estimateGas")}
          </GradientButton>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetian;
