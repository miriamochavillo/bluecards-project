import { useState } from "react";
import { Flashcard } from "../types/types";
import { popularFlashcardContent } from "../../../../pages/PopularFlashcards/PopularFlashcardsContent";

export function useSearchFlashcard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Flashcard[]>([]);

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const createdFlashcards = JSON.parse(
      localStorage.getItem("flashcardSets") || "[]"
    );
    const allFlashcards = [...createdFlashcards, ...popularFlashcardContent];

    // Filter flashcards based on the search query
    const results = allFlashcards.filter((flashcard) =>
      flashcard.title.toLowerCase().includes(query.toLowerCase())
    );
    results.sort((a, b) => {
      const aStartsWithQuery = a.title
        .toLowerCase()
        .startsWith(query.toLowerCase());
      const bStartsWithQuery = b.title
        .toLowerCase()
        .startsWith(query.toLowerCase());

      if (aStartsWithQuery && !bStartsWithQuery) return -1;
      if (!aStartsWithQuery && bStartsWithQuery) return 1;
      return 0;
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return { searchQuery, searchResults, handleSearchQuery, clearSearch };
}
