import React, { useRef } from "react"
import Headroom from "react-headroom"
import { Flex, Image } from "rebass/styled-components"
import styled from "styled-components"

import { Link } from "gatsby"
import { motion, useCycle } from "framer-motion"
import { useDimensions } from "../hooks/useDimensions"
import Navigation from "./Navigation"

const HeaderContainer = styled(Headroom)`
  * {
    transition: background-color 0.1s ease;
  }

  .headroom--pinned {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  transition: 0.2s ease;
  z-index: 20;
  position: absolute;
  width: 100%;
`

const sidebar = {
  open: (height = 1080) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 46px 46px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

const Svg = styled.svg`
  path {
    stroke: ${props => props.theme.colors.background};
  }
`

const Button = styled.button`
  outline: none;
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  position: absolute;
  top: 26px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
`

const Toggler = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: auto;
  z-index: 1;
`

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ toggle }) => (
  <Button onClick={toggle} data-testid="MenuToggle">
    <Svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </Svg>
  </Button>
)

const StyledLogoContainer = styled(motion.div).attrs(() => ({
  initial: "closed",
  sidebar,
}))`
  position: relative;
  top: 0;
  left: 0;
  z-index: 20;
`

const Background = styled(motion.div).attrs(() => ({
  initial: "closed",
  sidebar,
}))`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
`

const Header = ({ menuLinks }) => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

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

  // const navLinks = menuLinks.map((dat, i) => (
  //   <RouteLink
  //     key={i}
  //     link={dat.link}
  //     selected={dat.link === window.location.pathname}
  //     name={dat.name}
  //   />
  // ))

  return (
    <HeaderContainer>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        {/* <Fragment> */}
        <StyledLogoContainer>{homeLink}</StyledLogoContainer>

        {/* <Flex mr={[0, 3, 5]}>{navLinks}</Flex> */}
        {/* </Fragment> */}
        <Toggler
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <Background className="menu-background" variants={sidebar} />
          <Navigation menuLinks={menuLinks} toggle={() => toggleOpen()} />
          <MenuToggle toggle={() => toggleOpen()} />
        </Toggler>
      </Flex>
    </HeaderContainer>
  )
}

export default Header
