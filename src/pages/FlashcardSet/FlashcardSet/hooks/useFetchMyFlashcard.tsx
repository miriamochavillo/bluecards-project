import { useEffect, useState } from "react";
import { Flashcard } from "../../../../shared/types/typesFlashcard";
import { useParams } from "react-router-dom";
import { MyFlashcardSet } from "../../../../shared/types/typesMyFlashcardSet";

export default function useFetchMyFlashcard() {
  const { setId } = useParams();
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
    }
  }, [setId]);

  return {
    setId,
    title,
    setTitle,
    description,
    setDescription,
    flashcards,
    setFlashcards,
  };
}
