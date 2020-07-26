import React, { useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import PropTypes from "prop-types"
import { ScrollingProvider } from "react-scroll-section"
import config from "react-reveal/globals"
import preset from "@rebass/preset"
import { colors, IColorProps } from "../../colors"
import Footer from "./Footer"
import Header from "./Header"
import { motion, AnimatePresence } from "framer-motion"

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before { 
    box-sizing: inherit;
    }
  a {
    text-decoration: none;
  }
  body {
    box-sizing: border-box; 
    margin: 0;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    width: 100vw;
    background: ${(props: IThemeProps) => props.theme.colors.background};
    color: ${(props: IThemeProps) => props.theme.colors.text};
  }
  h1, h2 {
    font-family: 'Montserrat';
  }
  p {
    font-size: 1.3em;
    font-weight: 400
  }
  .menu-background {
    background: ${(props: IThemeProps) => props.theme.colors.primaryDark};
    padding: 10px;
  }
`

config({ ssrFadeout: true })

const loadScript = (src: string) => {
  const tag = document.createElement("script")
  tag.src = src
  tag.defer = true

  document.getElementsByTagName("body")[0].appendChild(tag)
}

export interface IThemeProps {
  theme: {
    colors: IColorProps
  }
  fonts: {
    body: string
    heading: string
    monospace: string
  }
}

const theme: IThemeProps = {
  ...preset,
  colors,
  fonts: {
    body: "Roboto, sans-serif",
    heading: "inherit",
    monospace: "monospace",
  },
}

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(1rem)",
    transition: { duration },
  },
}

const Main = styled(motion.main).attrs(() => ({
  initial: "initial",
  variants,
}))`
  /* flex-grow: 1; */
`

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  useEffect(() => {
    loadScript("https://use.fontawesome.com/fd58d214b9.js")
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <Header menuLinks={data.site.siteMetadata.menuLinks} />
        <AnimatePresence>
          <ScrollingProvider>
            <Main
              key={location?.pathname}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {children}
            </Main>
          </ScrollingProvider>
        </AnimatePresence>
        <Footer />
      <React.Fragment/>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
