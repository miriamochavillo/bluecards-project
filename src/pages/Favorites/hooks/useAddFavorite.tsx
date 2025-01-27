import { useEffect, useState } from "react";
import { MyFlashcardSet } from "../../../shared/types/typesMyFlashcardSet";

export const useAddFavorite = () => {
  const [flashcardSets, setFlashcardSets] = useState<MyFlashcardSet[]>([]);

  // Function to toggle the favorite status of a flashcard set
  const toggleFavorite = (id: string) => {
    const updatedSets = flashcardSets.map((set) =>
      set.id === id ? { ...set, favorite: !set.favorite } : set
    );
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
  };

  useEffect(() => {
    const storedSets = JSON.parse(
      localStorage.getItem("flashcardSets") || "[]"
    );
    setFlashcardSets(storedSets);
  }, []);

  // Filter the flashcard sets to only include those marked as favorite
  const favoriteSets = flashcardSets.filter((set) => set.favorite);

  return { flashcardSets, toggleFavorite, favoriteSets };
};
