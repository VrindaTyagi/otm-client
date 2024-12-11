import { useEffect, useRef, useState } from 'react';

const Duration = ({ setDuration }) => {
  const containerRef = useRef(null);
  const itemHeightRef = useRef(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedValue, setSelectedValue] = useState(5);

  const items = Array.from({ length: 43 }, (_, i) => {
    if (i === 0 || i === 1 || i === 2 || i === 42 || i === 41 || i === 40) {
      return '';
    } else {
      const number = i - 2;
      return number * 5;
    }
  });

  useEffect(() => {
    setDuration(`${selectedValue} mins`);
  }, [selectedValue]);

  useEffect(() => {
    // Set the item height after the component mounts
    if (containerRef.current && containerRef.current.firstChild) {
      itemHeightRef.current = containerRef.current.firstChild.offsetHeight;
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = itemHeightRef.current;
    const maxScrollIndex = 36; // Corresponds to i === 40

    const currentIndex = Math.round(container.scrollTop / itemHeight);

    if (currentIndex < 0) {
      container.scrollTop = 0;
      setScrollPosition(0);
      setSelectedValue(items[0]);
    } else if (currentIndex > maxScrollIndex) {
      container.scrollTop = itemHeight * maxScrollIndex;
      setScrollPosition(maxScrollIndex);
      setSelectedValue(items[maxScrollIndex + 3]);
    } else {
      setScrollPosition(currentIndex);
      const selectedIndex = currentIndex + 3;
      setSelectedValue(items[selectedIndex]);
    }
  };

  return (
    <div>
      <div className=" font-sfpro text-[16px] text-offwhite">Duration</div>
      <div className="relative mt-1 w-full rounded-lg border border-black-opacity-25 py-3 pt-0">
        <div
          className="second-picker-container w-full rounded-xl   px-[6px]"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {items.map((item, index) => {
            const position = (index % items.length) - scrollPosition - 3;

            // console.log(index, items.length, scrollPosition, position);

            let className = 'flex justify-center second-picker-item';
            if (position === 0) {
              className += ' selected pl-[53px] ';
            } else if (position === 1 || position === -1) {
              className += ' adjacent';
            } else if (position === 2 || position === -2) {
              className += ' far';
            } else if (position === 3 || position === -3) {
              className += ' veryfar';
            }

            return (
              <div key={index} className={className}>
                {item}
                {'    '}
                {position === 0 && <div className="pl-5">mins</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Duration;
