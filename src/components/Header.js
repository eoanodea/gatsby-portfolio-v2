import React, { Fragment } from "react"
import Headroom from "react-headroom"
import { Flex, Image } from "rebass/styled-components"
import styled from "styled-components"
import RouteLink from "./RouteLink"
import { Link } from "gatsby"

const HeaderContainer = styled(Headroom)`
  * {
    transition: background-color 0.1s ease;
  }

  .headroom--pinned {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  position: absolute;
  width: 100%;
`

const Header = ({ menuLinks }) => {
  const homeLink = (
    <Link to="/">
      <Image
        src="/icon.png"
        width="60"
        alt="Portfolio Logo"
        style={{
          cursor: "pointer",
        }}
      />
    </Link>
  )

  const navLinks = menuLinks.map((dat, i) => (
    <RouteLink key={i} link={dat.link} selected={false} name={dat.name} />
  ))

  return (
    <HeaderContainer>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Fragment>
          {homeLink}
          <Flex mr={[0, 3, 5]}>{navLinks}</Flex>
        </Fragment>
      </Flex>
    </HeaderContainer>
  )
}

export default Header
