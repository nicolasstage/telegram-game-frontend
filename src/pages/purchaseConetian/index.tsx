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

  const { setRouter, setConetianPurchaseDetails, profile, oracleAssets, isDebox } = useGameContext();

  function validateFunds(asset: string): boolean {
    let userBalance = profile?.tokens?.[asset]

    if (!oracleAssets) return false

    const _oracleAssets: { name: string, price: string }[] = oracleAssets.assets
    const foundAsset: any = findAsset(asset)

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
      case "BSC-bnb":
        setCoinImage(Img.BnbIcon);
        break;
      case "BSC-wusdt":
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
                <li>  Exclusive CoNETian NFT</li>
                <li>  1,000 $CONET token after TGE</li>
                <li>  Node Participation Rights</li>
                <li>  Free use of Silent Pass for 1 year</li>
                <li>  20% off on Power Card Purchase</li>
                <li>  Exclusive Airdrop allocation</li>
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

        {!isDebox && (
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
            <Typography fontSize={'12px'} color="#C70039">{agentError}</Typography>
          </FlexDiv>
        )}

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
                  Insufficient Funds
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
                NFT Token Presale Purchase Agreement
              </Typography>
              <Typography>
                This Conetian Plan NFT Presale Agreement (the &quot;Agreement&quot;) is entered into as
                of 11/06/2024, by and between CoNET Network Foundation (hereinafter
                referred to as the &quot;Issuer&quot;), and the undersigned public participant (hereinafter
                referred to as the &quot;Participant&quot;).
              </Typography>
              <Typography fontWeight={700}>
                1. DEFINITIONS
              </Typography>
              <Typography>
                1.1 &quot;Conetian Plan Presale&quot; refers to the sale of Conetian Plan non-fungible
                tokens (NFTs) conducted by the Issuer, granting participation rights and
                benefits within the CoNET network and its ecosystem.
              </Typography>
              <Typography>
                1.2 &quot;NFT&quot; refers to the unique digital asset offered by the Issuer as part of the
                Conetian Plan, representing specific benefits, access, and incentives in the
                CoNET network, including $CONET tokens, discount privileges, and eligibility
                for node operation.
              </Typography>
              <Typography>
                1.3 &quot;$CONET&quot; refers to the CoNET tokens allocated to Conetian Plan NFT
                holders, distributed after the Token Generation Event (TGE).
              </Typography>
              <Typography fontWeight={700}>
                2. PARTICIPATION
              </Typography>
              <Typography>
                2.1 The Participant agrees to purchase the Conetian Plan NFT at the price
                specified on the official CoNET Presale Platform.
              </Typography>
              <Typography>
                2.2 The Participant acknowledges that participation in the Conetian Plan NFT
                Token Presale carries inherent risks and is responsible for conducting
                independent research before purchasing.
              </Typography>
              <Typography fontWeight={700}>
                3. PRICE AND PAYMENT
              </Typography>
              <Typography>
                3.1 The price for each Conetian Plan NFT during the presale phase corresponds
                to the bundled token value of $CONET at the pre-sale pricing. Payments may
                be made in USDT, BUSD, ETH, or BNB.
              </Typography>
              <Typography>
                3.2 NFTs are available for purchase globally, subject to applicable legal
                restrictions in the Participant’s jurisdiction.
              </Typography>
              <Typography fontWeight={700}>
                4. BENEFITS OF THE NFT PURCHASE
              </Typography>
              <Typography>
                4.1 $CONET Token Allocation: Each Conetian Plan NFT includes an allocation
                of 1,000 $CONET tokens at the presale price.
              </Typography>
              <Typography>
                4.2 Power Card Discount: NFT holders are entitled to a 20% discount on
                Power Card purchases within the CoNET ecosystem.
              </Typography>
              <Typography>
                4.3 Node Participation Rights: Conetian Plan NFT holders gain eligibility to
                operate either a Full or Partial Node in the CoNET network, enabling them to
                earn rewards for contributing resources to the decentralized infrastructure.
              </Typography>
              <Typography>
                4.4 Airdrop Allocation: Conetian Plan NFT holders receive enhanced
                allocations for future $CONET airdrops and exclusive access to additional
                benefits within the CoNET ecosystem.
              </Typography>
              <Typography fontWeight={700}>5. RESPONSIBILITIES OF THE ISSUER</Typography>
              <Typography>
                5.1 The Issuer shall make every effort to conduct the Conetian Plan NFT Token
                Presale in a fair and transparent manner.
              </Typography>
              <Typography>
                5.2 The Issuer makes no guarantee of future value for NFTs or $CONET tokens.
                The Participant acknowledges the speculative nature of digital asset
                investment.
              </Typography>
              <Typography fontWeight={700}>
                6. RISKS
              </Typography>
              <Typography>
                6.1 The Participant acknowledges that purchasing Conetian Plan NFTs involves
                risks, including but not limited to market volatility, regulatory uncertainties, and
                technology risks.
              </Typography>
              <Typography>
                6.2 The Participant understands and accepts that the value of Conetian Plan
                NFTs and $CONET tokens may fluctuate and carries a risk of loss.
              </Typography>
              <Typography fontWeight={700}>
                7. COMPLIANCE WITH LAWS
              </Typography>
              <Typography>
                7.1 The Participant agrees to comply with all applicable laws and regulations
                regarding the purchase, holding, and potential transfer of Conetian Plan NFTs
                and digital assets within their jurisdiction.
              </Typography>
              <Typography fontWeight={700}>
                8. DISCLAIMERS
              </Typography>
              <Typography>
                8.1 The Issuer disclaims any warranties, express or implied, regarding the
                Conetian Plan NFTs and the presale, including but not limited to
                merchantability, fitness for a particular purpose, and any anticipated success of
                the project.
              </Typography>
              <Typography fontWeight={700}>
                9. MISCELLANEOUS
              </Typography>
              <Typography>
                9.1 This Agreement constitutes the entire understanding between the parties,
                superseding all prior agreements related to the Conetian Plan NFT Token
                Presale.
              </Typography>
              <Typography>
                9.2 Amendments to this Agreement must be made in writing and signed by both
                parties.
              </Typography>
              <Typography>
                IN WITNESS WHEREOF, the parties hereto have executed this Conetian Plan
                NFT Token Presale Purchase Agreement as of the date first above written.
              </Typography>
              <Typography>CoNET Labs</Typography>
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
            height="56px"
            onClick={handlePurchase}
            disabled={(agentWallet && !isAgentWallet) || amount <= 0 || !isAgreementSigned || !validateFunds(selectedCoin)}
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
