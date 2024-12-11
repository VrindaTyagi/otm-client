import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const WorkoutLibrary = ({ homeStats, setShowLibrary }) => {
  return (
    <div className="h-screen bg-black-opacity-45 px-4 pb-[90px] pt-10">
      {' '}
      <img
        loading="lazy"
        src="assets/Movement-Frame.png"
        className="absolute left-0 top-0 -z-10 h-full w-full saturate-150"
        alt="img"
      />
      <div className="mx-[9px] mb-[26px] flex items-center justify-between">
        <div className="  flex h-[37px] w-[37px] items-center justify-center rounded-full bg-black-opacity-45 ">
          <FaArrowLeftLong onClick={() => setShowLibrary(false)} className="" />
        </div>
        <h3 className="font-sfpro text-xl text-offwhite">Workout Library</h3>
      </div>
      <div className="flex flex-col gap-3">
        <section>
          <div className="flex items-center">
            <Link
              to="/workout/today"
              className="relative flex h-[105px] w-full grow items-center justify-between rounded-xl bg-morning-zone bg-cover py-2 pl-4 pr-7 "
            >
              <div className="flex h-full flex-col justify-center">
                <h2 className="text-2xl font-medium ">Workout</h2>

                <div className="mt-2 flex gap-3">
                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className="flex  rounded-md border border-floYellow bg-dark-green-opacity-66 px-1   font-sfpro text-[12px] text-floYellow"
                  >
                    <img
                      src="/assets/yellowTimer.svg"
                      className="mr-[2px]"
                      alt="img"
                    />
                    {homeStats.hyperWorkoutParams.duration} mins
                  </h2>
                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className=" flex rounded-md border border-floYellow bg-dark-green-opacity-66 px-1  font-sfpro text-[12px] text-floYellow"
                  >
                    <img
                      src="/assets/yellow-power.svg"
                      className="mr-[2px]"
                      alt="img"
                    />
                    {homeStats.hyperWorkoutParams.calories} cal
                  </h2>
                </div>
              </div>
              {/* <img
                  className="rounded-xl"
                  style={{
                    boxShadow:
                      '0 4px 6px rgba(221, 249, 136, 0.4), 0 -4px 6px rgba(221, 249, 136, 0.4), 4px 0 6px rgba(221, 249, 136, 0.4), -4px 0 6px rgba(221, 249, 136, 0.4)',
                  }}
                  src="/assets/yellow-play.svg"
                /> */}
            </Link>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <Link
              to="/workout/flex"
              className="relative flex h-[105px] grow items-center justify-between rounded-xl bg-movement-flex bg-cover py-2 pl-4 pr-7 "
            >
              <div className="flex h-full flex-col justify-center">
                <div className="flex gap-3">
                  <h2 className="text-2xl font-medium ">Flex</h2>
                </div>

                <div className="mt-2 flex gap-3">
                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className="flex  rounded-md border border-floYellow bg-dark-green-opacity-66 px-1   font-sfpro text-[12px] text-floYellow"
                  >
                    <img
                      src="/assets/yellowTimer.svg"
                      className="mr-[2px]"
                      alt="img"
                    />
                    {homeStats.flexWorkoutParams.duration} mins
                  </h2>
                  <h2
                    style={{
                      border: '0.5px solid rgba(221,249,136,0.4)',
                    }}
                    className=" flex rounded-md border border-floYellow bg-dark-green-opacity-66 px-1  font-sfpro text-[12px] text-floYellow"
                  >
                    <img
                      src="/assets/yellow-power.svg"
                      className="mr-[2px]"
                      alt="img"
                    />
                    {homeStats.flexWorkoutParams.calories} cal
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <Link
              to="/warm-up"
              className="relative flex h-[105px] grow items-center justify-between rounded-xl bg-evening-zone bg-cover py-2 pl-4 pr-7 "
            >
              <div className="flex h-full flex-col justify-center">
                <div className="flex gap-3">
                  <h2 className="text-3xl font-medium ">Dynamic Stretch</h2>
                </div>
              </div>
            </Link>
          </div>
        </section>
        <section>
          <div className="flex items-center">
            <Link
              to="/aerobic"
              className="relative flex h-[105px] grow items-center justify-between rounded-xl bg-aerobic-img bg-cover py-2 pl-4 pr-7 "
            >
              <div className="flex h-full flex-col justify-center">
                <div className="flex gap-3">
                  <h2 className="text-3xl font-medium ">Aerobic</h2>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkoutLibrary;
