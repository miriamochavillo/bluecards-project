import { MyFlashcardSet } from "./typesMyFlashcardSet";

export type EditFlashcardSetProps = {
  isOpen: boolean;
  onClose: () => void;
  flashcardSet: MyFlashcardSet;
  updateFlashcardSet: (updatedSet: MyFlashcardSet) => void;
};
