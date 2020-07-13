import React, { useEffect } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import PropTypes from "prop-types"
import { ScrollingProvider } from "react-scroll-section"
import config from "react-reveal/globals"
import preset from "@rebass/preset"
import colors from "../../colors"
import Footer from "./Footer"
import Header from "./Header"

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before { 
    box-sizing: inherit;
    }
  body {
    box-sizing: border-box; 
    margin: 0;
    font-family: 'Roboto', sans-serif;
    overflow-x: hidden;
    width: 100vw;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
  h1, h2 {
    font-family: 'Montserrat';
  }
  p {
    font-size: 1.3em;
    font-weight: 400
  }
`

config({ ssrFadeout: true })

const loadScript = src => {
  const tag = document.createElement("script")
  tag.src = src
  tag.defer = true

  document.getElementsByTagName("body")[0].appendChild(tag)
}

const theme = {
  ...preset,
  colors,
  fonts: {
    body: "Roboto, sans-serif",
    heading: "inherit",
    monospace: "monospace",
  },
}

const Layout = ({ children }) => {
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
    <main>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ScrollingProvider>
          <Header menuLinks={data.site.siteMetadata.menuLinks} />
          {children}
          <Footer />
        </ScrollingProvider>
      </ThemeProvider>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
