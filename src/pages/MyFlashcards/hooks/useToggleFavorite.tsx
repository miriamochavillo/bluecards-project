import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { MyFlashcardSet } from "../../../shared/types/typesMyFlashcardSet";
import { Dispatch, SetStateAction } from "react";

export const useToggleFavorite = (
  setFlashcardSets: Dispatch<SetStateAction<MyFlashcardSet[]>>
) => {
  const toast = useToast();

  return useCallback(
    (id: string) => {
      setFlashcardSets((prevSets: MyFlashcardSet[]) => {
        const updatedSets = prevSets.map((set) => {
          if (set.id === id) {
            const isFavorite = !set.favorite;
            const action = isFavorite ? "added to" : "removed from";
            toast({
              title: isFavorite
                ? "Added to Favorites"
                : "Removed from Favorites",
              description: `${set.title} has been ${action} your favorites.`,
              colorScheme: isFavorite ? "teal" : "blue",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            return { ...set, favorite: isFavorite };
          }
          return set;
        });
        localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
        return updatedSets;
      });
    },
    [setFlashcardSets, toast]
  );
};
