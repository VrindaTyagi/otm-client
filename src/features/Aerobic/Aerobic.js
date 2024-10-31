import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

const Aerobic = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-screenBackgroundColor h-screen">
      <div className=" absolute left-3 top-3 z-40 flex h-[37px] w-[37px] items-center justify-center rounded-full bg-black-opacity-45 ">
        <FaArrowLeftLong onClick={() => navigate('/home')} />
      </div>
      <img
        src="./assets/aerobic-background.png "
        className="absolute z-10 h-[400px] w-full object-cover "
      />
      <div className="absolute z-20 h-14 w-14 bg-purple-300"></div>

      {/* <img
        src="./assets/aerobic-gradient.svg "
        className="absolute right-0 top-0 z-20 h-screen w-full saturate-200  "
      /> */}
      <div className="relative top-0 z-30 flex h-full flex-col ">
        <div className="flex h-[400px]  flex-col justify-end px-[31px]">
          <div className="relative z-40 text-xl text-offwhite">
            Choose Your Aerobic Session
          </div>
          <div className="pt-[12px] text-sm text-white-opacity-50">
            Our aerobic sessions are designed to enhance cardiovascular health,
            burn fat, and improve stamina
          </div>
        </div>
        <div className=" mt-3  overflow-y-scroll px-[16px] ">
          <div className="flex h-[102px] w-full items-center justify-between rounded-xl bg-black-opacity-45 px-[16px] ">
            <div>
              <div className="flex">
                <img src="./assets/aerobic-run.svg " className=" " />
                <div className="ml-1 text-[20px]">Sprint Work</div>
              </div>
              <div className="mt-2 flex gap-3">
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className="bg-dark-green-opacity-66  flex rounded-md border border-floYellow px-1   font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/yellowTimer.svg" className="mr-[2px]" />
                  10 mins
                </h2>
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className=" bg-dark-green-opacity-66 flex rounded-md border border-floYellow px-1  font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/round-icon.svg" className="mr-[2px]" />
                  332 Rounds
                </h2>
              </div>
            </div>
            {/* <div>sdsds</div> */}
          </div>
          <div className="mt-2 flex h-[102px] w-full items-center justify-between rounded-xl bg-black-opacity-45 px-[16px]">
            <div>
              <div className="flex">
                <img src="./assets/aerobic-run.svg " className=" " />
                <div className="ml-1 text-[20px]">Sprint Work</div>
              </div>
              <div className="mt-2 flex gap-3">
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className="bg-dark-green-opacity-66  flex rounded-md border border-floYellow px-1   font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/yellowTimer.svg" className="mr-[2px]" />
                  10 mins
                </h2>
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className=" bg-dark-green-opacity-66 flex rounded-md border border-floYellow px-1  font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/round-icon.svg" className="mr-[2px]" />
                  332 Rounds
                </h2>
              </div>
            </div>
            {/* <div>sdsds</div> */}
          </div>
          <div className="mt-2 flex h-[102px] w-full items-center justify-between rounded-xl bg-black-opacity-45 px-[16px] ">
            <div>
              <div className="flex">
                <img src="./assets/aerobic-run.svg " className=" " />
                <div className="ml-1 text-[20px]">Sprint Work</div>
              </div>
              <div className="mt-2 flex gap-3">
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className="bg-dark-green-opacity-66  flex rounded-md border border-floYellow px-1   font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/yellowTimer.svg" className="mr-[2px]" />
                  10 mins
                </h2>
                <h2
                  style={{
                    border: '0.5px solid rgba(221,249,136,0.4)',
                  }}
                  className=" bg-dark-green-opacity-66 flex rounded-md border border-floYellow px-1  font-sfpro text-[12px] text-floYellow"
                >
                  <img src="/assets/round-icon.svg" className="mr-[2px]" />
                  332 Rounds
                </h2>
              </div>
            </div>
            {/* <div>sdsds</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aerobic;
