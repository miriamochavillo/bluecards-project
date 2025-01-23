import { useState } from "react";
import { MyFlashcardSet } from "../../../../shared/types/typesMyFlashcardSet";
export const useEditModalOpen = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<MyFlashcardSet | null>(null);

  const openEditModal = (set: MyFlashcardSet) => {
    setCurrentSet(set);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setCurrentSet(null);
    setIsEditOpen(false);
  };

  return { isEditOpen, currentSet, openEditModal, closeEditModal };
};
