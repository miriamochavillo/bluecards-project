import { useState } from "react";
import { Flashcard } from "../../../shared/types/typesFlashcard";

type Props = {
  index: number;
  field: "definition" | "answer";
  value: string;
};

export const useFlashcards = () => {
  // State to store the list of flashcards, each with a definition and answer
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { definition: "", answer: "" },
  ]);

  // Modifies the specific flashcard's definition or answer
  const handleFlashcardChange = ({ index, field, value }: Props) => {
    if (index < 0 || index >= flashcards.length) return;
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  // Add a new flashcard to the list
  const addFlashcard = () => {
    setFlashcards([...flashcards, { definition: "", answer: "" }]);
  };

  // Remove a flashcard from the list by index
  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  return { flashcards, handleFlashcardChange, addFlashcard, removeFlashcard };
};
