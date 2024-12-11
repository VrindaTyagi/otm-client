import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import {
  IoIosArrowDown,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
  IoMdArrowRoundUp,
} from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useFormattedDateTime } from '../../hooks/useFormattedDateTime';
import { useTagAndColor } from '../../hooks/useTagAndColor';
import ProfilePicture from '../Profile/ProfilePicture';
import { axiosClient } from './apiClient';
import AssesmentTile from './AssesmentTile';
import IndividualComment from './IndividualComment';
import { Date, InfoTile, Name, TagText } from './StyledComponents';
import WorkoutTile from './WorkoutTile';

const TimelineTile = ({ data }) => {
  console.log(data);
  const [collapsed, setCollapsed] = useState(true);
  const [coachNoteIndex, setCoachNoteIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);
  const [liked, setLiked] = useState(data?.isLiked);
  const [kudos, setKudos] = useState(data?.kudos);
  const [commentsState, setCommentsState] = useState(data?.comments);
  const [isLiking, setIsLiking] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  // refs
  const typedCommentRef = useRef(null);
  const typeOfCommentRef = useRef(null);

  // custom hooks
  const [formattedDate, formattedTime] = useFormattedDateTime(data?.time);
  const [tag, color] = useTagAndColor(data?.fitnessScoreUpdates?.newScore);

  async function handleLike(action) {
    if (isLiking) return; // If a request is in progress, ignore additional clicks
    setIsLiking(true); // Set isLiking to true when a request starts
    const event = action === 'like' ? 'kudos' : 'kudosRemoved';

    const payload = {
      postId: data?._id,
      event,
      eventBy: JSON.parse(localStorage.getItem('user'))?.email,
    };

    try {
      const response = await axiosClient.post('/', payload);
      setLiked((prev) => !prev);
      setKudos((prev) => (action === 'like' ? prev + 1 : prev - 1));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLiking(false); // Set isLiking to false when a request finishes
    }
  }

  function handleComment() {
    setIsCommenting(true);
    const comment = typedCommentRef.current.value;
    const APICall = async (payload) => {
      try {
        const response = await axiosClient.post('/', payload);
        typedCommentRef.current.value = '';
        const newComment = response.data.data;
        newComment['name'] = JSON.parse(localStorage.getItem('user'))?.name;
        setCommentsState((prev) => [newComment, ...prev]);
        setIsCommenting(false);
      } catch (err) {
        typedCommentRef.current.value =
          typedCommentRef.current.value + ' (failed to post)';
        typedCommentRef.current.style.color = 'red';
        setTimeout(() => {
          typedCommentRef.current.value = '';
          typedCommentRef.current.style.color = 'rgb(189,189,189)';
          setIsCommenting(false);
        }, 2000);
        console.log(err);
      }
    };
    // payload for the API call
    const payload =
      comment !== '' &&
      typeOfCommentRef.current?.entity === 'parent' &&
      typeOfCommentRef.current?.parentCommentId === null
        ? {
            postId: data?._id,
            event: 'comment',
            comment: comment,
            eventBy: JSON.parse(localStorage.getItem('user'))?.email,
            isParentComment: true,
            parentCommentId: null,
          }
        : {
            postId: data?._id,
            event: 'comment',
            comment: comment,
            eventBy: JSON.parse(localStorage.getItem('user'))?.email,
            isParentComment: false,
            parentCommentId: typeOfCommentRef.current?.parentCommentId,
          };
    // final API call
    APICall(payload);
  }

  const CommentsContainer = ({ comments }) => {
    return (
      <div className="fixed left-0 top-0 z-50 h-screen w-full bg-black">
        {/* Closing Icon */}
        <div
          className="absolute top-0 flex h-fit w-full flex-row items-center justify-center rounded-b-xl"
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
        >
          <IoIosArrowDown size={30} />
        </div>

        {/* Comments */}
        <div className="mt-10 flex h-[90%] w-full flex-col items-start justify-start gap-4 overflow-y-scroll px-4 pb-7">
          {comments && comments?.length > 0 ? (
            comments?.map((comment, index) => {
              return (
                <IndividualComment
                  commentId={comment?._id}
                  name={comment?.name}
                  eventBy={comment?.eventBy}
                  comment={comment?.comment}
                  isParentComment={comment?.isParentComment}
                  parentCommentId={comment?.parentCommentId}
                  createdAt={comment?.createdAt}
                  allComments={commentsState}
                  profilePicture={comment?.profilePicture}
                  ref={{ typeOfCommentRef, typedCommentRef }}
                  key={Math.random() * 1000}
                />
              );
            })
          ) : (
            <div className="flex h-screen w-full flex-col items-center justify-center text-xl text-green">
              No comments yet
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t-gray-600 fixed bottom-0 z-50 flex h-fit w-full flex-row items-center justify-between gap-1 border-t-[0.8px] bg-black px-2">
          <input
            type="text"
            placeholder="Add a comment"
            className="text-gray-400 h-[50px] w-full bg-transparent px-2 outline-none"
            ref={typedCommentRef}
            onClick={() =>
              (typeOfCommentRef.current = {
                entity: 'parent',
                parentCommentId: null,
              })
            }
          />
          <button
            className="rounded-full bg-light-blue-600 px-3 py-1"
            disabled={isCommenting}
            onClick={(e) => handleComment()}
          >
            <IoMdArrowRoundUp size={20} color={'white'} />
          </button>
        </div>
      </div>
    );
  };
  const commentAnimations = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      {showComment && (
        <motion.div
          className="fixed left-0 top-0 z-50 h-screen w-full bg-black"
          variants={commentAnimations}
          initial="hidden"
          animate={showComment ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <CommentsContainer comments={commentsState} />
        </motion.div>
      )}
      <div className="flex w-full flex-col rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="mb-2 flex flex-row items-center justify-center gap-2">
            {data?.profilePicture !== '' ? (
              <div className="flex flex-row items-center justify-center">
                <ProfilePicture
                  inputPic={data?.profilePicture}
                  altText={data?.name}
                  width={'40px'}
                  height={'40px'}
                />
              </div>
            ) : (
              <FaUserCircle size={40} color={'#91BDF6'} />
            )}
            <Name>{data?.name}</Name>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="flex h-fit w-fit flex-row items-center justify-center rounded-[4px] px-[5px] py-[1px]"
          >
            <TagText>{tag}</TagText>
          </div>
        </div>

        <Date>{formattedDate}</Date>
        <div className="timeline-tags my-2 flex flex-row space-x-3 text-xs">
          {/* <InfoTile>Horizontal Pull</InfoTile> */}
          <InfoTile>{formattedTime}</InfoTile>
          <InfoTile>Total Workouts {data?.consistency?.total}</InfoTile>
          <div className="flex items-center justify-center gap-2 rounded border  border-white-opacity-23 bg-[rgba(59,59,59,0.06)] p-0.5 px-2 backdrop-blur-[17px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/move-coins-logo.svg`}
              className="h-4 w-4"
              alt="move coins logo"
            />
            <p>{data?.moveCoins} Coins</p>
          </div>

          {/* <InfoTile>700Kcal</InfoTile> */}
        </div>
        {data?.achievement?.length > 0 && (
          <section className="my-4 flex flex-col justify-center rounded-lg p-2 backdrop-blur-sm">
            <h4 className="mb-4 justify-center text-xs uppercase tracking-[3px] text-lightGray">
              achievements unlocked
            </h4>

            <div className="my-2 flex h-fit w-full items-center justify-between">
              {data?.achievement?.length > 1 && (
                <span>
                  <HiOutlineChevronLeft
                    size={25}
                    onClick={() => {
                      try {
                        setAchievementsIndex(
                          (prev) =>
                            (prev - 1 + data?.achievement?.length) %
                            data?.achievement?.length,
                        );
                      } catch (err) {
                        setAchievementsIndex(0);
                      }
                    }}
                  />
                </span>
              )}
              {/* <div className="flex h-full w-full items-center justify-center px-2 rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] ">
                <p className=" text-[10px]">
                  {achievements[achievementsIndex]?.description}
                </p>
                <div className="h-[7rem] w-[7rem] flex flex-row justify-center items-center">
                  <img
                    className="h-[7rem] w-[7rem]"
                    src="/assets/badge.svg"
                    alt="badge"
                  />
                </div>
              </div> */}

              <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                <p className="w-full text-center tracking-widest">
                  {data?.achievement[achievementsIndex]?.medal}{' '}
                  {data?.achievement[achievementsIndex]?.movementInfo?.name} :{' '}
                  {data?.achievement[achievementsIndex]?.weight}
                </p>
              </div>

              {data?.achievement?.length > 1 && (
                <span>
                  <HiOutlineChevronRight
                    size={25}
                    onClick={() => {
                      setAchievementsIndex(
                        (prev) => (prev + 1) % data?.achievement?.length,
                      );
                    }}
                  />
                </span>
              )}
            </div>
          </section>
        )}
        {data?.coachNotes?.length > 0 && (
          <section className=" flex flex-col items-start justify-center rounded-lg p-2 backdrop-blur-sm">
            <h4 className="justify-center text-[10px] uppercase tracking-[3px] text-lightGray">
              coach notes
            </h4>

            <div className="mb-4 mt-2 flex h-20 w-full items-center justify-between">
              <span>
                <HiOutlineChevronLeft
                  size={25}
                  onClick={() => {
                    try {
                      setCoachNoteIndex(
                        (prev) =>
                          (prev - 1 + data?.coachNotes?.length) %
                          data?.coachNotes?.length,
                      );
                    } catch (err) {
                      setCoachNoteIndex(0);
                    }
                  }}
                />
              </span>
              <div className="h-fit w-full rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)] p-4 text-xs">
                <p>{data?.coachNotes[coachNoteIndex]?.description}</p>
              </div>

              <span>
                <HiOutlineChevronRight
                  size={25}
                  onClick={() => {
                    try {
                      setCoachNoteIndex(
                        (prev) => (prev + 1) % data?.coachNotes?.length,
                      );
                    } catch (err) {
                      setCoachNoteIndex(0);
                    }
                  }}
                />
              </span>
            </div>
          </section>
        )}
        {data?.sectionPerformance?.map((workout, index) => {
          if (workout?.name === 'Assessment') {
            return (
              <AssesmentTile
                currScore={data?.fitnessScoreUpdates?.newScore}
                prevScore={data?.fitnessScoreUpdates?.oldScore}
                assessmentFeedback={workout?.displayInfo}
                key={index}
              />
            );
          }
        })}
        {!collapsed && (
          <motion.div
            className="mt-4 grid grid-cols-1 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {data?.sectionPerformance?.map((workout, index) => {
              if (index !== 0 && workout?.name !== 'Assessment') {
                return (
                  <motion.div
                    key={Math.random() * 1000}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <WorkoutTile
                      workoutName={workout?.name}
                      rounds={workout?.round}
                      feedback={workout?.displayInfo}
                      workoutCompleted={workout?.completed}
                      key={Math.random() * 1000}
                    />
                  </motion.div>
                );
              }
            })}
          </motion.div>
        )}
        {collapsed ? (
          <div
            className="flex select-none flex-row items-center justify-end gap-1 pt-5 text-green"
            onClick={() => {
              setCollapsed(false);
            }}
          >
            <p className="text-sm">show more</p>
            <IoIosArrowDropdownCircle size={20} />
          </div>
        ) : (
          <div
            className="flex select-none flex-row items-center justify-end gap-1 pt-2 text-green"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <p className="text-sm">show less</p>
            <IoIosArrowDropupCircle size={20} />
          </div>
        )}
      </div>
      <div className="felx-row flex w-full items-center justify-between">
        <div className="flex w-full basis-1/2 flex-row items-center justify-start gap-2 p-2">
          {liked ? (
            <AiTwotoneLike
              size={25}
              color={'white'}
              onClick={() => handleLike('unlike')}
            />
          ) : (
            <AiOutlineLike
              size={25}
              color={'white'}
              onClick={() => handleLike('like')}
            />
          )}
          <p>{kudos} kudos</p>
        </div>
        <div
          className="flex w-full basis-1/2 flex-row items-center justify-end gap-2 p-2"
          onClick={() => setShowComment((prev) => true)}
        >
          <IoChatbubbleOutline size={25} color={'white'} />
          <p>
            {
              commentsState?.filter((comment) => comment?.isParentComment)
                ?.length
            }{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineTile;
