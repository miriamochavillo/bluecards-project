import { useState } from "react";

export const useFlipMyFlashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return { isFlipped, handleFlip };
};
