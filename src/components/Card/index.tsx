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
  cardI: number;
  toggleActiveCard: (i: number | null) => void;
}

// Distance in pixels a user has to scroll a card down before we recognise
// a swipe-to dismiss action.
const dismissDistance = 150;

export const Card = memo(
  ({ isSelected, cardI, toggleActiveCard, featureImg, title, excerpt, categories, pointOfInterest, backgroundColor }: Props) => {
    /**
     * If the card is selected, set active card to null
     * if not, set the current card to active
     */
    const toggleCard = () => {
      const val = isSelected ? null : cardI;
      toggleActiveCard(val);
    };

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      if (y.get() > dismissDistance || y.get() < dismissDistance * -2) toggleCard();
    }

    function checkZIndex(latest: { scaleX: number }) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isSelected);

    return (
      <li ref={containerRef} className={`card`} onClick={() => toggleCard()}>
        <Overlay isSelected={isSelected} toggleCard={toggleCard} />
        <div className={`card-content-container ${isSelected ? 'open' : ''}`}>
          <motion.div
            variants={{ open: { x: 0, y: 10 }, closed: { x: 0, y: 30 } }}
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            animate={isSelected ? 'open' : 'closed'}
            layout
            transition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? 'y' : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              title={title}
              featureImg={featureImg.publicURL}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
              toggleCard={toggleCard}
            />
            <Title title={title} categories={categories} isSelected={isSelected} />
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
