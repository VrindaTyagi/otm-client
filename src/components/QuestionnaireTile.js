import { useNavigate } from 'react-router-dom';

const QuestionnaireTile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        idD
        onClick={() => {
          navigate('/questionnaire');
        }}
        className=""
      >
        <div
          style={{
            background:
              'var(--Gradient-purple, linear-gradient(95deg, #D6B6F0 2.94%, #848CE9 74.36%))',
          }}
          className="relative min-h-[98px] flex-col rounded-xl px-4 py-[9px]"
        >
          <div className="flex justify-between">
            <div>
              <div className="mb-2 flex h-min items-center">
                <img
                  src="/assets/weekly-checkin-calender.svg"
                  className="mr-[2px]"
                  alt="calender"
                />
                <span className="pl-1 text-[15px] text-black">
                  Complete Onboarding
                </span>
              </div>
              <div className=" w-[60%] font-sfpro text-[14px] leading-5 text-black">
                Complete your onboarding now to update your program
              </div>
            </div>

            <img
              src="/assets/weekly-checkin-intro-graph.svg"
              className="absolute bottom-0 right-[5px] z-10"
              alt="calender"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireTile;
