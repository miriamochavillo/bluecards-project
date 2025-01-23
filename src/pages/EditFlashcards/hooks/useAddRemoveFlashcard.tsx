import { MyFlashcardSet, Flashcard } from "../types/typesEditMyFlashcard";

export const useAddRemoveFlashcard = (
  currentSet: MyFlashcardSet,
  setCurrentSet: React.Dispatch<React.SetStateAction<MyFlashcardSet>>
) => {
  const handleFlashcardChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFlashcards = [...currentSet.flashcards];
    updatedFlashcards[index] = {
      ...updatedFlashcards[index],
      [field]: value,
    };
    setCurrentSet((prevSet: MyFlashcardSet) => ({
      ...prevSet,
      flashcards: updatedFlashcards,
    }));
  };

  const addFlashcard = () => {
    setCurrentSet((prevSet: MyFlashcardSet) => ({
      ...prevSet,
      flashcards: [...prevSet.flashcards, { definition: "", answer: "" }],
    }));
  };

  const removeFlashcard = (index: number) => {
    setCurrentSet((prevSet: MyFlashcardSet) => ({
      ...prevSet,
      flashcards: prevSet.flashcards.filter(
        (_: Flashcard, i: number) => i !== index
      ),
    }));
  };

  return {
    handleFlashcardChange,
    addFlashcard,
    removeFlashcard,
  };
};
