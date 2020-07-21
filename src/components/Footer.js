import React from "react"
import styled from "styled-components"
import { Text, Box, Link, Flex } from "rebass/styled-components"
import Fade from "react-reveal/Fade"

const FooterContainer = styled.div`
  max-width: 1366px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media (max-width: 400px) {
    flex-direction: column-reverse;

    & > * {
      margin-bottom: 10px;
    }
  }
`

const TextFooter = styled(Text)`
  color: ${props => props.theme.colors.background};

  & a {
    color: ${props => props.theme.colors.background};
    transition: color ease 0.5s;

    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`

const Footer = ({ siteTitle }) => (
  <Box p={[2, 3]} backgroundColor="secondaryDark" id="footer">
    <FooterContainer>
      <Fade left>
        <TextFooter fontSize={[3, 4]}>
          <span>{`Built using `}</span>
          <Link href="https://www.gatsbyjs.org/">Gatsby</Link>
          <span> & </span>
          <Link href="https://reactjs.org/" mr={1}>
            React
          </Link>
        </TextFooter>
      </Fade>
      <Flex>
        <Fade right>
          <TextFooter fontSize={[2, 3]}>
            © Eoan O'Dea {new Date().getFullYear()} {siteTitle}
          </TextFooter>
        </Fade>
      </Flex>
    </FooterContainer>
  </Box>
)
export default Footer
