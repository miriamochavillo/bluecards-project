import { useState, useEffect } from "react";
import { MyFlashcardSet } from "../../../../shared/types/typesMyFlashcardSet";
import { useToast } from "@chakra-ui/react";

export const useFlashcardSetManager = () => {
  const toast = useToast();
  const [flashcardSets, setFlashcardSets] = useState<MyFlashcardSet[]>([]);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");

    savedSets.sort(
      (a: MyFlashcardSet, b: MyFlashcardSet) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setFlashcardSets(savedSets);
  }, []);

  const deleteFlashcardSet = (id: string) => {
    const updatedSets = flashcardSets.filter((set) => set.id !== id);
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    toast({
      title: "Flashcard set deleted.",
      description: "The flashcard set has been successfully removed.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const toggleFavorite = (id: string) => {
    const updatedSets = flashcardSets.map((set) =>
      set.id === id ? { ...set, favorite: !set.favorite } : set
    );
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
  };

  return {
    flashcardSets,
    setFlashcardSets,
    deleteFlashcardSet,
    toggleFavorite,
  };
};
