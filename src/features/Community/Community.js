import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { axiosClient } from '../Leaderboard/apiClient';
import Arrow from '../Leaderboard/Arrow';
import RankDisplay from './RankDisplay';
import TimelineDisplay from './TimelineDisplay';
import { axiosClient as TimelineAxiosClient } from '../Timeline/apiClient';
import { TimelineHeading } from '../Timeline/StyledComponents';
import { capitalizeFirstLetter } from '../../utils';
import {
  getCurrentHourInTimezone,
  getDeviceTimezone,
  getGreeting,
} from '../Fitness/utils';

const Community = () => {
  const [fitnessScoreData, setFitnessScoreData] = useState([]);
  const [workoutCountData, setWorkoutCountData] = useState([]);
  const [loadingFitnessScore, setLoadingFitnessScore] = useState(true);
  const [loadingWorkoutCount, setLoadingWorkoutCount] = useState(true);
  const [userData, setUserData] = useState(null);
  const [communityloading, setCommunityLoading] = useState(false);
  const [personalLoading, setPersonalLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(null);
  const fullName = JSON.parse(localStorage.getItem('user'))['name'];
  const firstName = fullName.split(' ')[0];
  const userProfilePicture = JSON.parse(localStorage.getItem('profilePicture'));
  const { getUserFromStorage, user } = useAuth();
  const navigate = useNavigate();
  const { value } = useParams();
  const caiptalInitial = capitalizeFirstLetter(fullName);
  const code = JSON.parse(localStorage.getItem('user'))['code'];
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timezone = getDeviceTimezone();
    const currentHour = getCurrentHourInTimezone(timezone);
    const greetingMessage = getGreeting(currentHour);
    setGreeting(greetingMessage);
  }, []);

  async function getMemberData(code) {
    try {
      const res = await axiosClient.get(`/profile`, {
        params: { code: code },
      });
      if (res.data.profilePicture) {
        localStorage.setItem(
          'profilePicture',
          JSON.stringify(res.data.profilePicture),
        );
      } else {
        localStorage.setItem('profilePicture', JSON.stringify(''));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  useEffect(() => {
    if (!userProfilePicture && userProfilePicture !== '') {
      getMemberData(code);
    }
  }, []);

  useEffect(() => {
    setCommunityLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    TimelineAxiosClient.get(`?type=community&page=${page}&email=${user.email}`)
      .then((res) => {
        setData((prev) => res?.data);
        setCommunityLoading(false);
      })
      .catch((err) => {
        setError(true);
        setCommunityLoading(false);
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    setPersonalLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    TimelineAxiosClient.get(
      `?type=personal&name=${user?.name}&page=${page}&email=${user?.email}`,
    )
      .then((res) => {
        setUserData((prev) => res?.data);
        setPersonalLoading(false);
      })
      .catch((err) => {
        setError(true);
        setPersonalLoading(false);
        console.log(err);
      });
  }, [page]);

  async function getFitnessScoreData() {
    // API call for fitnessScoreData
    try {
      const res = await axiosClient.get('/fitnessScore');
      if (res.data) {
        const data = res.data;
        setFitnessScoreData(data);
      }
    } catch (error) {
      console.error('Error fetching fitnessScoreData:', error);
    } finally {
      setLoadingFitnessScore(false);
    }
  }

  async function getWorkoutCountData() {
    // API call for workoutCountData
    try {
      const res = await axiosClient.get('/consistency');
      if (res.data) {
        const data = res.data;
        setWorkoutCountData(data);
      }
    } catch (error) {
      console.error('Error fetching workoutCountData:', error);
    } finally {
      setLoadingWorkoutCount(false);
    }
  }

  useEffect(() => {
    if (user === null) {
      getUserFromStorage();
    }
  }, []);

  useEffect(() => {
    console.log('user : ', user);
    if (user) {
      console.log('user : ', user);
      setLoadingFitnessScore(true);
      setLoadingWorkoutCount(true);
      getFitnessScoreData();
      getWorkoutCountData();
    }
  }, [user]);

  if (
    !user ||
    loadingFitnessScore ||
    loadingWorkoutCount ||
    communityloading ||
    personalLoading
  ) {
    return <Loader />;
  }

  const matchingWorkoutUser = workoutCountData.rankList?.find(
    (entry) => entry.code === user.code,
  );

  const matchingFitnessUser = fitnessScoreData.rankList?.find(
    (entry) => entry.code === user.code,
  );

  return (
    <div>
      <img className="absolute -z-10  w-full " src="/assets/community-bg.svg" />

      <div className=" h-screen w-screen grow overflow-y-scroll px-4 pb-[95px]">
        <div className="mt-[77px] flex justify-between ">
          <div>
            <h3 className="font-sfpro text-[14px] text-offwhite">
              {greeting} {firstName}
            </h3>

            <h2 className="font-sfpro text-[32px] leading-10 text-offwhite">
              Community
            </h2>

            <div className="mr-[20px] font-sfpro text-[14px] text-white-opacity-50">
              Everyday is an opportunity to do some main character shit.
            </div>
          </div>
          <div className="h-[53px] min-w-[53px]">
            {' '}
            {userProfilePicture ? (
              <img
                loading="lazy"
                src={userProfilePicture}
                className="object- h-[53px] w-[53px] rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-[53px] w-[53px] items-center justify-center rounded-xl bg-black-opacity-45 text-3xl text-white">
                {caiptalInitial}
              </div>
            )}
          </div>
        </div>
        <div>
          {matchingWorkoutUser && (
            <div className="mb-3 mt-7 text-[20px] text-offwhite">
              Leaderboard
            </div>
          )}
          <div className=" flex w-full flex-col gap-2">
            {matchingWorkoutUser && (
              <RankDisplay
                selectedDataType="workout"
                name={matchingWorkoutUser?.name}
                count={matchingWorkoutUser?.workout}
                rankChange={matchingWorkoutUser?.rankChange}
                rank={matchingWorkoutUser?.rank}
                profilePicture={matchingWorkoutUser?.profilePicture}
                isCurrentUser
              />
            )}

            {matchingFitnessUser && (
              <RankDisplay
                name={matchingFitnessUser?.name}
                count={matchingFitnessUser?.totalScore}
                rankChange={matchingFitnessUser?.rankChange}
                rank={matchingFitnessUser?.rank}
                profilePicture={matchingFitnessUser?.profilePicture}
                isCurrentUser
              />
            )}
          </div>
          {data !== null && data.data.length > 0 && (
            <div className="mb-3 mt-7 text-[20px] text-offwhite">Timeline</div>
          )}
          <div className=" flex w-full flex-col gap-2">
            {userData !== null && userData.data.length > 0 && (
              <TimelineDisplay data={userData.data[0]} timeline={'personal'} />
            )}
            {data !== null && data.data.length > 0 && (
              <TimelineDisplay data={data.data[0]} timeline={'community'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
