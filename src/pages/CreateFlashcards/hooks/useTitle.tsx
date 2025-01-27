import { useState } from "react";

export const useTitle = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  return { title, setTitle, handleTitleChange };
};
