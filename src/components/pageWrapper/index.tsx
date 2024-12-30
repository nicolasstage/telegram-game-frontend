import { ReactNode } from 'react';
import { FlexDiv } from '../div';
import MiningStatus from '../miningStatus';

interface Props {
  children: ReactNode;
  margin?: string;
  gap?: string;
  vhGap?: string;
  centralizeVertically?: boolean;
  showMiningStatus?: boolean;
}

const centralizeVerticallyStyles = {
  minHeight: "84vh",
}

export default function PageWrapper({ children, margin, gap, vhGap, centralizeVertically, showMiningStatus = true }: Props) {
  return (
    <FlexDiv
      $justify={centralizeVertically ? "center" : "space-evenly"} $direction="column"
      $gap={vhGap ? vhGap : gap || "22px"}
      $margin={margin || "12px 0 0 0"}
      style={centralizeVertically ? centralizeVerticallyStyles : {}}
    >
      {showMiningStatus && <MiningStatus />}
      {children}
    </FlexDiv>
  )
}
