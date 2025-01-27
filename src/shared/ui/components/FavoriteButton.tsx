import { IconButton } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { MyFlashcardSet } from "../../types/typesMyFlashcardSet";

type FavoriteButtonProps = {
  set: MyFlashcardSet;
  toggleFavorite: (id: string) => void;
};

export default function FavoriteButton({
  set,
  toggleFavorite,
}: FavoriteButtonProps) {
  return (
    <IconButton
      icon={<FaHeart />}
      aria-label="Toggle Favorite"
      size="sm"
      color={set.favorite ? "pink.300" : "blue.800"}
      onClick={() => toggleFavorite(set.id)}
      variant="ghost"
      _hover={{
        bg: "transparent",
      }}
    />
  );
}
