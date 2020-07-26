import styled from "styled-components"
import { IThemeProps } from "./Interfaces/theme-interfaces"

interface IProps extends IThemeProps {
  height: [string, string]
  width: [string, string]
  color: string
  invertY?: boolean
  invertX?: boolean
}

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  z-index: -2;

  ${(props: IProps) => {
    const color = props.theme.colors[props.color] || props.color
    const border = `${props.height[0]} solid ${color};`
    return props.invertY
      ? `border-bottom: ${border}; bottom: 0;`
      : `border-top: ${border};`
  }}

  ${(props: IProps) => {
    const border = `${props.width[0]} solid transparent;`
    return props.invertX
      ? `border-left: ${border}; right: 0;`
      : `border-right: ${border};`
  }}


  @media only screen and (min-width: 768px) {
    ${(props: IProps) => {
      const height = props.height[1]
      return props.invertY
        ? `border-bottom-width: ${height};`
        : `border-top-width: ${height};`
    }}

    ${(props: IProps) => {
      const width = props.width[1]
      return props.invertX
        ? `border-left-width: ${width};`
        : `border-right-width: ${width};`
    }};
  }
`

export default Triangle
