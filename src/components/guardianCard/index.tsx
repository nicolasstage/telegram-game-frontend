import Image from 'next/image';
import { Div, FlexDiv } from '../div';
import { P } from '../p';
import { Img } from '@/utilitiy/images';
import { useTranslation } from 'react-i18next';

export default function GuardianCard() {
  const { t } = useTranslation();

  function becomeGuardian() {
    window.open("https://platform.conet.network", "_blank");
  }

  return (
    <Div $padding="1px" $background="linear-gradient(247.89deg, #04DAE8 -23.3%, #61C6CC 12.53%, #79F8FF 14.78%, #026D74 56.58%)" $radius="24px" onClick={becomeGuardian}>
      <FlexDiv $direction="column" $gap="12px" $background="#17181F" $position="relative" $radius="24px" $padding="30px 18px" className="guardian-wrapper">
        <P className="text-primary-gradient small-text-max-width" $fontSize="22px" $weight="700">{t("components.becomeGuardian.title")}</P>
        <P $fontSize="12px">{t("components.becomeGuardian.description")}</P>
        <Image className="conet-img" src={Img.LogoImg} alt="Conet" width={210} height={230} />
      </FlexDiv>
    </Div>
  )
}
