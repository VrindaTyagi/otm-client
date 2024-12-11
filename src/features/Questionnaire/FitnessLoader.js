import { motion } from 'framer-motion';
import React from 'react';

function FitnessLoader() {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex min-h-screen flex-col justify-between bg-black bg-auto bg-center bg-no-repeat px-6 py-9"
      style={{ backgroundImage: `url('/assets/fitness_score_gradient.svg')` }}
    >
      <div className="flex w-full flex-col items-start justify-start gap-7">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex w-full flex-col gap-4">
            <h1
              className="text-[32px] text-[#848ce9]"
              style={{ lineHeight: '40px', fontWeight: 500 }}
            >
              Ready, Set, Go!!
            </h1>
            <h3
              className="text-[24px] text-[#b1b1b1]"
              style={{ lineHeight: '38px', fontWeight: 500 }}
            >
              Find Your Fitness Score
            </h3>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[18px] text-[#545454]"
          style={{ fontWeight: 400, lineHeight: '25px' }}
        >
          Hang tight for a moment as we create a personalized snapshot based on
          your choices.
        </motion.p>
        <div className="relative flex h-fit w-full flex-row items-center justify-center">
          <motion.img
            src={'/assets/fitness_score_loader.svg'}
            alt="loader"
            animate={{ rotate: 360 }} // Rotate the image 360 degrees
            transition={{
              duration: 2, // Set the duration of the animation to 2 seconds
              repeat: Infinity, // Make the animation repeat indefinitely
              ease: 'linear', // Set the easing function to linear
            }}
            className="relative"
            style={{ top: '5rem' }}
          />
        </div>
      </div>
    </div>
  );
}

export default FitnessLoader;
