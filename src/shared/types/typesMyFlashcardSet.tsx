export type MyFlashcardSet = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: {
    definition: string;
    answer: string;
  }[];
  favorite: boolean;
};
