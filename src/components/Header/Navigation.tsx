import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MenuItem } from './MenuItem';
import { IMenuProps } from '../../interfaces/header-interfaces';

const variants = {
  open: {
    pointerEvents: 'auto',
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    pointerEvents: 'none',
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const Menu = styled(motion.ul).attrs(() => ({
  initial: 'closed',
  variants
}))`
  margin: 0;
  padding: 0;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 100px;
  width: fit-content;
  margin: 0 auto;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface IProps extends IMenuProps {
  toggle: () => void;
}

const Navigation = ({ toggle, menuLinks }: IProps) => (
  <MenuContainer>
    <Menu variants={variants}>
      {menuLinks.map((dat, i) => (
        <MenuItem item={dat} key={i} toggle={toggle} />
      ))}
    </Menu>
  </MenuContainer>
);

export default Navigation;
