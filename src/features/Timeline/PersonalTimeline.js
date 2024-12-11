import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from 'react-icons/hi';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { axiosClient } from './apiClient';
import TimelineTile from './TimelineTile';

function PersonalTimeline() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const timelineTopRef = useRef();
  const [isError, setError] = useState(false);

  function scrollToTop() {
    timelineTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    axiosClient
      .get(
        `?type=personal&name=${user?.name}&page=${page}&email=${user?.email}`,
      )
      .then((res) => {
        setUserData((prev) => res?.data);
        setLoading(false);
        scrollToTop();
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, [page]);

  return (
    <motion.div
      className="hide-scrollbar mt-3 flex h-screen w-full flex-col items-center justify-start gap-5 overflow-y-scroll pb-[50px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isError && (
        <Error className={'w-full'}>Oops! Something went wrong...</Error>
      )}
      {loading && (
        <div className="fixed left-0 z-50 h-[83%] w-full bg-black">
          <Loader className={'h-full'} />
        </div>
      )}
      {userData?.data &&
        userData?.data?.length !== 0 &&
        userData?.data?.map((data, index) => (
          <motion.div
            key={data?._id}
            ref={index === 0 ? timelineTopRef : null}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-fit w-full"
          >
            <TimelineTile data={data} />
          </motion.div>
        ))}
      {!loading && !isError && userData?.data?.length === 0 && (
        <div className="h-screen">
          <h1 className="mt-10 text-center text-2xl text-white/90">
            No workout data yet
          </h1>
        </div>
      )}
      {!loading && !isError && userData?.data?.length !== 0 && (
        <motion.div
          className="fixed bottom-0 left-0 flex h-[50px] w-full flex-row items-center justify-center gap-5 bg-white/10 p-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={`flex w-full flex-row items-center justify-start ${page > 1 ? 'text-green' : 'text-green/50'}`}
            onClick={() => page > 1 && setPage((prev) => prev - 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiOutlineChevronDoubleLeft size={30} />
          </motion.div>
          <div className="w-full text-center text-sm text-white/90">
            Page {page}
          </div>
          <motion.div
            className={`flex w-full flex-row items-center justify-end ${userData?.hasNextPage ? 'text-green' : 'text-green/50'}`}
            onClick={() => userData?.hasNextPage && setPage((prev) => prev + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiOutlineChevronDoubleRight size={30} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default PersonalTimeline;
