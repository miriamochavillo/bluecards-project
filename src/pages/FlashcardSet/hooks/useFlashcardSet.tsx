import { useState, useEffect } from "react";
import { MyFlashcardSet } from "../../../shared/types/typesMyFlashcardSet";
import { Flashcard } from "../../../shared/types/typesFlashcard";

export function useFlashcardSet(setId: string | undefined) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const currentSet = savedSets.find(
      (set: MyFlashcardSet) => set.id === setId
    );
    if (currentSet) {
      setFlashcards(currentSet.flashcards);
      setTitle(currentSet.title);
      setDescription(currentSet.description);
    }
  }, [setId]);

  return {
    flashcards,
    title,
    setFlashcards,
    setTitle,
    description,
    setDescription,
  };
}
