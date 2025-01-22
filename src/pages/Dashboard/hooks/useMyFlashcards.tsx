import { useState, useEffect } from "react";

type MyFlashcardSet = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
};

export const useMyFlashcards = () => {
  const [latestFlashcardSets, setLatestFlashcardSets] = useState<
    MyFlashcardSet[]
  >([]);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const sortedSets = savedSets.sort(
      (a: MyFlashcardSet, b: MyFlashcardSet) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setLatestFlashcardSets(sortedSets.slice(0, 3));
  }, []);

  return { latestFlashcardSets };
};
