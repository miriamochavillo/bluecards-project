import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flashcard } from "../types/types";
import { popularFlashcardContent } from "../../../../pages/PopularFlashcards/PopularFlashcardsContent";

export function useFlashcardNavigation() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Flashcard[]>([]);

  const handleFlashcardClick = (flashcard: Flashcard) => {
    const isPopular = popularFlashcardContent.some(
      (popularFlashcard) => popularFlashcard.id === flashcard.id
    );
    const path = isPopular
      ? `/popular-flashcards/${flashcard.id}`
      : `/my-flashcards/${flashcard.id}`;
    navigate(path);

    // Update recent flashcards
    setSearchResults((prev) => {
      const updated = [flashcard, ...prev.filter((f) => f.id !== flashcard.id)];
      return updated.slice(0, 6); // Limit to 6 recent flashcards
    });
  };

  return { handleFlashcardClick, searchResults };
}
