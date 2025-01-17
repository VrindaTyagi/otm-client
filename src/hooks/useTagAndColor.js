import { useState, useMemo, useEffect, useCallback } from 'react';

export const useTagAndColor = (inputScore, barWidth = 29) => {
  const tags = useMemo(
    () => ['Newbie', 'Beginner', 'Intermediate', 'Advanced', 'Elite'],
    [],
  );
  const colors = useMemo(
    () => ['#FA5757', '#F5C563', '#DDF988', '#5ECC7B', '#7E87EF'],
    [],
  );
  const [tagColorPosition, setTagAndColorPosition] = useState([
    tags[0],
    colors[0],
    0,
    colors,
    tags,
  ]);

  const setTagAndColorAndPosition = useCallback(
    (score) => {
      const index = Math.floor(score / 2);
      const position = index * barWidth + ((score - index * 2) / 2) * barWidth;

      return [tags[index], colors[index], position];
    },
    [colors, tags],
  );

  useEffect(() => {
    try {
      const [tag, color, position] = setTagAndColorAndPosition(inputScore);
      setTagAndColorPosition([tag, color, position, colors, tags]);
    } catch (e) {
      console.log('error : ', e);
      const position = 0;
      setTagAndColorPosition([tags[0], colors[0], position, colors, tags]);
    }
  }, [inputScore, colors, tags, setTagAndColorAndPosition]);

  return tagColorPosition;
};
