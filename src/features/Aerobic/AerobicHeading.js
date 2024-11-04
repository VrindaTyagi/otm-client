const AerobicHeading = ({ selectWorkoutId, aerobicDetail }) => {
  return (
    <div className="from-lightblue relative z-20 flex h-[40%] w-full items-end bg-gradient-to-t ">
      {selectWorkoutId === null ? (
        <div className="mb-3 flex  h-[40%] flex-col justify-end px-[31px]">
          <div className="relative z-40 text-xl text-offwhite">
            Choose Your Aerobic Session
          </div>
          <div className="pt-[12px] text-sm text-white-opacity-50">
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

                <div className="pt-[12px] text-sm text-white-opacity-50">
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
