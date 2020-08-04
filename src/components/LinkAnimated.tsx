import styled from 'styled-components';
// import { IThemeProps } from "./Layout"

interface IProps {
  color: string;
}

const LinkAnimated = styled.span`
  text-decoration: none;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 5px;
  color: inherit;
  border-bottom: 5px solid #fff0;
  transition: 0.4s;
  cursor: 'pointer';

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 0;
    bottom: -5px;
    background: ${(props: IProps) => props.color};
    height: 8px;
    transition-property: width;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }

  &:focus:after,
  &:hover:after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;

export default LinkAnimated;
