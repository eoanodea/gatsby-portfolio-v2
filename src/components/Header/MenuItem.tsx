import * as React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IMenuItemProps } from '../../interfaces/header-interfaces';
import LinkAnimated from '../LinkAnimated';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    pointerEvents: 'auto',
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    pointerEvents: 'none',
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

interface IProps {
  name: string;
  selected: boolean;
  toggle: () => void;
}

export const MenuItem = ({ name, selected, toggle }: IProps) => {
  return (
    <Item onClick={() => toggle()} variants={variants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <h1>
        <LinkAnimated color="#fff" selected={selected}>
          {name}.
        </LinkAnimated>
      </h1>
    </Item>
  );
};

const Item = styled(motion.li).attrs(() => ({
  variants,
  initial: 'closed'
}))`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 900;
`;
