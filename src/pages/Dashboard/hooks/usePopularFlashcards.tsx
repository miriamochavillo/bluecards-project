import { popularFlashcardContent } from "../../PopularFlashcards/PopularFlashcardsContent";

export type PopularFlashcard = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  views: number;
};

export const usePopularFlashcards = () => {
  const sortedPopularFlashcards = popularFlashcardContent
    .sort((a: PopularFlashcard, b: PopularFlashcard) => b.views - a.views)
    .slice(0, 3);

  return { sortedPopularFlashcards };
};
