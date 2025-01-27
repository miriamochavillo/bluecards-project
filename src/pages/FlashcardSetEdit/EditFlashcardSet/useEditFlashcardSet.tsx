import { useState, useEffect } from "react";
import { MyFlashcardSet } from "../../../shared/types/typesMyFlashcardSet";

export function useEditFlashcardSet(flashcardSet: MyFlashcardSet) {
  const [currentSet, setCurrentSet] = useState<MyFlashcardSet>(flashcardSet);

  useEffect(() => {
    setCurrentSet(flashcardSet);
  }, [flashcardSet]);

  const handleEditChange = (field: string, value: string) => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      [field]: value,
    }));
  };

  return { currentSet, setCurrentSet, handleEditChange };
}
