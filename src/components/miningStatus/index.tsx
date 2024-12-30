import styled from "styled-components";
import { FlexDiv } from "../div";
import { P } from "../p";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from 'react-i18next';

const S = {
  SuccessStatusBadge: styled.div`
    background-color: green;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
  FailedStatusBadge: styled.div`
    background-color: red;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  `,
};

const MiningStatus = () => {
  const { mining, miningRate, onlineMiners } = useGameContext();

  const { t } = useTranslation();

  return (
    <FlexDiv $align="center" $padding="0" $justify="space-between">
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="0 10px"
        $radius="16px"
        $gap="8px"
        $height="3vh"
      >
        {mining ? (
          <>
            <S.SuccessStatusBadge />
            <P $fontSize="8px">{t("components.mining.up")}</P>
          </>
        )
          : (
            <>
              <S.FailedStatusBadge />
              <P $fontSize="8px">{t("components.mining.down")}</P>
            </>
          )}

      </FlexDiv>
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="0 10px"
        $radius="16px"
        $gap="8px"
        $height="3vh"
      >
        <P $fontSize="8px">{t("components.mining.rate")}: {mining && miningRate?.toFixed(10)}</P>
        {!mining && <Skeleton width={40} height={12} />}
      </FlexDiv>
      <FlexDiv
        $align="center"
        $border="1px solid #CFCFCF0A"
        $padding="0 10px"
        $radius="16px"
        $gap="8px"
        $height="3vh"
      >
        <P $fontSize="8px">{t("components.mining.online")}: {mining && onlineMiners}</P>
        {!mining && <Skeleton width={40} height={12} />}
      </FlexDiv>
    </FlexDiv>
  );
};

export default MiningStatus;
