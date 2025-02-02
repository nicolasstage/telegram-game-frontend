import React from 'react';
import { useGameContext } from '../../utilitiy/providers/GameProvider';
// import { BackgroundAudio } from '../../shared/assets';
import { formatToken } from '../../shared/functions';
import { Button, GradientButton } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { useTranslation } from 'react-i18next';

type Props = {
  setRestart: () => void,
  score: number,
  hScore: number,
}

const GameOver: React.FC<Props> = ({ setRestart, score, hScore }) => {
  const { t } = useTranslation();

  const { setRouter, profile } = useGameContext();

  return (
    <div className='flex flex-col' style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      padding: '20px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'auto',
      alignItems: 'center',
      gap: '16px'
    }}>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: "40px", alignItems: "center", height: "100%" }}>
        <div style={{ alignItems: "center", justifyContent: "center", width: "100%", textAlign: "center" }}>
          <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>{t("components.gameOver.currentScore")}</p>
          <p style={{ color: "white", fontSize: "1.8rem", marginBlock: 0 }}>{score}</p>
        </div>

        <div style={{ alignItems: "center", justifyContent: "center", width: "100%", textAlign: "center" }}>
          <p style={{ color: "white", fontSize: "2rem", margin: 0, marginBlock: 0 }}>{t("components.gameOver.highestScore")}</p>
          <p style={{ color: "white", fontSize: "1.8rem", margin: 0, marginBlock: 0 }}>{hScore}</p>
        </div>

        {
          profile && profile?.tokens?.cCNTP?.balance >= 0 &&
          <div style={{ alignItems: "center", justifyContent: "center", width: "100%", textAlign: "center" }}>
            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>{t("components.gameOver.cntpBalance")}</p>
            <p style={{ color: "white", fontSize: "1.8rem", margin: 0 }}>{formatToken(profile?.tokens?.cCNTP?.balance)}</p>
          </div>
        }
      </div>

      <div style={{ gap: "16px", alignItems: "center", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <GradientButton radius='8px' width='200px' onClick={setRestart}>
            {t("components.gameOver.restartButton")}
          </GradientButton>
        </div>

        <Button $width="196px" $height="45px" $radius="8px" $color="rgba(121, 248, 255, 1)" onClick={() => { setRestart(); setRouter?.("/") }}>
          {t("components.gameOver.mainMenuButton")}
        </Button>
      </div>
    </div>
  )
}

export default GameOver;
