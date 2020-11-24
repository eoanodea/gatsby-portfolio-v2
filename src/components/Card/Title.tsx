import * as React from 'react';
import { motion, useInvertedScale } from 'framer-motion';
import { closeSpring, openSpring } from './animations';

interface IProps {
  title: string;
  categories: string[];
  isSelected: boolean;
}

export const Title = ({ title, categories, isSelected }: IProps) => {
  const inverted = useInvertedScale();
  const x = isSelected ? 0 : 15;
  const y = x;

  const variants = {
    open: {
      x,
      y,
      backgroundColor: 'rgb(0 0 0 / 0%)',
      padding: '20px'
    },
    closed: {
      x,
      y,
      backgroundColor: 'rgb(0 0 0 / 0%)'
    }
  };

  return (
    <motion.div
      className={`title-container ${isSelected && ''}`}
      initial={false}
      animate={isSelected ? 'open' : 'closed'}
      variants={variants}
      layout
      transition={isSelected ? openSpring : closeSpring}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      {categories.map((category, i) => (
        <span key={i} className="category">
          {category}
          {i !== categories.length - 1 && ', '}
        </span>
      ))}
      <h2>{title}</h2>
    </motion.div>
  );
};

/**
 * `transform` is order-dependent, so if you scale(0.5) before translateX(100px),
 * the visual translate will only be 50px.
 *
 * The intuitive pattern is to translate before doing things like scale and
 * rotate that will affect the coordinate space. So Framer Motion takes an
 * opinion on that and allows you to animate them
 * individually without having to write a whole transform string.
 *
 * However in this component we're doing something novel by inverting
 * the scale of the parent component. Because of this we want to translate
 * through scaled coordinate space, and can use the transformTemplate prop to do so.
 */
const scaleTranslate = ({ x, y, scaleX, scaleY }: any) => `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;
