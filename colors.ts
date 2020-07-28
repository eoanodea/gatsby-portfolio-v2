export interface IColorProps {
  [key: string]: string
  background: string
  backgroundDark: string
  text: string

  secondary: string
  secondaryLight: string
  secondaryDark: string

  primary: string
  primaryLight: string
  primaryDark: string
}

export const colors: IColorProps = {
  background: "#05dfd7",
  backgroundDark: "#a3f7bf",

  text: "#000000",

  secondary: "#fff591",
  secondaryLight: "#ffffc3",
  secondaryDark: "#000",

  primary: "#fa26a0",
  primaryLight: "#ff69d1",
  primaryDark: "#f35fb4",
}
