import { useState } from "react";
import { Flashcard } from "../types/types";

export function useFlashcardNavigation(flashcards: Flashcard[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  return { currentIndex, handleNext, handlePrevious };
}
