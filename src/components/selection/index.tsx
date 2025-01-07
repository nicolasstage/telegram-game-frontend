import { useTranslation } from 'react-i18next';
import { Div, FlexDiv } from '../div';
import { P } from '../p';
import { motion } from "framer-motion";
import { useMemo, useState } from 'react';
import { Button } from '../button';
import Image from 'next/image';
import { Img } from '@/utilitiy/images';

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.5
    },
    display: "block"
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.5,
      delay: 0.3
    },
    transitionEnd: {
      display: "none"
    }
  }
};

type SelectionProps = {
  options: Option[],
  selectedOption: any,
  changeOption: any
  title: string
}

export default function Selection({ options, selectedOption, changeOption, title }: SelectionProps) {
  const [isHover, toggleHover] = useState(false);

  const toggleHoverMenu = () => {
    if (options.length > 1)
      toggleHover(!isHover);
  };

  const { t } = useTranslation();

  const currentOption = useMemo(() =>
    options.find((option) => option.value === selectedOption),
    [selectedOption]);
  const activeOptions = useMemo(() =>
    options.filter((option) => option.value !== selectedOption),
    [selectedOption]);

  return (
    <FlexDiv $direction="column" $gap="24px" $width="100%">
      {options.length > 1 ? <P>{title}</P> : null}
      <Div $radius="16px" $padding="16px" $background="#262626" $width="100%" $cursor={options.length > 1 ? "pointer" : "default"} onClick={toggleHoverMenu}>
        <motion.div
          className="menu-item"
          onClick={toggleHoverMenu}
        >
          <FlexDiv $align="center" $justify='space-between' $gap="8px">
            <FlexDiv $align="center" $gap="8px">
              <Image
                src={currentOption!.icon}
                width={20}
                height={20}
                alt={currentOption!.value}
              />
              <P $fontSize="18px">{currentOption!.title}</P>
            </FlexDiv>

            {options.length > 1 ?
              isHover ?
                <Image
                  src={Img.UpArrowImg}
                  alt={t("earn.proceed")}
                  width={28}
                  height={28}
                /> :
                <Image
                  src={Img.DownArrowImg}
                  alt={t("earn.proceed")}
                  width={28}
                  height={28}
                /> : null
            }

          </FlexDiv>
          <motion.div
            className="sub-menu"
            initial="exit"
            animate={isHover ? "enter" : "exit"}
            variants={subMenuAnimate}
          >
            <div className="sub-menu-background" />
            <FlexDiv $direction="column" $align="flex-start" className="sub-menu-container">
              {
                activeOptions.map((option, index) => (
                  <Button key={index} onClick={() => changeOption(option.value)} $margin="24px 0 0">
                    <FlexDiv $align="center" $gap="8px">
                      <Image
                        src={option.icon}
                        width={20}
                        height={20}
                        alt={option.value}
                      />
                      <P $fontSize="18px">{option.title}</P>
                    </FlexDiv>
                  </Button>
                ))
              }
            </FlexDiv>
          </motion.div>
        </motion.div>
      </Div>
    </FlexDiv>
  )
}