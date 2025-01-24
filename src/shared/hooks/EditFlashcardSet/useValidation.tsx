import { MyFlashcardSet } from "../../types/typesMyFlashcardSet";

export function useValidation(
  currentSet: MyFlashcardSet,
  saveEditedSet: (set: MyFlashcardSet) => void
) {
  const areFlashcardsValid = currentSet.flashcards.every(
    (flashcard) =>
      flashcard.definition.trim() !== "" && flashcard.answer.trim() !== ""
  );

  const handleSave = () => {
    if (!areFlashcardsValid) {
      return;
    }
    saveEditedSet(currentSet);
  };

  return { areFlashcardsValid, handleSave };
}
