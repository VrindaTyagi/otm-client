import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import DataInputComponent from './DataInputComponent';
import Movement from './Movement.js';

const SectionDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { sectionList, index } = location.state;
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentSection, setCurrentSection] = useState(sectionList[index]);

  const handleNext = () => {
    console.log('handle next');
    if (currentIndex === sectionList.length - 1) {
      navigate('/workout-summary');
    } else {
      const newIndex = currentIndex + 1;
      console.log(newIndex);
      setCurrentIndex(newIndex);
      setCurrentSection(sectionList[newIndex]);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    console.log(newIndex);
    if (newIndex === -1) {
      return;
    }
    setCurrentIndex(newIndex);
    setCurrentSection(sectionList[newIndex]);
  };

  const { name, movements, dataInput, notes, code, rounds, description } = currentSection;

  return (
    <div className="max-h-fit min-h-screen w-screen p-4">
      <main className="pb-12">
        <h1 className="workout-gradient-text text-3xl">{name}</h1>
        {description && (
          <div className="py-2 text-sm text-lightGray">
          <p>{description}</p>
        </div>
        )}

        <div className="max-w-10/12 my-4 flex max-h-20 rounded-lg">
          <div className="flex items-center justify-center ">
            {movements && movements.length > 1 && (
              <div className="h-fit w-fit">
                <img src={'/assets/bullet-points.svg'} alt="" />
              </div>
            )}
            <ul className="pl-2 text-xs leading-7 text-lightGray">
              {/* <li>
                <span className="text-green">25</span> Butt kicks each side
              </li>
              <li>
                <span className="text-green">10</span> Reverse Lunges
              </li>
              <li>
                <span className="text-green">8</span> Alt V-crunches each side
              </li> */}
              {movements &&
                movements.map((i) => {
                  return (
                    <li key={i._id}>
                      <span className="text-green">{i.reps}</span> {i.name}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="flex grow items-center justify-around text-green">
            {movements && movements.length > 1 && (
              <div>
                <img src={'/assets/bracket-arrow.svg'} alt="" />
              </div>
            )}
            <span>x</span>
            <div className="text-3xl">{rounds}</div>
          </div>
        </div>

        {/* {code === 'METCON' && (
          <div className="my-6 flex justify-around">
            <div className="flex h-16 w-24 flex-col items-center justify-center rounded-lg border border-[#323232]">
              <span className="pt-1 text-xs text-lightGray">Target Time</span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">15</span>
                <span className="pl-1 pt-3 text-xs tracking-widest">MINS</span>
              </div>
            </div>

            <div className="flex h-16 w-24 flex-col items-center rounded-lg border border-[#323232]">
              <span className="pt-1 text-xs text-lightGray">Target Time</span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">15</span>
                <span className="pl-1 pt-3 text-xs tracking-widest">MINS</span>
              </div>
            </div>

            <div className="flex h-16 w-24 flex-col items-center rounded-lg border border-[#323232]">
              <span className="pt-1 text-xs text-lightGray">Target Time</span>
              <div className="flex h-full w-full items-center justify-center text-green">
                <span className="text-3xl">15</span>
                <span className="pl-1 pt-3 text-xs tracking-widest">MINS</span>
              </div>
            </div>
          </div>
        )} */}

        {/* {notes.length > 0 && (
        <div className="rounded-xl bg-[#0E0E0E] p-4">
          <p className="mb-2 text-xs tracking-widest">NOTES</p>
          <ul>
            {notes.map((note, idx) => (
              <li
                className="text-xs font-light tracking-wider text-lightGray"
                key={idx}
              >
                - {note}
              </li>
            ))}
          </ul>
        </div>
      )} */}

        {movements.map((movement) => (
          <Movement movement={movement} key={movement._id} />
        ))}

        <div>
          <h2 className="workout-gradient-text mb-4 mt-8 text-2xl">
            Data Inputs
          </h2>
          {dataInput.map((input, index) => (
            <DataInputComponent
              key={index}
              inputId={input.id}
              inputType={input.type}
              inputOptions={input.options}
              placeholder={input.label}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-4 h-14 w-11/12 rounded-xl border border-[#383838] bg-[linear-gradient(180deg,_#171717_0%,_#0F0F0F_100%)]">
        <div className="flex items-center justify-around pt-1">
          <Link
            className="flex h-11 items-center justify-center rounded-xl"
            to="/workout"
          >
            <span className="text-lg uppercase">Close</span>
          </Link>

          <div className="flex w-1/3 items-center justify-center space-x-3">
            <button disabled={currentIndex === 0} onClick={handlePrevious}>
              <img src="./assets/chevron.left.svg" alt="left-arrow" />
            </button>
            <p className="text-md">
              {currentIndex + 1} / {sectionList.length}
            </p>
            <button onClick={handleNext}>
              <img src="./assets/chevron.right.svg" alt="right-arrow" />
            </button>
          </div>

          <button
            className="flex h-11 items-center justify-center rounded-xl"
            onClick={() => {
              navigate('/workout-summary');
            }}
          >
            <span className="text-lg uppercase">Submit</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SectionDetail;
