import { useState } from "react";

export const useFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return { isFlipped, handleFlip };
};
