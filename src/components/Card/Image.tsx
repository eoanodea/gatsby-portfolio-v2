import * as React from 'react';
import { motion, useInvertedScale } from 'framer-motion';
import { closeSpring } from './animations';

interface IProps {
  title: string;
  featureImg: string;
  isSelected: boolean;
  pointOfInterest?: number;
  backgroundColor: string;
  toggleCard: () => void;
}

export const Image = ({ title, featureImg, isSelected, pointOfInterest = 0, backgroundColor, toggleCard }: IProps) => {
  const inverted = useInvertedScale();

  return (
    <motion.div
      onClick={() => toggleCard()}
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.img
        className="card-image"
        src={featureImg}
        alt={title}
        initial={false}
        animate={isSelected ? { x: -50, y: -20 } : { x: -pointOfInterest, y: 0 }}
        transition={closeSpring}
      />
    </motion.div>
  );
};
