import React, { useRef } from 'react';
import { Link } from 'gatsby';
import Headroom from 'react-headroom';

import styled from 'styled-components';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from '../../hooks/useDimensions';
import Navigation from './Navigation';
import { IMenuItem } from '../../interfaces/header-interfaces';

const sidebar = {
  open: (height = 1080) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at 46px 46px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

const Svg = styled.svg`
  path {
    stroke: #f35fb4;
  }
`;

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
  padding: 6px 0 0 0;
  border-radius: 50%;
  background: #000;
`;

const Toggler = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: auto;
  z-index: 1;
`;

const Path = (
  props: JSX.IntrinsicAttributes & import('framer-motion').SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>
) => <motion.path fill="transparent" strokeWidth="3" stroke="hsl(0, 0%, 18%)" strokeLinecap="round" {...props} />;

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <Button onClick={toggle} data-testid="MenuToggle">
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' }
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' }
          }}
        />
      </Svg>
    </motion.div>
  </Button>
);

const HeaderContainer = styled(Headroom)`
  * {
    transition: background-color 0.1s ease;
  }

  .headroom--pinned {
    background-color: #f35fb4;
  }

  transition: 0.2s ease;
  z-index: 20;
  position: absolute;
  width: 100%;

  .menu-background {
    background: #f35fb4;
  }
`;

const Background = styled(motion.div).attrs(() => ({
  initial: 'closed',
  sidebar
}))`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh + 96px);
  z-index: 0;
`;

const Image = styled.img`
  margin: 16px;
  position: relative;
  z-index: 20;
`;

const menuLinks: [IMenuItem] = [
  { name: 'home', link: '/' },
  { name: 'projects', link: '#projects' }
];

const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <HeaderContainer className="header">
      <div>
        <Link to="/">
          <Image
            src="/icon.png"
            width="60"
            alt="Portfolio Logo"
            style={{
              cursor: 'pointer'
            }}
          />
        </Link>
      </div>
      <Toggler initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
        {isOpen ? (
          <React.Fragment>
            <Background className="menu-background" variants={sidebar} onClick={() => toggleOpen()} />
            <Navigation menuLinks={menuLinks} toggle={() => toggleOpen()} />
          </React.Fragment>
        ) : (
          <Background className="menu-background" variants={sidebar} onClick={() => toggleOpen()} />
        )}

        <MenuToggle toggle={() => toggleOpen()} />
      </Toggler>
    </HeaderContainer>
  );
};

export default Header;
