import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"
import LinkAnimated from "./LinkAnimated"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    pointerEvents: "auto",
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    pointerEvents: "none",
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

export const MenuItem = ({ item: { name, link }, toggle }) => {
  const isSelected =
    typeof window !== "undefined" ? link === window.location.pathname : false

  return (
    <Item
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <LinkAnimated alt="true" selected={isSelected} onClick={toggle}>
        <StyledLink to={link}>{name}.</StyledLink>
      </LinkAnimated>
    </Item>
  )
}

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.background};
`

const Item = styled(motion.li).attrs(() => ({
  initial: "closed",
  variants,
}))`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 5rem;
  font-weight: 900;
`
