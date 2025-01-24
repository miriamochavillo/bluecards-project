import { useState } from "react";
import { MyFlashcardSet } from "../../../../shared/types/typesMyFlashcardSet";
import useFlashcardSetInput from "./useFetchMyFlashcard";

export function useEditModal() {
  const [currentSet, setCurrentSet] = useState<MyFlashcardSet | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { setId, title, flashcards, setFlashcards, setTitle } =
    useFlashcardSetInput();

  const openEditModal = () => {
    setCurrentSet({
      id: setId || "",
      title,
      flashcards,
      description: "",
      lastUpdated: new Date().toISOString(),
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const updateFlashcardSet = (updatedSet: MyFlashcardSet) => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const updatedSets = savedSets.map((set: MyFlashcardSet) =>
      set.id === updatedSet.id ? updatedSet : set
    );
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    setFlashcards(updatedSet.flashcards);
    setTitle(updatedSet.title);
  };
  return {
    currentSet,
    isEditOpen,
    openEditModal,
    closeEditModal,
    updateFlashcardSet,
  };
}
