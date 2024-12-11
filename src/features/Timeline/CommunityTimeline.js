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

function CommunityTimeline() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setError] = useState(false);
  const timelineTopRef = useRef();

  // function to always take the user to the top of the page after a new page is loaded
  function scrollToTop() {
    timelineTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // function to fetch the data from the server
  const fetchData = async () => {
    const email = JSON.parse(localStorage.getItem('user'))?.email;
    setLoading((prev) => true);
    try {
      const res = await axiosClient.get(
        `?type=community&page=${page}&email=${email}`,
      );
      setData((prev) => res?.data);
      setLoading(false);
      scrollToTop();
    } catch (err) {
      setError(true);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="itmes-center hide-scrollbar mt-3 flex h-screen w-full flex-col justify-start gap-12 overflow-y-scroll pb-[50px]">
      {isError && (
        <Error className={'w-full'}>Oops! Something went wrong...</Error>
      )}
      {loading && (
        <div className="fixed left-0 z-50 h-[83%] w-full bg-black">
          <Loader className={'h-full'} />
        </div>
      )}

      {data?.data &&
        data?.data?.length !== 0 &&
        data?.data.map((data, index) => {
          if (index === 0) {
            return (
              <motion.div
                key={data?._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div ref={timelineTopRef}>
                  <TimelineTile data={data} />
                </div>
              </motion.div>
            );
          }
          return (
            <motion.div
              key={data?._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TimelineTile data={data} />
            </motion.div>
          );
        })}
      {!loading && !isError && data?.data && data?.data?.length === 0 && (
        <div className="h-screen">
          <h1 className="mt-10 text-center text-2xl text-white/90">
            No workout data yet
          </h1>
        </div>
      )}

      {!loading && !isError && data?.data && data?.data?.length !== 0 && (
        <motion.div
          className="fixed bottom-0 left-0 flex h-[50px] w-full flex-row items-center justify-center gap-5 bg-white/10 p-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`flex w-full flex-row items-center justify-start ${page > 1 ? 'text-green' : 'text-green/50'}`}
            onClick={() => {
              page > 1 && setPage((prev) => prev - 1);
            }}
          >
            <HiOutlineChevronDoubleLeft size={30} />
          </div>
          <div className="w-full text-center text-sm text-white/90">
            Page {page}
          </div>
          <div
            className={`flex w-full flex-row items-center justify-end ${data?.hasNextPage ? 'text-green' : 'text-green/50'}`}
            onClick={() => {
              data?.hasNextPage && setPage((prev) => prev + 1);
            }}
          >
            <HiOutlineChevronDoubleRight size={30} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CommunityTimeline;
