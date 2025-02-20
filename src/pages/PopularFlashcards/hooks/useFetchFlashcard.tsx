import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { popularFlashcardContent } from "../PopularFlashcardsContent";
import { Flashcard } from "../../../shared/types/typesFlashcard";

export const useFetchFlashcard = () => {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!setId) return;
    const currentSet = popularFlashcardContent.find((set) => set.id === setId);
    if (currentSet) {
      setFlashcards(currentSet.flashcards || []);
      setTitle(currentSet.title);
    }
  }, [setId]);

  return { flashcards, setFlashcards, title };
};
