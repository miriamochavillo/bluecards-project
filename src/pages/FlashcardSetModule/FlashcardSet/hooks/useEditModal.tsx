import { useState } from "react";
import { MyFlashcardSet } from "../../../../shared/types/typesMyFlashcardSet";
import { Flashcard } from "../../../../shared/types/typesFlashcard";

export function useEditModal(
  setId: string | undefined,
  title: string,
  flashcards: Flashcard[]
) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<MyFlashcardSet | null>(null);

  const openEditModal = () => {
    setCurrentSet({
      id: setId || "",
      title,
      flashcards,
      description: "", // Add description if needed
      lastUpdated: new Date().toISOString(),
      favorite: false,
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  return { isEditOpen, currentSet, openEditModal, closeEditModal };
}
