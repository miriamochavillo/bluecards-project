import { useToast } from "@chakra-ui/react";
import { MyFlashcardSet } from "../../types/typesMyFlashcardSet";

export function useSaveEditedSet(
  updateFlashcardSet: (set: MyFlashcardSet) => void,
  onClose: () => void
) {
  const toast = useToast();

  const saveEditedSet = (currentSet: MyFlashcardSet) => {
    const updatedSet = {
      ...currentSet,
      lastUpdated: new Date().toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // hour12: true,
      }),
    };
    updateFlashcardSet(updatedSet);
    toast({
      title: "Flashcard set updated.",
      description: "The flashcard set has been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    onClose();
  };

  return saveEditedSet;
}
