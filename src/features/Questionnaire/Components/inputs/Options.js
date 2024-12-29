import React, { useState } from 'react';
import { FULL, HOME, LIA, MOA, NOEQ, SED, SHRED, SIZE, SUA, VEA } from '../svg';

function Options({
  questionCode,
  options,
  MCQType,
  target,
  response,
  setResponse,
  heading,
  questionnaireData,
}) {
  console.log('Question code : ', questionCode);
  const [isTextFieldActive, setTextFieldActive] = useState(false);
  const RenderSVG = (name, isSelected) => {
    switch (name) {
      case 'FULL':
        return <FULL isSelected={isSelected} />;
      case 'HOME':
        return <HOME isSelected={isSelected} />;
      case 'LIA':
        return <LIA isSelected={isSelected} />;
      case 'MOA':
        return <MOA isSelected={isSelected} />;
      case 'NOEQ':
        return <NOEQ isSelected={isSelected} />;
      case 'SED':
        return <SED isSelected={isSelected} />;
      case 'SHRED':
        return <SHRED isSelected={isSelected} />;
      case 'SIZE':
        return <SIZE isSelected={isSelected} />;
      case 'SUA':
        return <SUA isSelected={isSelected} />;
      case 'VEA':
        return <VEA isSelected={isSelected} />;
      default:
        break;
    }
  };
  const Option = ({
    questionCode,
    optionID,
    optionValue,
    optionDescription,
    MCQType,
    response,
    setResponse,
  }) => {
    console.log('questioncode : ', questionCode);
    return (
      <div
        className={`border-box flex w-full flex-col items-center justify-between rounded-[12px] bg-white-opacity-08 pl-3 pr-5 ${
          response[questionCode]?.find((elem) => elem === optionID)
            ? `border-1 border ${questionnaireData.border}`
            : ''
        }`}
        onClick={() => {
          // If an optionID is present, remove the empty string from the list
          // If no optionID is present in the list, keep the response as [""]
          if (MCQType === 'multiChoice') {
            if (response[questionCode]?.find((elem) => elem === optionID)) {
              setResponse((prev) => {
                return {
                  ...prev,
                  [questionCode]: response[questionCode]?.filter(
                    (elem) => elem !== optionID,
                  ),
                };
              });
              if (response.length === 0) {
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [''],
                  };
                });
              }
            } else {
              if (
                response[questionCode] === undefined ||
                (response[questionCode]?.length === 1 &&
                  response[questionCode][0] === '')
              ) {
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [optionID],
                  };
                });
              } else {
                if (
                  optionID === 'NONE' ||
                  response[questionCode].some((item) => item === 'NONE')
                ) {
                  setResponse((prev) => {
                    return {
                      ...prev,
                      [questionCode]: [optionID],
                    };
                  });
                } else {
                  setResponse((prev) => {
                    return {
                      ...prev,
                      [questionCode]: [...response[questionCode], optionID],
                    };
                  });
                }
              }
            }
          } else if (MCQType === 'singleChoice') {
            setResponse((prev) => {
              return {
                ...prev,
                [questionCode]: [optionID],
              };
            });
          } else if (MCQType === 'singleChoiceAndOther') {
            if (isTextFieldActive) {
              setTextFieldActive(false);
            }
            setResponse((prev) => {
              return {
                ...prev,
                [questionCode]: [optionID],
              };
            });
          }
        }}
      >
        <div
          className={`flex w-full flex-col  justify-center text-center ${
            questionCode === 'onb1'
              ? 'items-center py-3'
              : 'items-start px-2 py-4'
          }`}
        >
          <p
            className={`text-center text-[14px]  ${
              response[questionCode]?.find((elem) => elem === optionID)
                ? `${questionnaireData.text}`
                : 'text-[#b1b1b1]'
            }`}
          >
            {optionValue}
          </p>
          <p
            className={`text-[13px]  ${
              response[questionCode]?.find((elem) => elem === optionID)
                ? `${questionnaireData.text}`
                : 'text-[#929292]'
            }`}
          >
            {optionDescription}
          </p>
        </div>
        {RenderSVG(
          optionID,
          response[questionCode]?.find((elem) => elem === optionID),
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-[13px] rounded-xl bg-black-opacity-45 px-3 py-[15px]">
      <div className="text-[14px] text-offwhite">{heading}</div>
      <div
        className={`flex h-full w-full  items-center justify-center gap-2 ${
          questionCode !== 'onb1' ? 'flex-col' : 'flex-row'
        } `}
      >
        {options &&
          options?.map((option, idx) => {
            return (
              <div
                className="w-full "
                style={{ marginBlock: target === 'MED' ? '20px' : '' }}
              >
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
        {MCQType === 'singleChoiceAndOther' && (
          <div className="flex w-full flex-col items-start justify-center">
            <p className="text-[20px] text-[#7e87ef]">
              {target === 'MED' ? 'If any, ' : 'Other '}
            </p>
            <input
              type={'text'} //text
              value={
                questionCode &&
                Object.keys(response)?.length > 0 &&
                isTextFieldActive
                  ? response[questionCode][0]
                  : ''
              }
              style={{ borderColor: '#7e87ef' }}
              className="textbox"
              onChange={(e) => {
                if (!isTextFieldActive) {
                  setTextFieldActive(true);
                }
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [e.target.value],
                  };
                });
              }}
              placeholder={'Please Specify'}
            />
          </div>
        )}
      </div>{' '}
    </div>
  );
}

export default Options;
