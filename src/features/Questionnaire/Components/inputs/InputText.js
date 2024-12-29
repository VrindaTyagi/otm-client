import CircularSlider from '@fseehawer/react-circular-slider';
import React, { useState } from 'react';
import styled from 'styled-components';
import BMIQuestionInput from './BMIQuestionInput';
import { ReactComponent as DragIcon } from './circularKnob.svg';
import { ReactComponent as SliderLabel } from './circularSliderLabel.svg';

const NumericalTime = styled.div`
  color: var(--green, #5ecc7b);
  font-family: Anton;
`;
const TextualTime = styled.div`
  color: var(--green, #5ecc7b);
  font-family: Anton;
`;
function InputText({
  questionCode,
  response,
  setResponse,
  inputType,
  heading,
  screen,
  section,
}) {
  const [isTyping, setTyping] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`flex flex-col  rounded-xl bg-black-opacity-45  ${
        questionCode !== 'onb2' &&
        questionCode !== 'onb3' &&
        questionCode !== 'onb4'
          ? 'gap-[13px] px-3 py-[15px]'
          : 'pt-[15px]'
      } `}
    >
      {section !== 'fitness' && screen !== 4 && (
        <div
          className={`text-[14px] text-offwhite   ${
            questionCode !== 'onb2' &&
            questionCode !== 'onb3' &&
            questionCode !== 'onb4'
              ? ''
              : 'px-3 '
          }    `}
        >
          {heading}
        </div>
      )}

      <div className="w-full text-white">
        {(inputType === 'text' || inputType === 'number') &&
          questionCode !== 'onb2' &&
          questionCode !== 'onb3' &&
          questionCode !== 'onb4' && (
            <div>
              <input
                type={inputType} //text
                value={
                  questionCode &&
                  Object.keys(response)?.length > 0 &&
                  response[questionCode][0]
                }
                style={{ borderColor: '#7e87ef' }}
                className="min-h-[52px] w-full rounded-xl bg-white-opacity-08 px-[18px] placeholder:text-[14px]"
                onClickCapture={() => {
                  setTyping(true);
                }}
                onBlur={() => {
                  setTyping(false);
                }}
                onChange={(e) => {
                  setResponse((prev) => {
                    return {
                      ...prev,
                      [questionCode]: [e.target.value],
                    };
                  });
                }}
                placeholder={'Answer here...'}
              />
              {/* <motion.p
            className="textbox-text-questionnaire uppercase"
            variants={variants}
            initial="hidden"
            animate={
              isTyping || response[questionCode][0] !== ''
                ? 'visible'
                : 'hidden'
            }
          >
            {placeholder}
          </motion.p> */}
            </div>
          )}
        {(questionCode === 'onb2' ||
          questionCode === 'onb3' ||
          questionCode === 'onb4') && (
          <BMIQuestionInput code={questionCode} setResponse={setResponse} />
        )}

        {inputType === 'range' && (
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-9">
            <CircularSlider
              width={280}
              data={[15, 20, 30, 45, 60, 90, 120]}
              onChange={(val) => {
                setSliderValue(val);
                setResponse((prev) => {
                  return {
                    ...prev,
                    [questionCode]: [val],
                  };
                });
              }}
              renderLabelValue={
                <SliderLabel
                  x="50"
                  y="-50"
                  width="40px"
                  height="44px"
                  className="absolute left-[120px] top-[118px] z-10"
                />
              }
              verticalOffset="3rem"
              labelBottom={false}
              trackSize={30}
              trackColor="#242424"
              progressSize={30}
              progressColorFrom={'#D6B6F0'}
              progressColorTo={'#848CE9'}
              knobSize={50}
            >
              <DragIcon x="0" y="0" width="50px" height="50px" />
            </CircularSlider>
            <div className="flex h-fit flex-col items-center justify-center">
              <NumericalTime className="text-[52px]">
                {sliderValue}
              </NumericalTime>
              <TextualTime
                className="relative text-[22px]"
                style={{ top: '-15px' }}
              >
                mins
              </TextualTime>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputText;
