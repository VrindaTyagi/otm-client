import React from 'react';

function InputText({ questionCode, response, setResponse }) {
  return (
    <div>
      <div className="mt-2 w-full">
        <input
          type="text"
          value={
            (response &&
              response?.find((elem) => elem.code === questionCode)
                ?.description) ||
            ''
          }
          style={{ borderColor: '#7e87ef' }}
          className=" flex h-[67px] w-full items-start  rounded-xl bg-white-opacity-08 p-3 text-start font-light placeholder:absolute placeholder:top-3 placeholder:mb-3 placeholder:text-[14px]"
          onChange={(e) => {
            const descriptionValue = e.target.value;
            setResponse((prev) => {
              // Find the existing entry for the questionCode
              const existingIndex = prev.findIndex(
                (item) => item.code === questionCode,
              );

              if (existingIndex > -1) {
                // Update the existing entry
                const updatedResponse = [...prev];
                updatedResponse[existingIndex] = {
                  ...updatedResponse[existingIndex],
                  description: descriptionValue,
                };
                return updatedResponse;
              } else {
                // Add a new entry with the description
                return [
                  ...prev,
                  {
                    code: questionCode,
                    value: [],
                    description: descriptionValue,
                  },
                ];
              }
            });
          }}
          placeholder="Type your answer here"
        />
      </div>
    </div>
  );
}

export default InputText;
