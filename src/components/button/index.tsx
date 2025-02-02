import styled from "styled-components";
import { ReactNode } from "react";
import { FlexDiv } from "../div";

export const Button = styled.button<{
  $margin?: string;
  $padding?: string;
  $border?: string;
  $fontSize?: string;
  $color?: string;
  $background?: string;
  $width?: string;
  $height?: string;
  $minHeight?: string;
  $radius?: string;
  $flex?: number;
  $direction?: string;
  $gap?: string;
  $index?: number;
  $cursor?: string;
}>`
  margin: ${(props) => props.$margin || 0};
  padding: ${(props) => props.$padding || 0};
  border: ${(props) => props.$border || 0};
  font-size: ${(props) => props.$fontSize || "1rem"};
  color: ${(props) => props.$color || "white"};
  background-color: ${(props) => props.$background || "unset"};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  min-height: ${(props) => props.$minHeight};
  border-radius: ${(props) => props.$radius};
  flex: ${(props) => props.$flex};
  display: flex;
  flex-direction: ${(props) => props.$direction || "column"};
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.$gap || "0"};
  overflow: hidden;
  cursor: ${(props) => props.$cursor || "pointer"};
  z-index: ${(props) => props.$index || 0};
`;

export const GradientImage = styled(FlexDiv)`
  background-image: linear-gradient(
    45deg,
    #026d74 0%,
    #79f8ff 25%,
    #61c6cc 50%,
    #04dae8 75%
  );
  padding: 1px;
  border-radius: ${(props) => props.$radius || '32px'};
  flex: ${(props) => props.$flex};
`;

type GradientButtonProps = {
  children: ReactNode;
  width?: string;
  height?: string;
  radius?: string;
  flex?: number;
  onClick?: () => void;
  disabled?: boolean;
  cursor?: string;
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  width,
  height,
  radius = '32px',
  flex,
  onClick,
  disabled,
  cursor = "auto",
}) => {
  return (
    <GradientImage $flex={flex} $radius={radius}>
      <Button
        $background="#252527"
        $padding="8px 16px"
        $radius="32px"
        $fontSize="14px"
        $width={width}
        $height={height}
        onClick={onClick}
        $flex={flex}
        $cursor={disabled ? "not-allowed" : cursor}
        $color={disabled ? "gray" : "white"}
      >
        {children}
      </Button>
    </GradientImage>
  );
};

export const GradientSquareButton: React.FC<GradientButtonProps> = ({
  children,
  width,
  height,
  radius,
  flex,
  onClick,
  disabled,
  cursor = "auto",
}) => {
  return (
    <GradientImage $flex={flex} $radius={radius}>
      <Button
        $background="#252527"
        $padding="16px"
        $radius={radius || "16px"}
        $fontSize="14px"
        $width={width}
        $height={height}
        onClick={onClick}
        $flex={flex}
        $cursor={disabled ? "not-allowed" : cursor}
        $color={disabled ? "gray" : "white"}
      >
        {children}
      </Button>
    </GradientImage>
  );
};

export const FilledButton: React.FC<{
  children: ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  onClick?: () => void;
}> = ({ children, width, height, backgroundColor, onClick }) => {
  return (
    <Button
      $color="#FFFFFF"
      $background={backgroundColor}
      $radius="8px"
      $width={width}
      $height={height}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const OutlinedButton: React.FC<{
  children: ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
}> = ({ children, width, height, onClick }) => {
  return (
    <Button
      $color="#FFFFFF"
      $background="transparent"
      $radius="8px"
      $width={width}
      $height={height}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
