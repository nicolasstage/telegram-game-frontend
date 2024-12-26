import { useTranslation } from 'react-i18next';
import { Div, FlexDiv } from '../div';
import { P } from '../p';
import { motion } from "framer-motion";
import { useMemo, useState } from 'react';
import { Button } from '../button';
import Image from 'next/image';
import { useLanguageContext } from '@/utilitiy/providers/LanguageProvider';

const languageOptions = [
  {
    id: 1,
    title: "English",
    value: "en-US",
    icon: "/languages/us.svg"
  }, {
    id: 2,
    title: "中文",
    value: "zh-CN",
    icon: "/languages/ch.svg"
  }
]

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

export default function Languages() {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguageContext();

  const currentOption = useMemo(() =>
    languageOptions.find((option) => option.value === currentLanguage),
  [currentLanguage]);
  const options = useMemo(() =>
    languageOptions.filter((option) => option.value !== currentLanguage),
  [currentLanguage]);

  return (
    <FlexDiv $direction="column" $gap="24px" $width="100%">
      <P $fontSize="24px">Languages</P>
      <Div $radius="40px" $padding="16px" $background="#262626" $width="100%">
        <motion.div
          className="menu-item"
          onClick={toggleHoverMenu}
          onHoverStart={toggleHoverMenu}
          onHoverEnd={toggleHoverMenu}
        >
          <FlexDiv $align="center" $gap="8px">
            <Image
              src={currentOption!.icon}
              width={20}
              height={20}
              alt={currentOption!.value}
            />
            <P $fontSize="18px">{currentOption!.title}</P>
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
                options.map((option, index) => (
                  <Button key={index} onClick={() => changeLanguage(option.value)} $margin="24px 0 0">
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