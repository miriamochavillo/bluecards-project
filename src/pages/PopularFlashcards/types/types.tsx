export type Flashcard = {
  definition: string;
  answer: string;
};

export type PopularFlashcard = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  views: number;
  flashcards: { definition: string; answer: string }[];
};
