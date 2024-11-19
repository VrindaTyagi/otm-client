import React, { useState } from 'react';
import AnalyseMealComp from './components/AnalyseMealComp';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './ReduxStore/store';

const MealUploadHeading = styled.h1`
  color: var(--White, #fff);
  text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
`;

const MealUpload = () => {
  const navigate = useNavigate();
  const [titleVisible, setIsTitleVisible] = useState(true);

  return (
    <>
      <div className="flex h-screen w-full flex-col justify-start px-4 py-8">
        {titleVisible && (
          <div className="flex h-fit">
            <div className="flex w-full justify-between">
              <div className="flex h-full w-full flex-col items-start justify-between">
                <div className="mb-4">
                  <HiArrowNarrowLeft
                    size={20}
                    onClick={() => {
                      navigate('/nutrition');
                    }}
                  />
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                  <MealUploadHeading>Meal Upload</MealUploadHeading>
                </div>
              </div>
            </div>
          </div>
        )}
        <Provider store={store}>
          <div className=" mx-auto w-full">
            <AnalyseMealComp setIsTitleVisible={setIsTitleVisible} />
          </div>
        </Provider>
      </div>
    </>
  );
};

export default MealUpload;
