import React, { useState } from 'react';
import { HOME, FULL, LIA, MOA, NOEQ, SED, SHRED, SIZE, SUA, VEA } from '../svg';

function OptionsSecond({
  questionCode,
  options,
  MCQType,
  target,
  response,
  setResponse,
}) {
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
    return (
      <div
        className={`border-box flex w-full flex-row items-center justify-between rounded-[12px] bg-[#3d3d3d]/30 pl-3 pr-5 ${
          response &&
          response?.find(
            (elem) =>
              elem?.code === questionCode && elem?.value?.includes(optionID),
          )
            ? 'border-1 border border-[#7e87ef]'
            : ''
        }`}
        onClick={() => {
          setResponse((prev) => {
            const existingIndex = prev.findIndex(
              (item) => item.code === questionCode,
            );

            if (existingIndex > -1) {
              // Update existing entry for the questionCode
              const updatedResponse = [...prev];
              updatedResponse[existingIndex] = {
                ...updatedResponse[existingIndex],
                value:
                  MCQType === 'multiChoice'
                    ? // Toggle the optionID for multiChoice
                      updatedResponse[existingIndex].value.includes(optionID)
                      ? updatedResponse[existingIndex].value.filter(
                          (id) => id !== optionID,
                        )
                      : [...updatedResponse[existingIndex].value, optionID]
                    : [optionID], // Replace for singleChoice
                description: '', // Optional, update if needed
              };
              return updatedResponse;
            } else {
              // Add a new entry
              return [
                ...prev,
                {
                  code: questionCode,
                  value: [optionID],
                  description: '',
                },
              ];
            }
          });
        }}
      >
        <div
          className={`flex w-full flex-col items-center justify-center ${
            questionCode === 'su1' ? 'items-center py-3' : 'items-start py-4'
          }`}
        >
          <p
            className={`text-center text-[12px]  ${
              response[questionCode]?.find((elem) => elem === optionID)
                ? 'text-[#7e87ef]'
                : 'text-[#b1b1b1]'
            }`}
          >
            {optionValue}
          </p>
          <p
            className={`text-[13px]  ${
              response[questionCode]?.find((elem) => elem === optionID)
                ? 'text-[#7e87ef]'
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
    <div>
      <div className={`grid h-full w-full grid-cols-2 items-center  gap-2 `}>
        {options &&
          options?.map((option, idx) => {
            return (
              <div
                key={option.id}
                className="flex w-full"
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
      </div>
    </div>
  );
}

export default OptionsSecond;
