import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence for exit animations
import mixpanel from 'mixpanel-browser';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import { axiosClient } from './apiClient';
import Movecoins from './Movecoins';
import {
  DiscountDescription,
  DiscountTag,
  GradientText,
  NextSteps,
  StatusTagText,
} from './StyledComponents';
import { formatDate } from './utils';

function OfferTile({
  offerId,
  coins,
  coinsRequired,
  type,
  description,
  discountValue,
  setTotalPurchaseData,
  setData,
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const popUpRef = useRef(null);
  const [showCongratulationsScreen, setShowCongratulationsScreen] =
    useState('');
  const [purchaseData, setPurchaseData] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [statusTag, setStatusTag] = useState('');

  function buyOffer() {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('offer ID : ', offerId);
    // call the API when clicked "YES" on the pop-up
    axiosClient
      .post(`/purchase`, {
        member: userData?.code,
        offer: offerId,
        event: 'purchase',
      })
      .then((res) => {
        console.log(res.data);
        try {
          // Track the event
          mixpanel.track('Coupon unlocked', {
            coupon_type: res.data?.type,
          });
        } catch (error) {
          console.error('Error tracking coupons:', error);
        }
        setPurchaseData(res.data);
        setData((prev) => {
          const tempObj = {};
          Object.keys(prev).map((key, index) => {
            tempObj[key] = prev[key];
          });
          tempObj['moveCoins'] = res.data?.moveCoins;
          return tempObj;
        });
        // newPurchaseData is introduced to store the requiredMovecoins on the res.data response
        const newPurchaseData = res.data;
        newPurchaseData['requiredMovecoins'] = coinsRequired;
        setTotalPurchaseData((purchaseData) => [
          newPurchaseData,
          ...purchaseData,
        ]);
        setShowCongratulationsScreen('purchaseSuccess');
      })
      .catch((err) => {
        console.log(err);
        setShowCongratulationsScreen('purchaseFailed');
      })
      .finally(() => setShowPopUp(false));
  }

  useEffect(() => {
    popUpRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAvailable(coins >= coinsRequired);
    if (coins < coinsRequired) {
      setStatusTag(`Earn ${coinsRequired - coins} more to unlock`);
    } else {
      setStatusTag('Available');
    }
  }, [showPopUp, coins, coinsRequired, statusTag]);

  const AnimatedTile = () => {
    return (
      <div
        className={`opacity-1} flex min-h-[133px] w-[171px] flex-col items-start justify-start gap-2 rounded-[12px] border-[0.5px] border-[#383838] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2`}
      >
        <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
        <DiscountTag>{discountValue}</DiscountTag>
        <DiscountDescription>{description}</DiscountDescription>
      </div>
    );
  };
  const CongratulationsScreen = () => {
    return (
      <motion.div
        className={`flex min-h-screen flex-col px-3 py-5 ${
          showCongratulationsScreen === 'purchaseSuccess'
            ? 'justify-start'
            : 'justify-between'
        } items-start gap-[5rem]`}
        initial={{ opacity: 0, scale: 0.9 }} // Start with reduced scale and opacity
        animate={{ opacity: 1, scale: 1 }} // Animate to full scale and opacity
        exit={{ opacity: 0 }} // Fade out on exit
        transition={{ duration: 0.3 }} // Optional: Set the duration of the animation
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          {showCongratulationsScreen === 'purchaseSuccess' ? (
            <>
              <img src="/assets/congratulations2.svg" alt="" />
              <p className="text-center text-xl text-[#B1B1B1]">
                You just unlocked{' '}
                <span className="text-green">{description}</span> coupon
              </p>
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-3 text-[#B1B1B1]">
              <h3 className="text-[#FA5757]font-semibold text-3xl">
                Some Error Occured!
              </h3>
              <p className="text-sm">
                Don't worry your movecoins has not been deducted
              </p>
            </div>
          )}
        </div>
        {showCongratulationsScreen === 'purchaseSuccess' && (
          <>
            <div className="flex flex-col items-start justify-center gap-5">
              <NextSteps>Next Steps..</NextSteps>
              <p className="text-md font-extralight text-[#B1B1B1]">
                Present this code to the team to avail your discount
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-1">
              <div className="flex h-fit w-full flex-row items-center justify-center rounded-lg border-[1px] border-[#7E87EF87] py-5">
                <p className="text-3xl font-black tracking-wider">
                  {purchaseData?.redeemCode}
                </p>
              </div>
              <p className="text-xs font-light text-[#B1B1B1]">
                This code will expire on{' '}
                {formatDate(purchaseData?.expiryDate, false)}
              </p>
            </div>
          </>
        )}
        <div className="flex h-fit w-full grow flex-col items-center justify-end gap-5">
          {showCongratulationsScreen === 'purchaseSuccess' && (
            <GradientText>
              Keep crushing your workouts to unlock more offers and discounts
            </GradientText>
          )}
          <Button
            text="Done"
            type="marketplace"
            action={() => setShowCongratulationsScreen('')}
          />
        </div>
      </motion.div>
    );
  };
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
          {coins < coinsRequired
            ? 'You do not have enough coins to avail this offer'
            : `Are you sure you want to buy this offer for ${coinsRequired} Movecoins?`}
        </p>
        {coins >= coinsRequired && (
          <p className="text-sm text-green">
            Current Balance : {coins} Movecoins
          </p>
        )}
        {coins >= coinsRequired && (
          <p className="text-sm text-[#D6B6F0]">
            Once you buy, you cannot reverse this action.
          </p>
        )}
        {coins >= coinsRequired ? (
          <div className="flex w-full flex-col items-center justify-around gap-2 px-3">
            <Button text="Buy" type="marketplace" action={buyOffer} />
            <Button
              text="Cancel"
              type="marketplace"
              action={() => setShowPopUp(false)}
            />
            {/* <div className='bg-green py-1 px-4 rounded-md' onClick={buyOffer}>YES</div>
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

  return (
    <div>
      <div
        className={`flex min-h-[133px] w-[171px] flex-col items-start justify-start gap-2 rounded-[12px] border-[0.5px] border-[#383838] bg-gradient-to-r from-[#171717]/10 to-[#0F0F0F] p-2 ${
          isAvailable ? 'opacity-1' : 'opacity-[0.5]'
        }`}
        onClick={() => setShowPopUp(true)}
      >
        <StatusTagText className="w-fit rounded-sm bg-[#F5C563] p-[2px]">
          {statusTag}
        </StatusTagText>
        <Movecoins fontSize={'11.483px'} coins={coinsRequired} />
        <DiscountTag>{discountValue}</DiscountTag>
        <DiscountDescription>{description}</DiscountDescription>
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
        {showCongratulationsScreen !== '' && purchaseData && (
          <div className="fixed left-0 top-0 z-[50] h-full w-full overflow-y-scroll bg-black">
            <CongratulationsScreen />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OfferTile;
