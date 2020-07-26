import styled from "styled-components"
import { Card as CardRebass } from "rebass/styled-components"

interface IProps {
  maxWidth: string
  minWidth: string
}

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  max-width: ${(props: IProps) => props.maxWidth};
  margin: 0 auto;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props: IProps) => props.minWidth}, 1fr)
  );
  justify-items: center;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`

export const Card = styled(CardRebass).attrs({
  bg: "white",
  boxShadow: 0,
})`
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  top: 0;
  height: 100%;
  border-radius: 8px;
  &:hover {
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
`

export default Card
