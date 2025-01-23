import { useState } from "react";
import { useEffect } from "react";
import { MyFlashcardSet } from "../../types/types";

export const useEditFlashcardSet = (flashcardSet: MyFlashcardSet) => {
  const [currentSet, setCurrentSet] = useState<MyFlashcardSet>(flashcardSet);

  useEffect(() => {
    setCurrentSet(flashcardSet);
  }, [flashcardSet]);

  const handleEditChange = (field: string, value: string) => {
    setCurrentSet((prevSet: MyFlashcardSet) => ({
      ...prevSet,
      [field]: value,
    }));
  };

  return { currentSet, setCurrentSet, handleEditChange };
};
