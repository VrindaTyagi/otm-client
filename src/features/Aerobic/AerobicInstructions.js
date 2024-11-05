import AnimatedComponent from '../../components/AnimatedComponent';

const AerobicInstructions = ({
  item,
  getSubstringUntilSec,
  IMAGE_URL,
  index,
}) => {
  return (
    <AnimatedComponent className="  mt-3 flex flex-col gap-2 overflow-y-scroll px-[16px]">
      <div className="flex h-fit w-full items-center justify-between rounded-xl bg-black-opacity-65 px-[16px] py-3 ">
        <div className="w-full">
          <h5 className="text-sm text-white-opacity-50 ">Instructions</h5>
          <div className="mt-2 flex">
            <div className="flex w-[27%] ">
              <img
                src={IMAGE_URL[index]}
                className=" ml-1 h-[62px] w-[62px] "
              />
            </div>
            <div>
              {' '}
              <div className=" flex flex-col gap-1">
                <div className="flex">
                  {item.id === 'version_1' && (
                    <h2 className=" text-sm text-white-opacity-50">
                      Perform each round for{' '}
                    </h2>
                  )}
                  {item.id === 'version_2' && (
                    <h2 className=" text-sm text-white-opacity-50">
                      Perform each round for{' '}
                    </h2>
                  )}

                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className="ml-1 flex w-fit items-center rounded-md border border-floYellow bg-dark-green-opacity-66 px-1   font-sfpro text-[12px] text-floYellow"
                  >
                    <img
                      src="/assets/yellowTimer.svg"
                      className=" mr-[4px] h-[12px] w-[12px]"
                    />

                    {item?.id !== 'version_3'
                      ? item.time
                      : getSubstringUntilSec(item.notes[0])}
                  </h2>
                </div>

                <div className="flex gap-1">
                  {item.id === 'version_1' && (
                    <h2 className=" text-sm text-white-opacity-50">Target </h2>
                  )}
                  {item.id === 'version_2' && (
                    <h2 className=" text-sm text-white-opacity-50">Target </h2>
                  )}
                  {item.id === 'version_3' ? (
                    <h2 className="flex w-fit items-center bg-green-opacity-12 px-1 text-center text-xs  text-green">
                      MAX EFFORT
                    </h2>
                  ) : (
                    <h2
                      style={{
                        border: '0.5px solid rgba(221,249,136,0.4)',
                      }}
                      className="flex w-fit items-center rounded-md border border-floYellow bg-dark-green-opacity-66 px-1  font-sfpro text-[12px] text-floYellow"
                    >
                      <img
                        src="/assets/round-icon.svg"
                        className=" mr-[4px] h-[12px] w-[12px]"
                      />
                      {item.id === 'version_1' &&
                        `${item.minRounds} - ${item.maxRounds} Rounds`}
                      {item.id === 'version_2' && `1 Round`}
                    </h2>
                  )}
                </div>

                {item.id === 'version_3' ? (
                  <h2 className="flex  text-sm text-white-opacity-50">
                    {item.notes[1]}
                  </h2>
                ) : (
                  <h2 className="flex text-white-opacity-50 last:text-sm">
                    {item.notes[0]}
                  </h2>
                )}
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
};

export default AerobicInstructions;
