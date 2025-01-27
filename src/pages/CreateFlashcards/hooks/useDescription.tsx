import { useState } from "react";

export const useDescription = () => {
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  return { description, setDescription, handleDescriptionChange };
};
