const AerobicHeading = ({ selectWorkoutId, aerobicDetail }) => {
  return (
    <div className="aerobic-gradient relative z-20 flex h-[45%] w-full items-end  ">
      {selectWorkoutId === null ? (
        <div className="mb-3 flex  h-[45%] flex-col justify-end px-[31px]">
          <div className="relative z-40 text-xl text-offwhite">
            Choose Your Aerobic Session
          </div>
          <div className="pt-[12px] text-sm text-customWhite">
            Our aerobic sessions are designed to enhance cardiovascular health,
            burn fat, and improve stamina
          </div>
        </div>
      ) : (
        aerobicDetail?.msg?.workoutsDetails.map((item) => {
          if (item?.id === selectWorkoutId) {
            return (
              <div className="mb-3 flex h-[40%]  flex-col justify-end px-[31px]">
                <div className="relative z-40 text-[32px] text-offwhite ">
                  {item.title}
                </div>

                <div className="pt-[12px] text-sm text-offwhite ">
                  Short bursts of high intensity sprints to boost power and
                  speed
                </div>
              </div>
            );
          } else return null;
        })
      )}
    </div>
  );
};

export default AerobicHeading;
