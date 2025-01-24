import { useToast } from "@chakra-ui/react";
import { MyFlashcardSet } from "../../types/typesMyFlashcardSet";

export function useSaveEditedSet(
  updateFlashcardSet: (set: MyFlashcardSet) => void,
  onClose: () => void
) {
  const toast = useToast();

  const saveEditedSet = (currentSet: MyFlashcardSet) => {
    updateFlashcardSet(currentSet);
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
