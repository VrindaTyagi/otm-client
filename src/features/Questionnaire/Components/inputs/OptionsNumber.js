import React, { useState } from 'react';
import { HOME, FULL, LIA, MOA, NOEQ, SED, SHRED, SIZE, SUA, VEA } from '../svg';

function OptionsNumber({
  questionCode,
  options,
  MCQType,
  target,
  response,
  setResponse,
}) {
  const [isTextFieldActive, setTextFieldActive] = useState(false);

  const Option = ({
    questionCode,
    optionID,
    optionValue,
    optionDescription,
    MCQType,
    response,
    setResponse,
  }) => {
    const numbersColor = [
      {
        bg: 'bg-[rgba(250,87,87,0.20)]',
        text: 'text-[#FA5757]',
      },
      {
        bg: 'bg-[rgba(206,138,71,0.20)]',
        text: 'text-[#CE8A47]',
      },
      {
        bg: 'bg-[rgba(245,197,99,0.20)]',
        text: 'text-[#F5C563]',
      },
      {
        bg: 'bg-[rgba(148,176,48,0.08)]',
        text: 'text-[#94B030]',
      },
      {
        bg: 'bg-[rgba(94,204,123,0.20)]',
        text: 'text-[#5ECC7B]',
      },
    ];

    return (
      <div
        className={`border-box flex w-full flex-row items-center justify-between rounded-[12px]  ${
          response[questionCode]?.find((elem) => elem === optionID)
            ? `${numbersColor[optionID - 1].bg}`
            : 'bg-[#3d3d3d]/30'
        }`}
        onClick={() => {
          // If an optionID is present, remove the empty string from the list
          // If no optionID is present in the list, keep the response as [""]
          if (MCQType === 'singleChoice') {
            setResponse((prev) => {
              return {
                ...prev,
                [questionCode]: [optionID],
              };
            });
          }
        }}
      >
        <div className={`flex w-full  justify-center  `}>
          <p
            className={`font-futura text-[32px]  ${
              response[questionCode]?.find((elem) => elem === optionID)
                ? `${numbersColor[optionID - 1].text}`
                : 'text-[#b1b1b1]'
            }`}
          >
            {optionValue}
          </p>
        </div>
      </div>
    );
  };
  return (
    <div className={`flex h-full w-full items-center justify-center gap-2 `}>
      {options &&
        options?.map((option, idx) => {
          return (
            <div className="flex h-[55px] w-[45px]">
              <Option
                MCQType={MCQType}
                response={response}
                setResponse={setResponse}
                optionID={option?.id}
                optionValue={option?.value}
                optionDescription={option?.description}
                questionCode={questionCode}
                key={option?.id}
              />
            </div>
          );
        })}
    </div>
  );
}

export default OptionsNumber;
