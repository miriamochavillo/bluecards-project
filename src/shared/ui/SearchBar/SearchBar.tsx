import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { popularFlashcardContent } from "../../../pages/PopularFlashcards/PopularFlashcardsContent";
import { useNavigate } from "react-router-dom";

type Flashcard = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Flashcard[]>([]);
  const navigate = useNavigate();

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Fetch flashcards from local storage
    const createdFlashcards = JSON.parse(
      localStorage.getItem("flashcardSets") || "[]"
    );

    // Combine local flashcards with popular flashcards
    const allFlashcards = [...createdFlashcards, ...popularFlashcardContent];

    // Filter flashcards based on the search query
    const results = allFlashcards.filter((flashcard) =>
      flashcard.title.toLowerCase().includes(query.toLowerCase())
    );

    // Sort results to prioritize titles that start with the search query
    results.sort((a, b) => {
      const aStartsWithQuery = a.title
        .toLowerCase()
        .startsWith(query.toLowerCase());
      const bStartsWithQuery = b.title
        .toLowerCase()
        .startsWith(query.toLowerCase());

      if (aStartsWithQuery && !bStartsWithQuery) return -1;
      if (!aStartsWithQuery && bStartsWithQuery) return 1;
      return 0;
    });

    setSearchResults(results);
  };

  const handleFlashcardClick = (flashcard: Flashcard) => {
    const isPopular = popularFlashcardContent.some(
      (popularFlashcard) => popularFlashcard.id === flashcard.id
    );
    const path = isPopular
      ? `/popular-flashcards/${flashcard.id}`
      : `/my-flashcards/${flashcard.id}`;
    navigate(path);

    // Update recent flashcards
    setSearchResults((prev) => {
      const updated = [flashcard, ...prev.filter((f) => f.id !== flashcard.id)];
      return updated.slice(0, 6); // Limit to 6 recent flashcards
    });

    // Clear the search bar
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Box position="relative" minW="50%" mx="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          id="search-input"
          type="text"
          placeholder="Search flashcards..."
          bg="white"
          border="2px solid"
          borderColor="blue.400"
          borderRadius="2xl"
          _placeholder={{ color: "gray.500" }}
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </InputGroup>

      {/* Search suggestions menu */}
      {searchQuery && (
        <Box
          mt={2}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          boxShadow="md"
          zIndex={10}
          position="absolute"
          width="100%"
        >
          <List spacing={2}>
            {searchResults.slice(0, 6).map((flashcard, index) => (
              <ListItem
                key={index}
                px={4}
                py={2}
                _hover={{ bg: "blue.50", cursor: "pointer" }}
                onClick={() => handleFlashcardClick(flashcard)}
              >
                {flashcard.title}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
