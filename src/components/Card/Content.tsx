import * as React from 'react';
import { motion, useInvertedScale } from 'framer-motion';

interface IProps {
  content: string;
}

export const Content = React.memo(({ content }: IProps) => {
  const inverted = useInvertedScale();
  return (
    <motion.div
      className="content-container"
      style={{ ...inverted, originY: 0, originX: 0 }}
      dangerouslySetInnerHTML={{ __html: content }}
    ></motion.div>
  );
});
