export type MyFlashcardSet = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
};

export type EditFlashcardSetProps = {
  isOpen: boolean;
  onClose: () => void;
  flashcardSet: MyFlashcardSet;
  updateFlashcardSet: (updatedSet: MyFlashcardSet) => void;
};

export type Flashcard = {
  definition: string;
  answer: string;
};
