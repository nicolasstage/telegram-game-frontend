import BackButton from '@/components/backButton';
import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import PageWrapper from '@/components/pageWrapper';
import { ButtonClick } from '@/shared/assets';
import { Img } from '@/utilitiy/images';
import { Difficulty, useGameContext } from '@/utilitiy/providers/GameProvider';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useAudioPlayer } from 'react-use-audio-player';
import { useTranslation } from 'react-i18next';
import Languages from '@/components/languages';

const difficulties: Difficulty[] = ["easy", "normal", "hard"];

export default function Settings() {
  const { t } = useTranslation();

  const {
    setRouter,
    difficulty,
    setDifficulty,
    musicVolume,
    setMusicVolume,
    effectsVolume,
    setEffectsVolume,
  } = useGameContext();

  const musicRef = useRef<any>();
  const effectsRef = useRef<any>();

  const { load, setVolume } = useAudioPlayer();

  function updateTrackColor(element: HTMLInputElement | undefined, value: string) {
    if (!element) return;

    element.style.setProperty('--track-width', `${value}%`);
  }

  useEffect(() => {
    updateTrackColor(musicRef.current, String(musicVolume));
    updateTrackColor(effectsRef.current, String(effectsVolume));
  }, [effectsVolume, musicVolume]);

  useEffect(() => {
    setVolume(effectsVolume || effectsVolume === 0 ? effectsVolume / 100 : 1);
  }, [effectsVolume])

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text={t('settings.backButtonText')} />

      <FlexDiv $direction="column" $align="center">
        <P $alignSelf="flex-start" $fontSize="24px">{t('settings.gameModeTitle')}</P>
        <Image width={260} height={260} alt="Conetian" src={Img.SettingsConetian} />
        <FlexDiv $gap="16px" $width="100%">
          {
            difficulties.map((currDifficulty) => (
              <Button
                key={currDifficulty}
                $padding="12px"
                $radius="16px"
                $border={currDifficulty === difficulty ? "1px solid #04DAE8" : "1px solid #787679"}
                $flex={1}
                $fontSize="18px"
                onClick={() => setDifficulty?.(currDifficulty)}
              >
                {t(`settings.difficulties.${currDifficulty}`)}
              </Button>
            ))
          }
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $padding="16px" $direction="column" $gap="12px" $border="1px solid rgba(255, 255, 255, .1)" $radius="16px">
        <P $fontSize="22px">{t('settings.soundsTitle')}</P>
        <FlexDiv $padding="12px 0" $align="center" $gap="8px">
          <FlexDiv $gap="8px" $align="center" $width="100px">
            <Image width={32} height={32} alt="Arrow" src={effectsVolume && effectsVolume > 0 ? Img.SoundOn : Img.SoundOff} />
            <P $fontSize="13px">{t('settings.effectsLabel')}</P>
          </FlexDiv>
          <input
            ref={effectsRef}
            className="range-input"
            type="range"
            min={0} max={100} step={1}
            value={effectsVolume} onChange={(e) => {
              setEffectsVolume?.(Number(e.target.value));
              updateTrackColor(effectsRef.current, e.target.value);
            }}
            style={{ flex: 1 }}
          />
        </FlexDiv>
        <FlexDiv $padding="12px 0" $align="center" $gap="8px">
          <FlexDiv $gap="8px" $align="center" $width="100px">
            <Image width={32} height={32} alt="Arrow" src={musicVolume && musicVolume > 0 ? Img.SoundOn : Img.SoundOff} />
            <P $fontSize="13px">{t('settings.musicLabel')}</P>
          </FlexDiv>
          <input
            ref={musicRef}
            className="range-input"
            type="range"
            min={0} max={100} step={1}
            value={musicVolume} onChange={(e) => {
              setMusicVolume?.(Number(e.target.value));
              updateTrackColor(musicRef.current, e.target.value);
            }}
            style={{ flex: 1 }}
          />
        </FlexDiv>
      </FlexDiv>
      <Languages />
      <Button $padding="18px" $radius="32px" $border="1px solid #04DAE8" onClick={() => setRouter?.("/about")}>
        {t('settings.aboutButton')}
      </Button>
    </PageWrapper>
  )
}
