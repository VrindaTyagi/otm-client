import React from 'react';

function OptionsNumber({
  questionCode,
  options,
  MCQType,
  target,
  response,
  setResponse,
}) {
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
          response &&
          response?.find(
            (elem) =>
              elem?.code === questionCode &&
              elem?.value?.includes(Number(optionID)),
          )
            ? `${numbersColor[Number(optionID) - 1].bg}`
            : 'bg-[#3d3d3d]/30'
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
                    : [Number(optionID)], // Replace for singleChoice
                description: '', // Optional, update if needed
              };
              return updatedResponse;
            } else {
              // Add a new entry
              return [
                ...prev,
                {
                  code: questionCode,
                  value: [Number(optionID)],
                  description: '',
                },
              ];
            }
          });
        }}
      >
        <div className={`flex w-full  justify-center  `}>
          <p
            className={`font-futura text-[32px]  ${
              response &&
              response?.find(
                (elem) =>
                  elem?.code === questionCode &&
                  elem?.value?.includes(Number(optionID)),
              )
                ? `${numbersColor[Number(optionID) - 1].text}`
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
