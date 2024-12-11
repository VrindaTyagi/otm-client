import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence for exit animations
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Movecoins from './Movecoins';
import {
  DiscountDescription,
  DiscountTag,
  ExpiryDescription,
  GradientText,
  NextSteps,
  StatusTagText,
} from './StyledComponents';
import { formatDate } from './utils';

function PurchaseTile({
  purchaseId,
  coinsRequired,
  value,
  purchaseDate,
  expiryDate,
  isRedeemed,
  redeemCode,
  redeemDate,
  description,
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRedeemPopUp, setShowRedeemPopUp] = useState(false);
  const popUpRef = useRef(null);
  const redeemPopUpRef = useRef(null);

  function redeemCoupon() {
    // call the API when clicked "YES" on the pop-up
    setShowRedeemPopUp(true);
    setShowPopUp(false);
  }
  function closeRedeemPopUp() {
    setShowRedeemPopUp(false);
  }

  useEffect(() => {
    popUpRef.current?.scrollIntoView({ behavior: 'smooth' });
    redeemPopUpRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showPopUp, showRedeemPopUp]);

  const PopUp = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }} // Initial animation properties
        animate={{ opacity: 1, y: 0 }} // Animation properties when pop-up is visible
        exit={{ opacity: 0, y: -20 }} // Animation properties when pop-up is hidden
        transition={{ duration: 0.3 }} // Animation duration
        className="fixed bottom-0 left-0 flex h-fit w-full flex-col items-center justify-center gap-3 rounded-b-md bg-black/60 py-5 backdrop-blur-sm"
      >
        <p className="text-gray-500 text-center text-xl font-medium">
          {isRedeemed
            ? 'You have already redeemed this offer'
            : `Are you sure you want to redeem this offer?`}
        </p>
        {!isRedeemed && (
          <p className="text-sm text-[#D6B6F0]">
            Once you redeem, you cannot reverse this action.
          </p>
        )}
        {!isRedeemed ? (
          <div className="flex w-full flex-col items-center justify-around gap-2 px-3">
            <Button text="Redeem" type="marketplace" action={redeemCoupon} />
            <Button
              text="Cancel"
              type="marketplace"
              action={() => setShowPopUp(false)}
            />
            {/* <div className='bg-green py-1 px-4 rounded-md' onClick={redeemCoupon}>YES</div>
                        <div className='bg-red py-1 px-4 rounded-md' onClick={() => setShowPopUp(false)}>NO</div> */}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-around gap-2 px-3">
            <Button
              text="Close"
              type="marketplace"
              action={() => setShowPopUp(false)}
            />
          </div>
        )}
        <div ref={popUpRef}></div>
      </motion.div>
    );
  };
  const RedeemPopUp = () => {
    return (
      <motion.div
        className="min-h-screen w-full overflow-y-scroll bg-contain bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${'/assets/achievements-bg.png'})` }}
        initial={{ opacity: 0, scale: 0.9 }} // Start with reduced scale and opacity
        animate={{ opacity: 1, scale: 1 }} // Animate to full scale and opacity
        exit={{ opacity: 0 }} // Fade out on exit
        transition={{ duration: 0.3 }} // Optional: Set the duration of the animation
      >
        <div className="flex min-h-screen w-full flex-col items-center justify-around gap-[5rem] bg-black/60 px-3 pb-[30px] pt-[30px] backdrop-blur-sm">
          <div className="flex h-full flex-col items-start justify-start gap-[5rem]">
            <div className="flex flex-col items-center justify-center gap-2">
              <img src="/assets/congratulations2.svg" alt="" />
              <p className="text-center text-xl font-semibold uppercase tracking-wider text-[#7E87EF]">
                {description}
              </p>
            </div>
            <div className="flex h-full flex-col items-start justify-center gap-[7rem]">
              <div className="flex flex-col items-start justify-center gap-2">
                <NextSteps>Next Steps..</NextSteps>
                <p className="text-md font-light text-[#B1B1B1]">
                  Present this code to the team to avail this offer
                </p>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <div className="flex h-fit w-full flex-row items-center justify-center rounded-lg border-[1px] border-[#7E87EF87] py-5">
                  <p className="text-3xl font-black">{redeemCode}</p>
                </div>
                <p className="text-xs font-light tracking-wider text-[#B1B1B1]">
                  This code will expire on {formatDate(expiryDate, false)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full grow flex-col items-center justify-end gap-3">
            <GradientText>
              Keep crushing your workouts to unlock more offers and discounts
            </GradientText>
            <Button text="Close" type="marketplace" action={closeRedeemPopUp} />
          </div>
        </div>
      </motion.div>
    );
  };
  return (
    <div>
      <div
        className={`flex min-h-[133px] w-[171px] flex-col items-start justify-start gap-2 rounded-[12px] border-[0.5px] border-[#383838] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 ${!isRedeemed ? 'opacity-1' : 'opacity-[0.5]'}`}
        onClick={() => setShowRedeemPopUp(true)}
      >
        {isRedeemed ? (
          <StatusTagText className="w-fit rounded-sm bg-[#F5C563] p-[2px]">
            Redeemed on {formatDate(redeemDate)}
          </StatusTagText>
        ) : (
          <StatusTagText className="w-fit rounded-sm bg-[#F5C563] p-[2px]">
            Not Redeemed
          </StatusTagText>
        )}
        <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
        <ExpiryDescription>
          Purchased on {formatDate(purchaseDate, false)}
        </ExpiryDescription>
        <DiscountTag>{value}</DiscountTag>
        <DiscountDescription>{description}</DiscountDescription>
        <ExpiryDescription>
          Expires on {formatDate(expiryDate, false)}
        </ExpiryDescription>
      </div>
      {/* AnimatePresence to handle exit animations */}
      <AnimatePresence>
        {showPopUp && (
          <div className="fixed left-0 top-0 z-[50] h-full w-full bg-black/40 backdrop-blur-sm">
            <PopUp />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRedeemPopUp && (
          <div
            className="fixed left-0 top-0 z-[50] h-full w-full overflow-y-scroll bg-black/40 backdrop-blur-sm"
            ref={redeemPopUpRef}
          >
            <RedeemPopUp />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PurchaseTile;
