import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import { rouletteResultMapping, wheelData } from '@/shared/wheelVars';
import { Img } from '@/utilitiy/images';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { rouletteDesign } from '@/shared/assets';
import React, { useEffect, useState } from 'react';
import { PointerProps } from 'react-custom-roulette/dist/components/Wheel/types';
import SpinButton from './page-components/spinButton';
import { fetchUnlockTicket } from '@/API/getData';
import { toast } from 'react-hot-toast';
import { MemoizedWheel } from '../../components/spinningWheel';
import { useTranslation } from 'react-i18next';

interface Props {
  pageState: 1 | 2 | 3 | 4 | 5;
  isSpinning: boolean;
  handleSpin: () => void;
  mustSpin: boolean;
  setMustSpin: (e: boolean) => void;
  prizeNumber: number;
  currentTicketAmount: number
}

const pointerProperties: PointerProps = {
  style: { visibility: "hidden" }
}

export default function PageState1({ pageState, isSpinning, handleSpin, mustSpin, setMustSpin, prizeNumber, currentTicketAmount }: Props) {

  const { t } = useTranslation();
  const { profile, spinningCounter } = useGameContext();
  const [isUnlockingTicket, setIsUnlockingTicket] = useState<boolean>(false);

  useEffect(() => {
    if (profile?.isTicketUnlocked) {
      setIsUnlockingTicket(false);
    }
  }, [profile])

  const handleTicketUnlock = async () => {
    setIsUnlockingTicket(true);

    const result = await fetchUnlockTicket(profile?.keyID);

    // if result is true, unlockTicket is started, disable button until unlockTicket is finished
    // if result is false, unlockTicket is not started, enable button and show error message
    if (result?.error) {
      console.log(result?.message);

      setTimeout(() => {
        setIsUnlockingTicket(false);
      }, 2000);
    }
  }

  return (
    <FlexDiv $direction="column" $align="center" $margin="40px 0 0 0" $gap="40px">
      <div style={{ maxWidth: "325px" }}>
        {pageState === 1 ? (
          <P className="white-text-shadow" $fontSize="24px" $align="center">{t("components.roulette.ps1.spinMessage")}</P>
        ) : (
          <>
            <P className="white-text-shadow" $fontSize="24px" $align="center">{t("components.roulette.ps1.youLose")}</P>
            <P className="white-text-shadow" $fontSize="24px" $align="center">{t("components.roulette.ps1.noExtraCNTP")}</P>
          </>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
        <img src={rouletteDesign.src} style={{ width: "85%", maxWidth: '483px', position: 'absolute', zIndex: 2 }} />
        <div style={{ flex: 1, position: "relative", zIndex: 1, transform: "rotate(43deg)" }}>
          <MemoizedWheel
            mustStartSpinning={mustSpin}
            prizeNumber={rouletteResultMapping[prizeNumber] ?? 0}
            data={wheelData}
            spinDuration={0.5}
            outerBorderColor="#f5eeee"
            outerBorderWidth={1}
            radiusLineWidth={0}
            fontSize={12}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            pointerProps={pointerProperties}
          />
        </div>
      </div>

      <FlexDiv $direction="column" $gap="16px" $align='center' $justify='center'>
        <SpinButton spinningCounter={spinningCounter} ticketBalance={currentTicketAmount?.toString()} pageState={pageState} isTicketUnlocked={profile?.isTicketUnlocked} isSpinning={isSpinning} handleSpin={handleSpin} handleTicketUnlock={handleTicketUnlock} isUnlockingTicket={isUnlockingTicket} />

        <FlexDiv $align="center" $justify="center" $gap="8px">
          {currentTicketAmount === 0 && !mustSpin ? (
            <P $fontSize="12px" $color='#FFDAD6' $align='center' $width='70%'>{t("components.roulette.ps1.notEnoughTickets")}</P>
          ) : (
            <>
              <Image src={Img.Tickets} alt="Ticket" width={20} height={20} />
              <P $fontSize="12px">{t("components.roulette.ps1.useTicketMessage")}</P>
            </>
          )}
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
}
