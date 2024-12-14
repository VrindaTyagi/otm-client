import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ProfilePicture from '../Profile/ProfilePicture';
import Arrow from './Arrow';

const ListItem = ({ isCurrentUser, user, mode }) => {
  const { rank, name, rankChange, profilePicture } = user;
  const count = mode === 'workout' ? user.workout : user.totalScore;

  const defaultClassName = ` h-[75px]  ${
    isCurrentUser
      ? 'mix-blend-screen bg-[#3C3C3C] bg-opacity-10 leaderboard-user-list-item border-opacity-80 rounded-xl'
      : ''
  } w-full flex flex-row justify-between px-auto`;

  return (
    <div className="border-gray-600 w-full border-b-[0.5px]">
      <div className={defaultClassName}>
        <div className="flex w-full flex-row items-center justify-start gap-2 px-3">
          <div className="leaderboard-gradient-text flex basis-1/6 flex-row items-center justify-start">
            {rank}
          </div>
          {profilePicture !== '' ? (
            <div className="flex h-fit w-fit flex-row items-center justify-center">
              <ProfilePicture
                inputPic={profilePicture}
                altText={name}
                height={'40px'}
                width={'40px'}
              />
            </div>
          ) : (
            <FaUserCircle size={40} color={'#91BDF6'} />
          )}
          <div className="ml-[5px] basis-4/6 text-lg font-normal">{name}</div>
        </div>

        <div className="flex flex-row items-center justify-around px-4">
          <span className="mr-4 flex h-5 w-5 flex-row items-center justify-center text-[21.47px]">
            {count}
          </span>
          <Arrow value={rankChange} />
        </div>
      </div>
      {!isCurrentUser && <div className="w-7/8 bg-gray-700 h-[0.5]"></div>}
    </div>
  );
};

export default ListItem;
