import { motion } from 'framer-motion';
import React from 'react';

// default animation
const defaultAnimation = {
  initial: {
    opacity: 0,
    y: '20%',
    scale: '80%',
  },
  animate: {
    opacity: 1,
    y: '0%',
    scale: '100%',
  },
  exit: {
    opacity: 0,
    y: '-20%',
    scale: '80%',
  },
};

const defaultTransition = { duration: 0.3, ease: 'easeInOut' };

function AnimatedComponent({
  children,
  animation = defaultAnimation,
  transition = defaultTransition,
  className,
}) {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedComponent;
