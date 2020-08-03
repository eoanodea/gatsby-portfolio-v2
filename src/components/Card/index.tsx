import * as React from 'react';
import { memo, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import { Content } from './Content';
import { Title } from './Title';
import { Image } from './Image';
import { openSpring, closeSpring } from './animations';

import { useScrollConstraints } from '../../utils/use-scroll-constraints';
import { useInvertedBorderRadius } from '../../utils/use-inverted-border-radius';
import Frontmatter from '../../models/Frontmatter';
import { useWheelScroll } from '../../utils/use-wheel-scroll';

interface Props extends Frontmatter {
  isSelected: boolean;
}

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;

export const Card = memo(
  ({ featureImg, title, excerpt, isSelected, categories, pointOfInterest, backgroundColor }: Props) => {
    const [isActive, setIsActive] = React.useState(isSelected);

    const toggleCard = () => {
      setIsActive(val => !val);
    };

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isActive ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isActive);

    function checkSwipeToDismiss() {
      if (y.get() > dismissDistance || y.get() < dismissDistance * -2) toggleCard();
    }

    function checkZIndex(latest: { scaleX: number }) {
      if (isActive) {
        zIndex.set(2);
      } else if (!isActive && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isActive);

    return (
      <li ref={containerRef} className={`card`} onClick={() => toggleCard()}>
        <Overlay isSelected={isActive} toggleCard={toggleCard} />
        <div className={`card-content-container ${isActive ? 'open' : ''}`}>
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            animate={{ y: isActive ? 10 : 30 }}
            transition={isActive ? openSpring : closeSpring}
            drag={isActive ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              title={title}
              featureImg={featureImg.publicURL}
              isSelected={isActive}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
              toggleCard={toggleCard}
            />
            <Title title={title} categories={categories} isSelected={isActive} />
            <Content content={excerpt} />
          </motion.div>
        </div>
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

const Overlay = ({ isSelected, toggleCard }: any) => (
  <motion.div
    onClick={toggleCard}
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    className="overlay"
  ></motion.div>
);