import { popularFlashcardContent } from "../../PopularFlashcards/PopularFlashcardsContent";
import { PopularFlashcard } from "../../../shared/types/typesPopularFlashcard";

export const usePopularFlashcards = () => {
  const sortedPopularFlashcards = popularFlashcardContent
    .sort((a: PopularFlashcard, b: PopularFlashcard) => b.views - a.views)
    .slice(0, 3);

  return { sortedPopularFlashcards };
};
