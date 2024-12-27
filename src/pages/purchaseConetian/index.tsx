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

const PurchaseConetian = () => {
  const assetName = "cCNTP";

  const [amount, setAmount] = useState<number>(0);
  const [isValidAmount, setIsValidAmount] = useState<boolean>(false);
  const [agentWallet, setAgentWallet] = useState<string>("");
  const [isAgentWallet, setIsAgentWallet] = useState<boolean>(false);
  const [isAddressChecking, setIsAddressChecking] = useState<boolean>(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState<boolean>(false)
  const [isAgreementSigned, setIsAgreementSigned] = useState<boolean>(false)
  const [coinImage, setCoinImage] = useState<string>("");
  const [displayCoin, setDisplayCoin] = useState<string>("usdt");
  const [asset, setAsset] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [isLoadingPrices, setIsLoadingPrices] = useState<boolean>(false)
  const [nftPriceByCoin, setNftPriceByCoin] = useState<number>(100);
  const [total, setTotal] = useState<number>(0);

  const { setRouter, setConetianPurchaseDetails, profile, oracleAssets } = useGameContext();

  function validateFunds(asset: string): boolean {
    if (asset === 'arbETH') asset = 'arb_eth'

    let userBalance = profile?.tokens?.[asset]

    if (asset == 'tron') {
      userBalance = parseFloat(profile?.tokens?.tron?.tron?.balance)
      return !!userBalance
    }

    if (asset == 'tron-usdt') {
      userBalance = parseFloat(profile?.tokens?.tron?.usdt?.balance)
      return !!userBalance
    }

    if (!oracleAssets) return false

    const _oracleAssets: { name: string, price: string }[] = oracleAssets.assets
    const foundAsset = findAsset(asset)

    return parseFloat(userBalance?.balance) >= parseFloat((CONETIAN_PRICE / parseFloat(foundAsset?.price).toFixed(4)) * amount).toFixed(4)

    function findAsset(asset: string): { name: string, price: string } | undefined {
      return _oracleAssets.find((a) => a.name === asset)
    }
  }

  const handleAgentWalletChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setAgentWallet(e.target.value);
    try {
      setIsAddressChecking(true);
      /* TODO: check if agent wallet is valid */
      // const _isAgentWallet = await fetchIsAddress(e.target.value);
      const _isAgentWallet = [true];
      if (_isAgentWallet[0]) setIsAgentWallet(true);
      else setIsAgentWallet(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAddressChecking(false);
    }
  };

  const handleChangeNftAmount = (e: any) => {
    const value = Number(e.target.value)

    if (typeof value === 'number' && !isNaN(value))
      setAmount(value)
  }

  const handleIncreaseNftAmount = () => {
    setAmount(prev => prev + 1)
  }

  const handleDecreaseNftAmount = () => {
    setAmount(prev => prev - 1)
  }

  const handleCoinChange = async (event: any) => {
    changeCoinImage(event.target.value);
    selectAsset(event.target.value.split("-")[0].toLowerCase());
    setSelectedCoin(event.target.value.split("-")[1]);
  };

  function changeCoinImage(value: any) {
    switch (value) {
      case "BSC-bnb":
        setCoinImage(Img.BnbIcon);
        break;
      case "ETH-usdt":
        setCoinImage(Img.UsdtIcon);
        break;
      default:
        setCoinImage(Img.UsdtIcon);
        break;
    }
  }

  const selectAsset = (asset: string) => {
    switch (asset) {
      case "bsc":
        setAsset("bnb");
        break;
      case "eth":
        setAsset("usdt");
        break;
      default:
        setAsset("usdt");
        break;
    }
  };

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
      setNftPriceByCoin(100);
    } else {
      coin_price
        ? await setNftPriceByCoin(
          (100 / parseFloat(coin_price)).toFixed(4)
        )
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
    if (!isAgentWallet || amount <= 0 || !isAgreementSigned) {
      return;
    }

    // set transfer token details for confirmation page
    setConetianPurchaseDetails?.({
      agentWallet,
      selectedCoin,
      amount,
      nftPriceByCoin,
      total
    });

    setRouter?.("/purchaseConetianConfirm");
  };

  return (
    <PageWrapper>
      <BackButton text="Become a CoNETian" to="/" />

      {/* user information */}
      <FlexDiv $gap="16px">
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
      <FlexDiv $gap="24px" $direction="column" >
        <img src={Img.BuyConetianBanner} alt="buy conetian banner" style={{ width: "100%" }} />

        <FlexDiv $direction="column" $gap="16px">
          <FlexDiv $direction="column" $gap="8px">
            <FlexDiv>
              <P $color="#79F8FF" $fontSize="14px">
                CoNETian Benefits
              </P>
            </FlexDiv>

            <FlexDiv $direction="column">
              <ul style={{ paddingLeft: "20px", color: "#C8C6C8", fontSize: "14px" }}>
                <li>
                  NFT and Early Access Tokens
                </li>
                <li>
                  Node Participation Rights
                </li>
                <li>
                  Potential Earnings from Token Launch Price
                </li>
                <li>
                  $CONET Compensation for Silent Pass Usage
                </li>
              </ul>
            </FlexDiv>
          </FlexDiv>

          <FlexDiv >
            <P $color="#929092" $fontSize="12px">Duration: Ongoing benefits until further notice</P>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      {/* title */}
      <FlexDiv $justify="space-between" $align="center" $margin="18px 0 0 0">
        <P $fontSize="24px">
          Become a CoNETian
        </P>
      </FlexDiv>

      {/* inputs */}
      <FlexDiv $direction="column" $padding="0 10px" $gap="32px">
        <FlexDiv $direction="column" $gap="4px">
          <P>Select Quantity</P>

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
          <P>Agent Wallet</P>

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
                  placeholder="Wallet Address"
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
          <Typography fontSize={'12px'} color="#E4E4E5">*Get extra tokens if referral from an agent</Typography>
        </FlexDiv>

        {/* Token Select */}
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
          <P>
            Pay in
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
                Select your token
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

              {validateFunds('bnb') ? (
                <MenuItem
                  value={`${profile?.tokens?.bnb?.network}-${profile?.tokens?.bnb?.name}`}
                >
                  <Image
                    width={25}
                    height={25}
                    src={Img.BnbIcon}
                    alt='bnb-icon'
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
                  Insufficient Funds
                </ListSubheader>
              )}

              <ListSubheader
                key={`subheader-eth`}
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  lineHeight: "14px",
                  background: "none",
                }}
              >
                Ethereum
              </ListSubheader>

              {validateFunds('usdt') ? (
                <MenuItem
                  value={`${profile?.tokens?.usdt?.network}-${profile?.tokens?.usdt?.name}`}
                >
                  <Image
                    width={25}
                    height={25}
                    src={Img.UsdtIcon}
                    alt='usdt-icon'
                    style={{
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  />
                  USDT
                </MenuItem>
              ) : (
                <ListSubheader
                  key={`insuficient-eth-usdth`}
                  style={{
                    fontSize: "12px",
                    lineHeight: "14px",
                    background: "none",
                    paddingBottom: "8px",
                  }}
                >
                  Insufficient Funds
                </ListSubheader>
              )}
            </Select>
          </Button>
        </Box>

        <Box display={'flex'} flexDirection={'row'} gap={'8px'} justifyContent={'center'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} color={'#929092'} fontSize={'16px'}>
            Total
          </Box>

          <Box fontSize={'32px'} color={'#F6F1F2'}>
            {!isLoadingPrices ? (
              <Box display={"flex"} gap={2} alignItems={"center"}>
                <Typography fontSize={[20, 40, 60]}>
                  {selectedCoin == "none"
                    ? 100 * amount
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
              Agreement
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
                IGO (Initial Guardian Offering) AGREEMENT
              </Typography>
              <Typography>
                This IGO Agreement (the "Agreement") is entered into as of Oct 5, 2024, by and
                between CoNET Network Foundation (hereinafter referred to as the "Issuer"),
                and the undersigned public participant (hereinafter referred to as the
                "Participant").
              </Typography>
              <Typography fontWeight={700}>
                1. DEFINITIONS
              </Typography>
              <Typography>
                1.1 "IGO" refers to the Initial Guardian Offering conducted by the Issuer for the
                sale of its CoNET Guardian Plan.
              </Typography>
              <Typography>
                1.2 "CNTP" refers to the CoNET Super Node Points, and "Guardian Plan" refers
                to the product offered during the IGO for participation in the CoNET network..
              </Typography>
              <Typography fontWeight={700}>
                2. PARTICIPATION
              </Typography>
              <Typography>
                2.1 The Participant agrees to purchase a Guardian Plan at the price specified in
                the IGO official CoNET Platform.
              </Typography>
              <Typography>
                2.2 The Participant acknowledges that participation in the IGO carries inherent
                risks and is solely responsible for conducting independent research before
                participating.
              </Typography>
              <Typography fontWeight={700}>
                3. Guardian Plan PRICE AND PAYMENT
              </Typography>
              <Typography>
                3.1 The price per Guardian Plan during the IGO is set at USDT$1,250 per
                Guardian Plan. Payments can be made in USDT, BUSD, ETH, or BNB.
              </Typography>
              <Typography>
                3.2 The Guardian Plan is available for sale to users worldwide, including all
                CoNET community members.
              </Typography>
              <Typography>
                3.3  New Benefits:
              </Typography>
              <Typography>
                Daily Earnings: Participants of the Guardian Plan will earn daily
                rewards by validating transactions and contributing resources
                (bandwidth, CPU) as part of CoNET’s Decentralized Physical
                Infrastructure Network (DePIN).
              </Typography>
              <Typography>
                Revenue Sharing: After the Token Generation Event (TGE), Guardian
                Plan holders will benefit from revenue-sharing opportunities as the
                network grows.
              </Typography>
              <Typography>
                No More Repurchase: The previous repurchase program has been
                discontinued for new purchases. However, the Guardian Plan now
                includes enhanced benefits such as larger airdrop allocations,
                validator node functionality, and earning opportunities from network
                services like Silent Pass VPN and CoNET’s decentralized applications.
              </Typography>
              <Typography>
                Validator and Full Node: Guardian Plan holders will function as
                validators and full nodes without the need for staking additional
                tokens, earning rewards from transaction validation and resourcesharing
                activities.
              </Typography>
              <Typography>
                3.4 The Participant agrees to pay the total amount in full at the time of
                participation.
              </Typography>
              <Typography fontWeight={700}>
                4. RESPONSIBILITIES OF THE ISSUER
              </Typography>
              <Typography>
                4.1 The Issuer shall use its best efforts to conduct the IGO in a fair and
                transparent manner.
              </Typography>
              <Typography>
                4.2 The Issuer makes no guarantees regarding the future value of digital assets
                issued, and the Participant acknowledges the speculative nature of investing in
                digital assets.
              </Typography>
              <Typography fontWeight={700}>5. RISKS</Typography>
              <Typography>
                5.1 The Participant acknowledges that the purchase of Guardian Plans involves
                risks, including but not limited to market risks, regulatory risks, and technology
                risks.
              </Typography>
              <Typography>
                5.2 The Participant understands and accepts that the value of Guardian Plans
                may fluctuate, and there is a risk of losing the entire investment.
              </Typography>
              <Typography fontWeight={700}>
                6. COMPLIANCE WITH LAWS
              </Typography>
              <Typography>
                6.1 The Participant agrees to comply with all applicable laws and regulations in
                their jurisdiction regarding the purchase and possession of Guardian Plans.
              </Typography>
              <Typography fontWeight={700}>
                7. DISCLAIMERS
              </Typography>
              <Typography>
                7.1 The Issuer disclaims any warranties, express or implied, regarding the
                Guardian Plans, Super Nodes, and the IGO, including but not limited to
                merchantability and fitness for a particular purpose.
              </Typography>
              <Typography fontWeight={700}>
                8. MISCELLANEOUS
              </Typography>
              <Typography>
                8.1 This Agreement constitutes the entire understanding between the parties
                and supersedes all prior agreements.
              </Typography>
              <Typography>
                8.2 Amendments to this Agreement must be in writing and signed by both
                parties.
              </Typography>
              <Typography>
                IN WITNESS WHEREOF, the parties hereto have executed this IGO Agreement
                as of the date first above written.
              </Typography>
              <Typography>CoNET Foundation</Typography>
              <Typography>Oct 5, 2024</Typography>

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
                  I agree with the terms and conditions above
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>

        <FlexDiv $margin="0 0 100px 0" $width="100%" $direction="column">
          <GradientButton
            width="100%"
            onClick={handlePurchase}
            disabled={(agentWallet && !isAgentWallet) || amount <= 0 || !isAgreementSigned}
            cursor="pointer"
          >
            Estimate Gas
          </GradientButton>
        </FlexDiv>
      </FlexDiv>
    </PageWrapper>
  );
};

export default PurchaseConetian;
