import React from 'react';

const PaymentListItem = ({ item }) => {
  const { amount, paymentDate, membershipStartDate, membershipEndDate } = item;
  return (
    <div className="my-2 flex flex-row justify-between p-3 text-center text-xs ">
      <div className="bg-neutral-600 h-4 w-4 rounded-full pt-1">
        <img src="/assets/pay-history-dot.svg" alt="" />
      </div>
      <div className="w-1/5 text-center text-lightGray">{paymentDate}</div>
      <div className="w-1/5 text-lightGray">₹{amount}</div>
      <div className="flex w-1/5 flex-col ">
        <span className="text-green">
          {membershipStartDate}
          <br />
        </span>
        <span className="text-red">{membershipEndDate}</span>
      </div>

      {/* <div className="w-4 h-4 pt-1 bg-neutral-600">
        <img src="/assets/link-external.svg" alt='' />
      </div> */}
    </div>
  );
};

export default PaymentListItem;
