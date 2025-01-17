import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from './ApiClient';
import Conclusion from './Conclusion';
import FitnessProgress from './FitnessProgress';
import FuturePlan from './FuturePlan';
import MovecoinsDetail from './MovecoinsDetails';
import Objectives from './Objectives';
import Strategies from './Strategies';
import TotalWorkout from './TotalWorkout';
import Track from './Track';
import WeeklyWorkoutJourney from './WeeklyWorkoutJourney';
import WorkoutConsitency from './WorkoutConsitency';

const JourneyReflectionPage = () => {
  const { reportId } = useParams();
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/renewal-report?reportId=${reportId}`,
        );
        setApiData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [reportId]);
  const nameParts = apiData?.data?.name?.split(' ');
  const firstName = nameParts?.[0];
  if (error)
    return <div className="mt-12 text-center">Something Went Wrong!</div>;

  return (
    <div className="flex h-auto w-full flex-col bg-black px-2 py-5 sm:py-10">
      <div className={`px-4 sm:px-10`}>
        <h1 className="purple-gradient mt-8 text-left font-sfpro text-3xl sm:mt-14 sm:text-center sm:text-4xl">
          Your Journey Reflection
        </h1>
        <p className="mt-6 text-left font-sfpro text-[14px] font-[300] text-white sm:text-center sm:text-base">
          Your dedication to fitness despite long work hours is inspiring. Keep
          experimenting and staying consistent - you’re on the right path!
        </p>
      </div>
      <div className="mt-10 px-4 sm:px-10">
        <h1 className="text-left font-sfpro text-lg sm:text-center sm:text-2xl">
          Let's glance at your journey,{' '}
          <span className="text-[#7E87EF]">{firstName}</span>
        </h1>
      </div>
      <div className="flex flex-col space-y-20">
        <section className="mt-12 flex items-center justify-center px-4 sm:px-10">
          <WeeklyWorkoutJourney apiData={apiData} />
        </section>
        <section>
          <Objectives apiData={apiData} />
        </section>
        {apiData?.data?.totalWorkouts && (
          <section>
            <TotalWorkout apiData={apiData} />
          </section>
        )}
        {apiData?.data?.totalMovecoins && (
          <section>
            <MovecoinsDetail apiData={apiData} />
          </section>
        )}

        <section>
          <WorkoutConsitency apiData={apiData} />
        </section>

        <section>
          <FitnessProgress apiData={apiData} />
        </section>
        <section>
          <Strategies apiData={apiData} />
        </section>
        <section>
          <FuturePlan apiData={apiData} />
        </section>
        <section>
          <Track />
        </section>
        <section>
          <Conclusion apiData={apiData} />
        </section>
      </div>
    </div>
  );
};

export default JourneyReflectionPage;
