import { useState } from 'react';

const useArrayNavigation = array => {
  const [activeIndex, setActiveQuoteIndex] = useState(0);

  const previous = () => {
    if (activeIndex > 0) setActiveQuoteIndex(activeIndex - 1);
    if (activeIndex === 0) setActiveQuoteIndex(array.length - 1);
  };
  const next = () => {
    if (activeIndex < array.length - 1) setActiveQuoteIndex(activeIndex + 1);
    if (activeIndex === array.length - 1) setActiveQuoteIndex(0);
  };

  return {
    next,
    previous,
    activeIndex,
  };
};

export default useArrayNavigation;
