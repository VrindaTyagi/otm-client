const AerobicInitialTile = ({
  setSelectWotkoutId,
  aerobicDetail,
  IMAGE_URL,
  getSubstringUntilSec,
}) => {
  return (
    <div className="aerobic-initialscreen-gradient-opposite relative  top-0 z-30 flex h-[55%]   flex-col ">
      <div className=" mb-6 mt-3  flex flex-col gap-2 overflow-y-scroll px-[16px] ">
        {aerobicDetail?.msg?.workoutsDetails.map((item, index) => (
          <div
            className="flex h-[102px] w-full items-center justify-between rounded-xl bg-black-opacity-65 px-[16px] "
            onClick={() => setSelectWotkoutId(item.id)}
          >
            <div>
              <div className="flex">
                <img src={IMAGE_URL[index]} className=" " />
                <div className="ml-1 text-[20px]">{item.title}</div>
              </div>
              <div className="mt-2 flex gap-3">
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className="bg-dark-green-opacity-66  flex rounded-md border border-floYellow px-1   font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/yellowTimer.svg" className="mr-[2px]" />

                  {item?.id !== 'version_3'
                    ? item.time
                    : getSubstringUntilSec(item.notes[0])}
                </h2>

                {item.id === 'version_3' ? (
                  <h2 className="flex items-center bg-green-opacity-12 px-1 text-center text-xs text-green">
                    MAX EFFORTS
                  </h2>
                ) : (
                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className=" bg-dark-green-opacity-66 flex rounded-md border border-floYellow px-1  font-sfpro text-[12px] text-floYellow"
                  >
                    <img src="/assets/round-icon.svg" className="mr-[2px]" />
                    {item.id === 'version_1' &&
                      `${item.minRounds} - ${item.maxRounds} Rounds`}
                    {item.id === 'version_2' && `1 Round`}
                  </h2>
                )}
              </div>
            </div>
            <img
              className="h-[60px] w-[60px] rounded-xl"
              style={{
                boxShadow:
                  '0 4px 6px rgba(221, 249, 136, 0.2), 0 -4px 6px rgba(221, 249, 136, 0.2), 4px 0 6px rgba(221, 249, 136, 0.2), -4px 0 6px rgba(221, 249, 136, 0.2)',
              }}
              src={'/assets/yellow-play.svg'}
            />
            {/* <div>sdsds</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AerobicInitialTile;
