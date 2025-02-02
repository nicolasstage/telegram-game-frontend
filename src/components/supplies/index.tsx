import Image from 'next/image';
import { FlexDiv } from '../div';
import { P } from '../p';
import Tooltip from '../tooltip';
import { Img } from '@/utilitiy/images';
import { formatToken } from '@/utilitiy/functions';
import { useGameContext } from '@/utilitiy/providers/GameProvider';
import Rank from './rank';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';

export default function Supplies() {
  const { profile } = useGameContext();

  const { t } = useTranslation();

  return (
    <FlexDiv $direction="column" $gap="22px">
      <FlexDiv $align="center" $justify="space-between">
        <FlexDiv $gap="12px" $align="center">
          <P $fontSize="24px">{t("components.supplies.supplies")}</P>
          <Tooltip message={t("components.supplies.tooltipMessage")} />
        </FlexDiv>
        <FlexDiv $align="center" $gap="8px" $background="#262527" $padding="8px" $radius="8px">
          {profile?.tickets?.balance ? (
            <>
              <Image src={Img.Tickets} alt={t("components.supplies.tickets")} width={42.15} height={32} />
              <P $fontSize='16px'>x {profile?.tickets?.balance}</P>
            </>
          ) : (
            <Skeleton width={50} />
          )}
        </FlexDiv>
      </FlexDiv>
      {/* Disable rank until real rank implementation is ready */}
      {/* <Rank /> */}

      <FlexDiv $gap="8px" $align="center">
        {profile ? (
          <>
            <P $fontSize="20px" style={{ lineHeight: '16px' }}>
              {formatToken(profile?.tokens?.cCNTP?.balance)}
            </P>
            <P $fontSize="12px" style={{ lineHeight: '16px' }}>
              {t("components.supplies.cnptEarned")}
            </P>
          </>
        ) : (
          <Skeleton width={200} />
        )}
      </FlexDiv>
    </FlexDiv>
  );
}
