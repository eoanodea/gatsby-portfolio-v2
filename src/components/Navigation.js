import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { MenuItem } from "./MenuItem"

const variants = {
  open: {
    pointerEvents: "auto",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    pointerEvents: "none",
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const Menu = styled(motion.ul).attrs(() => ({
  initial: "closed",
  variants,
}))`
  margin: 0;
  padding: 0;
  padding: 40px;
  position: absolute;
  top: 100px;
  right: 0;

  width: 230px;
`

const Navigation = ({ toggle, menuLinks }) => (
  <Menu variants={variants}>
    {menuLinks.map((dat, i) => (
      <MenuItem item={dat} key={i} toggle={toggle} />
    ))}
  </Menu>
)

export default Navigation
