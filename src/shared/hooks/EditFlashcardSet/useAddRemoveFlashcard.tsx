import { MyFlashcardSet } from "../../types/typesMyFlashcardSet";

export function useAddRemoveFlashcard(
  currentSet: MyFlashcardSet,
  setCurrentSet: React.Dispatch<React.SetStateAction<MyFlashcardSet>>
) {
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
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: updatedFlashcards,
    }));
  };

  const addFlashcard = () => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: [...prevSet.flashcards, { definition: "", term: "" }],
    }));
  };

  const removeFlashcard = (index: number) => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: prevSet.flashcards.filter((_, i) => i !== index),
    }));
  };

  return { handleFlashcardChange, addFlashcard, removeFlashcard };
}
