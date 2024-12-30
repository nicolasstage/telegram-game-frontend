import { Button } from '@/components/button';
import { Div, FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { Img } from '@/utilitiy/images';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  pageState: 1 | 2 | 3 | 4 | 5;
  prizeNumber: number;
  doubleImageState: ImageStateType;
  handleDouble: () => void;
  backToRoulette: () => void;
  spinningCounter: number | undefined;
  doubleFinished: boolean;
  doubleRunning: boolean;
}

type ImageStateType = 'off' | 'win' | 'lose';

const ImageScheme: Record<ImageStateType, any> = {
  off: [Img.DoubleWin, Img.DoubleLose],
  win: [Img.DoubleWinHighlight, Img.DoubleLose],
  lose: [Img.DoubleWin, Img.DoubleLoseHighlight],
}

export default function PageState2({ pageState, doubleImageState, prizeNumber, handleDouble, backToRoulette, spinningCounter, doubleFinished, doubleRunning }: Props) {

  const { t } = useTranslation();

  useEffect(() => {
    if (spinningCounter === 0) {
      backToRoulette();
    }
  }, [spinningCounter])

  return (
    <>
      <FlexDiv $direction="column" $align="center" $margin="20px 0 0 0" $padding="20px 0 0 0" $gap="40px" $height="400px" className="stars-bg">
        <FlexDiv $direction="column" $gap="24px" $width="296px" $align="center">
          {
            doubleFinished ? (
              pageState === 4 ? (
                <P $fontSize="24px" $align="center">{t("components.roulette.ps2.lost")}</P>
              ) : (
                <>
                  <P $fontSize="24px" className="white-text-shadow">{t("components.roulette.ps2.youWon")}</P>
                  <P $fontSize="32px" className="white-text-shadow">{prizeNumber || 0} {t("components.roulette.ps2.extraCNTP")}</P>
                </>
              )
            ) : (
              doubleRunning ? (
                <></>
              ) : (
                <>
                  <P $fontSize="24px" $align="center" className="white-text-shadow">{t("components.roulette.ps2.tryDouble")}</P>
                  <P $fontSize="18px" $align="center">{t("components.roulette.ps2.youWonAmount", { amount: prizeNumber || 0 })}</P>
                </>
              )
            )
          }
        </FlexDiv>

        <FlexDiv $gap="20px" $width="100%" $height="400px">
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme?.[doubleImageState]?.[0]} alt={t("components.roulette.ps2.win")} fill style={{ objectFit: "contain" }} />
          </FlexDiv>
          <FlexDiv $position="relative" style={{ flex: 1 }} $justify="center" $align="center">
            <Image src={ImageScheme?.[doubleImageState]?.[1]} alt={t("components.roulette.ps2.lose")} fill style={{ objectFit: "contain" }} />
          </FlexDiv>
        </FlexDiv>

        {
          !doubleRunning && (
            <P>{spinningCounter}</P>
          )
        }

      </FlexDiv>
      <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="20px">
        {
          pageState !== 4 && (
            <div className="highlight-button-wrapper">
              <Button $background="#111113" $width="196px" $height="45px" $radius="8px" onClick={handleDouble}>
                {t("components.roulette.ps2.tryToDouble")}
              </Button>
            </div>
          )
        }
      </FlexDiv>
    </>
  )
}
