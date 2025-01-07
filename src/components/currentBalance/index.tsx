import Image from 'next/image';
import { FlexDiv } from '../div';
import { Img } from '@/utilitiy/images';
import { P } from '../p';
import Skeleton from 'react-loading-skeleton';
import { firstLetterUpperCase, formatToken } from '@/utilitiy/functions';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { useTranslation } from 'react-i18next';

type Asset = 'cntp' | 'conet' | 'ticket' | 'conetian' | 'conetianReferrer';

interface Props {
  inline?: boolean;
  asset: Asset;
  secondaryAsset?: Asset;
  showBnb?: boolean;
}

export default function CurrentBalance({ inline = false, asset = 'cntp', secondaryAsset, showBnb = false }: Props) {
  const fontSize = inline ? 16 : 20;
  const { profile } = useGameContext();

  const { t } = useTranslation();

  const getFormattedBalance = (_asset: string) => {
    if (_asset === 'cntp')
      return formatToken(profile?.tokens?.cCNTP?.balance);
    if (_asset === 'conet')
      return profile?.tokens?.conet?.balance;
    if (_asset === 'ticket')
      return profile?.tickets?.balance;
    if (_asset === 'conetian')
      return profile?.tokens?.ConetianNFT?.balance;
    if (_asset === 'conetianReferrer')
      return profile?.tokens?.ConetianAgentNFT?.balance;
  };

  const getAssetFriendlyName = (_asset: string) => {
    switch (_asset) {
      case 'cntp':
        return 'CNTP'
      case 'conet':
        return 'CONET'
      case 'ticket':
        return "Ticket"
      case 'conetian':
        return 'Conetian NFT'
      case 'conetianReferrer':
        return 'Conetian Agent NFT'
      default:
        return 'CNTP'
    }
  };

  const getSingularOrPlural = (asset: string) => {
    const _balance = parseFloat(getFormattedBalance(asset));

    if (_balance > 1 && asset === 'ticket') return 'S';

    return '';
  }

  return (
    <FlexDiv $direction="column" $gap="12px" $width="100%">
      {
        inline ? (
          <FlexDiv $gap="8px" $align="center">
            <P $fontSize={`${fontSize}px`}>{t("components.currentBalance.assetBalance", { asset: firstLetterUpperCase(asset) })}</P>

            <P $fontSize={`${fontSize + 4}px`}>
              {profile ? (
                getFormattedBalance(asset)
              ) : (
                <Skeleton width={200} />
              )}
            </P>
          </FlexDiv>
        ) : (
          <>
            <FlexDiv $gap="8px" $align="center">
              <Image src={Img.LogoImg} width={32} height={32} alt={t("components.currentBalance.conetAltText")} />
              <P $fontSize={`${fontSize}px`}>{t("components.currentBalance.currentBalance")}</P>
            </FlexDiv>

            <FlexDiv $gap="8px" $align="flex-start" $direction="column" $justify="flex-start">
              <FlexDiv $align="center" $gap="6px">
                <P $fontSize={`${fontSize + 4}px`}>
                  {profile ? (
                    getFormattedBalance(asset)
                  ) : (
                    <Skeleton width={200} />
                  )}
                </P>
                <P>{t("components.currentBalance.assetLabel", { asset: getAssetFriendlyName(asset).toUpperCase(), plural: getSingularOrPlural(asset) })}</P>
              </FlexDiv>

              {
                secondaryAsset && (
                  <FlexDiv $align="center" $gap="6px">
                    <P $fontSize="12px">{getFormattedBalance(secondaryAsset)}</P>
                    <P $fontSize="12px">{t("components.currentBalance.secondaryAssetLabel", { secondaryAsset: secondaryAsset.toUpperCase() })}</P>
                  </FlexDiv>
                )
              }

              {showBnb && (
                <>
                  <FlexDiv $align="center" $gap="6px">
                    <P $fontSize="12px">
                      {profile?.tokens?.bnb?.balance}
                    </P>
                    <P $fontSize="12px">BNB</P>
                  </FlexDiv>

                  <FlexDiv $align="center" $gap="6px">
                    <P $fontSize="12px">
                      {profile?.tokens?.wusdt?.balance}
                    </P>
                    <P $fontSize="12px">USDT</P>
                  </FlexDiv>
                </>
              )}
            </FlexDiv>
          </>
        )
      }
    </FlexDiv>
  )
}
