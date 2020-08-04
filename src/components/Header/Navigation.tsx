import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { MenuItem } from './MenuItem';

import { SectionLinks } from 'react-scroll-section';

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
  variants,
  initial: 'closed'
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

interface IProps {
  toggle: () => void;
}

const Navigation = ({ toggle }: IProps) => (
  <Menu variants={variants}>
    <SectionLinks>
      {({ allLinks }: any) =>
        Object.entries(allLinks).map(([key, link]: any) => {
          const clickItem = () => {
            toggle();
            link.onClick();
          };

          return <MenuItem name={key.toUpperCase()} key={key} toggle={clickItem} selected={link.isSelected} />;
        })
      }
    </SectionLinks>
  </Menu>
);

export default Navigation;
