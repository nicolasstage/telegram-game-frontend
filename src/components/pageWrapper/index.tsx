import { ReactNode } from 'react';
import { FlexDiv } from '../div';
import MiningStatus from '../miningStatus';

interface Props {
  children: ReactNode;
  margin?: string;
  gap?: string;
  vhGap?: string;
}

export default function PageWrapper({ children, margin, gap, vhGap }: Props) {
  return (
    <FlexDiv $justify="space-evenly" $direction="column" $gap={vhGap ? vhGap : gap || "22px"} $margin={margin || "12px 0 0 0"}>
      <MiningStatus />
      {children}
    </FlexDiv>
  )
}