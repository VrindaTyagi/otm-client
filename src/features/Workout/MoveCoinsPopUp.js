import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components';

const Heading = styled.div`
  color: var(--Light-purple, #d6b6f0);
  text-shadow: 0px 3.9px 3.9px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: 41.6px; /* 160% */
  text-transform: capitalize;
`;
const Description = styled.p`
  color: var(--New-White, rgba(255, 255, 255, 0.56));

  /* Body condensed bold */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Instruction = styled.p`
  color: rgba(255, 255, 255, 0.56);
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RedeemButton = styled.div`
  width: 100%;
  border-radius: 12px;
  background: var(
    --Gradient-purple,
    linear-gradient(95deg, #d6b6f0 2.94%, #7e87ef 96.92%)
  );
  mix-blend-mode: screen;
`;
function MoveCoinsPopUp({ setShowPopUp, coins }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="fixed bottom-0 left-0 z-[1000] flex h-fit w-full flex-col items-center justify-start gap-7 rounded-t-lg bg-black/50 p-3 backdrop-blur-lg"
      initial={{ y: '100vh' }} // Start from the bottom of the view
      animate={{ y: 0 }} // Animate to its original position
      exit={{ y: '100vh' }} // Slide down on exit
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.7,
      }} // Optional: Set the type of transition
    >
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <img src={'/assets/coins_popup_bg.svg'} alt="coins" />
        <Heading>Movecoins Earned!!</Heading>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <Description className="flex flex-row gap-1">
          You earned{' '}
          <span className="flex flex-row gap-1 rounded-sm bg-gradient-to-tr from-[#D6B6F0] to-[#7E87EF] px-2 font-extrabold text-black">
            <img src={'/assets/otm-logo.svg'} alt="logo" />
            {coins}
          </span>{' '}
          Movecoins!
        </Description>
        <Instruction>
          Redeem your coins on your next purchase and save
        </Instruction>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <RedeemButton
          className="flex h-10 flex-row items-center justify-center text-[18px] text-black"
          onClick={() => navigate('/marketplace')}
        >
          REDEEM NOW
        </RedeemButton>
        <Button text={'SKIP'} action={() => setShowPopUp(false)} />
      </div>
    </motion.div>
  );
}

export default MoveCoinsPopUp;
