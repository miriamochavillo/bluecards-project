import { useState } from "react";
import { Flashcard } from "../../../../shared/types/typesFlashcard";

export function useFlashcardNavigation(flashcards: Flashcard[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  return { currentIndex, isFlipped, handleFlip, handleNext, handlePrevious };
}
