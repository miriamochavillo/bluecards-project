import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { popularFlashcardContent } from "../PopularFlashcardsContent";
import { Flashcard } from "../types/types";
export const useFetchFlashcard = () => {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Fetch flashcard set from flashcardContent using setId
    if (!setId) return;
    const currentSet = popularFlashcardContent.find((set) => set.id === setId);
    if (currentSet) {
      setFlashcards(currentSet.flashcards || []);
      setTitle(currentSet.title);
    }
  }, [setId]);

  return { flashcards, title };
};
