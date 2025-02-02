import styled from "styled-components";

export const Div = styled.div.attrs<{
  $padding?: string;
  $margin?: string;
  $border?: string;
  $radius?: string;
  $width?: string;
  $height?: string;
  $maxHeight?: string;
  $background?: string;
  $position?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $index?: string;
  $flex?: number;
  $boxShadow?: string;
  $boxSizing?: string;
  $overflowX?: string;
  $overflowY?: string;
  $cursor?: string;
}>((props) => ({
  $padding: props.$padding || "0",
  $margin: props.$margin || "0",
  $border: props.$border || "unset",
  $radius: props.$radius || "0",
  $cursor: props.$cursor || "unset",
}))`
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$radius};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  max-height: ${(props) => props.$maxHeight};
  background: ${(props) => props.$background};
  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  bottom: ${(props) => props.$bottom};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  z-index: ${(props) => props.$index};
  flex: ${(props) => props.$flex};
  box-shadow: ${(props) => props.$boxShadow};
  box-sizing: ${(props) => props.$boxSizing};
  overflow-x: ${(props) => props.$overflowX};
  overflow-y: ${(props) => props.$overflowY}; 
  cursor: ${(props) => props.$cursor};
`;

export const FlexDiv = styled(Div).attrs<{
  $direction?: string;
  $justify?: string;
  $align?: string;
  $gap?: string;
  $grow?: string;
  $flex?: number;
  $wrap?: string;
}>((props) => ({
  $direction: props.$direction || "unset",
  $justify: props.$justify || "unset",
  $align: props.$align || "unset",
  $gap: props.$gap || "0",
  $grow: props.$grow,
  $flex: props.$flex,
}))`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justify};
  align-items: ${(props) => props.$align};
  gap: ${(props) => props.$gap};
  flex-grow: ${(props) => props.$grow};
  flex: ${(props) => props.$flex};
  flex-wrap: ${(props) => props.$wrap};
`;
