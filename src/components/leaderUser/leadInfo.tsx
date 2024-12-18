import Skeleton from "react-loading-skeleton";
import { FlexDiv } from "../div";
import { P } from "../p";
import { formatToken, slice } from "@/utilitiy/functions";

type Props = {
  cntp: number;
  address: string;
};

const LeadInfo: React.FC<Props> = ({ address, cntp }) => {
  return (
    <FlexDiv $height="100%" $padding="10px 0" $grow="1">
      <FlexDiv
        $direction="column"
        $justify="space-between"
        $height="100%"
        $width="100%"
      >
        <FlexDiv $direction="column">
          <P $fontSize="18px">Anonymous User</P>
          <P $fontSize="12px" $color="#B1B1B2">
            {slice(address)}
          </P>
        </FlexDiv>
        <FlexDiv $justify="space-between" $align="center">
          <P>{cntp ? (
            formatToken(cntp)
          ) : (
            <Skeleton width={200} />
          )}</P>
          <P $fontSize="10px">CNTP EARNED</P>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  );
};

export default LeadInfo;
