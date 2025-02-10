import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useSaveFlashcardSet = (
  title: string,
  description: string,
  flashcards: { definition: string; term: string }[]
) => {
  const flashcardSetId = uuidv4();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const saveFlashcardSet = () => {
    setIsSubmitted(true);
    if (
      !title.trim() ||
      flashcards.some((f) => !f.definition.trim() || !f.term.trim())
    ) {
      return;
    }

    const newFlashcardSet = {
      id: flashcardSetId,
      title,
      description,
      flashcards,
      lastUpdated: new Date().toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    // Get existing flashcard sets from localStorage
    const existingSets = JSON.parse(
      localStorage.getItem("flashcardSets") || "[]"
    );

    // Save the new set
    localStorage.setItem(
      "flashcardSets",
      JSON.stringify([...existingSets, newFlashcardSet])
    );

    // Show success toast notification
    toast({
      title: "Success",
      description: `"${title}" card set was saved successfully.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });

    navigate("/my-flashcards");
  };

  return { saveFlashcardSet, isSubmitted };
};
