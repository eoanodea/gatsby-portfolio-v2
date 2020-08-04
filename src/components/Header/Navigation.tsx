import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { IMenuProps } from '../../interfaces/header-interfaces';
import { MenuItem } from './MenuItem';

const variants = {
  open: {
    pointerEvents: 'auto',
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },

    zIndex: 0
  },
  closed: {
    pointerEvents: 'none',
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    transitionEnd: {
      zIndex: 0
    }
  }
};

const Menu = styled(motion.ul).attrs(() => ({
  initial: 'closed',
  variants
}))`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 20vh;
  width: fit-content;
  margin: 0 auto;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

interface IProps extends IMenuProps {
  toggle: () => void;
}

const Navigation = ({ toggle, menuLinks }: IProps) => (
  <Menu variants={variants}>
    {menuLinks.map((dat, i) => (
      <MenuItem item={dat} key={i} toggle={toggle} />
    ))}
  </Menu>
);

export default Navigation;
