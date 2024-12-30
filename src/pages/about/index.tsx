/* eslint-disable react/no-unescaped-entities */
import BackButton from '@/components/backButton';
import { Button } from '@/components/button';
import { FlexDiv } from '@/components/div';
import { P } from '@/components/p';
import PageWrapper from '@/components/pageWrapper';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const { setRouter } = useGameContext();

  function handleOpenPlatform() {
    window.open("https://platform.conet.network", "_blank");
  }

  return (
    <PageWrapper margin="12px 16px 140px 16px">
      <BackButton text={t('about.backButtonText')} />

      <FlexDiv $direction="column" $width="100%" $gap="64px">
        <FlexDiv $direction="column" $gap="16px">
          <P $fontSize="20px">{t('about.welcomeTitle')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.intro')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.miningGame')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.whyBuildGame')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.participation')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.blockchainRewards')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.miningRewards')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.dailyRewards')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.biggerParticipation')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.futurePlans')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.nextSteps')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.simpleSetup')}</P>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="16px">
          <P $fontSize="20px">{t('about.conetTitle')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.conetIntro')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.silentPass')}</P>
          <P $fontSize="15px" $lineHeight="24px">{t('about.welcomeConclusion')}</P>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv $margin="32px 0 0 0" $direction="column" $align="center" $gap="13px">
        <Button $width="196px" $height="45px" $radius="8px" $border="1px solid #04DAE8" onClick={handleOpenPlatform}>
          {t('about.openPlatformButton')}
        </Button>
        <Button $width="196px" $height="45px" $radius="8px" $color="rgba(121, 248, 255, 1)" onClick={() => setRouter?.("/")}>
          {t('about.mainMenuButton')}
        </Button>
      </FlexDiv>
    </PageWrapper>
  )
}
