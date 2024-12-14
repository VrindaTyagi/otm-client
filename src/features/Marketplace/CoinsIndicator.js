import React, { useEffect, useRef, useState } from 'react';

function CoinsIndicator({ coins, offers }) {
  const deviceWidth = window.innerWidth < 400 ? window.innerWidth - 50 : 350;
  const [lastRange, setLastRange] = useState(0);
  const [startRange, setStartRange] = useState(0);
  const [coinLength, setCoinLength] = useState(0);
  const [offersLength, setOffersLength] = useState([]);
  const [offersArray, setOffersArray] = useState([]);
  const [nearestOffer, setNearestOffer] = useState(0);
  const [nearestOfferLength, setNearestOfferLength] = useState(0);
  const nearestOfferTagRef = useRef(null);

  function calculateIndicatorValues(
    range = 5000,
    totalCoins = coins,
    offersArray = offers,
  ) {
    // range of the bar [lowerLimit, upperLimit] such that upperLimit - lowerLimit = range
    // const lowerLimit = Math.floor(totalCoins / range) * range;
    const lowerLimit = 0;
    const upperLimit = lowerLimit + range;

    // length of the moveCoin bar calculated as per the total coins
    const moveCoinBarLength =
      totalCoins - lowerLimit < 50 && totalCoins !== 0
        ? (50 / range) * deviceWidth
        : totalCoins > range
          ? (range / range) * deviceWidth
          : ((totalCoins - lowerLimit) / range) * deviceWidth;

    // calculation of the nearest offer as per the movecoins user has
    let maxOffer = Infinity;
    offersArray &&
      offersArray.map((offer) => {
        if (
          offer?.requiredMovecoins <= upperLimit &&
          offer?.requiredMovecoins >= lowerLimit
        ) {
          if (
            offer?.requiredMovecoins - totalCoins <= maxOffer &&
            offer?.requiredMovecoins - totalCoins > 0
          ) {
            maxOffer = offer?.requiredMovecoins;
            setNearestOffer(maxOffer);
          }
          const calculatedOfferLength =
            ((offer?.requiredMovecoins - lowerLimit) / range) * deviceWidth;
          setOffersArray((prev) => [...prev, offer?.requiredMovecoins]);
          setOffersLength((prev) => [...prev, calculatedOfferLength]);
        }
      });

    // setting the values to their respective states
    setLastRange(upperLimit);
    setStartRange(lowerLimit);
    // case handled when the moveCoinBarLength is 0, i.e. moveCoins = lowerLimit
    setCoinLength((prev) =>
      moveCoinBarLength === 0 ? deviceWidth / range : moveCoinBarLength,
    );

    // legth of nearest offer
    setNearestOfferLength((prev) => (nearestOffer / range) * deviceWidth);
  }
  useEffect(() => {
    calculateIndicatorValues();
    console.log('nearest offer', nearestOffer);
  }, [nearestOffer, coins, offers]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-7 px-3">
      <div
        className="relative flex flex-col items-center justify-center gap-1"
        style={{ width: deviceWidth }}
      >
        <div
          className="to to-gray-800/100 relative h-[12px] rounded-[24px] bg-gradient-to-r from-blue-gray-800/30"
          style={{ width: deviceWidth }}
        >
          <div
            className={`absolute z-[10] flex h-full flex-row items-center rounded-[24px] bg-green`}
            style={{ width: coinLength }}
          />
          <div className="relative flex h-full w-full flex-row items-center">
            {offersLength.length !== 0 &&
              offersLength?.map((offerLength, index) => {
                return (
                  <>
                    <div
                      className={`h-[16px] w-[16px] rounded-full ${offerLength <= coinLength ? 'bg-green' : 'bg-yellow/80'} absolute backdrop-blur-lg`}
                      style={{ left: offerLength - 8 }}
                      key={index}
                    />
                    <div
                      className={`text-[13px] font-extrabold  ${offerLength <= coinLength ? 'text-green' : 'text-[#828282]'} absolute top-[140%]`}
                      style={{ left: offerLength - 10 }}
                    >
                      {offersArray[index]}
                    </div>
                  </>
                );
              })}
            {nearestOffer > 0 && nearestOffer <= lastRange && (
              <div
                className={`absolute top-[-37px] flex h-[50px] w-[100px] flex-row items-start justify-center bg-cover bg-no-repeat text-[12px] font-bold text-black`}
                style={{
                  left:
                    nearestOfferLength -
                    nearestOfferTagRef.current?.offsetWidth / 2,
                  backgroundImage: `url(${'/assets/offer_dialogue.svg'})`,
                }}
                ref={nearestOfferTagRef}
              >
                <div className="pt-1">New Offer</div>
              </div>
            )}
          </div>
        </div>
        {/* coin label */}
        {/* <div className={`text-[12px] text-green absolute top-[100%]`} style={{ left: coinLength - (coinsRef.current?.offsetWidth)/2 - 5}} ref={coinsRef}>{coins}</div> */}
      </div>

      <div className="text-[14px] font-light text-white/50">
        {nearestOffer > startRange &&
        nearestOffer <= lastRange &&
        coins < nearestOffer ? (
          <p>
            Earn <span className="text-green">{nearestOffer - coins}</span> more
            to unlock a new offer!
          </p>
        ) : (
          <p>
            You've reached the top! Treat yourself and unlock some amazing
            rewards
          </p>
        )}
      </div>
    </div>
  );
}

export default CoinsIndicator;
