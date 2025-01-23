import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftElement,
  Box,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useFlashcardNavigation } from "./hooks/useFlashcardNavigation";
import { useSearchFlashcard } from "./hooks/useSearchFlashcard";

export default function SearchBar() {
  const { searchQuery, searchResults, handleSearchQuery, clearSearch } =
    useSearchFlashcard();
  const { handleFlashcardClick } = useFlashcardNavigation();

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
          {searchResults.length > 0 ? (
            <List spacing={2}>
              {searchResults.slice(0, 6).map((flashcard, index) => (
                <ListItem
                  key={index}
                  px={4}
                  py={2}
                  _hover={{ bg: "blue.50", cursor: "pointer" }}
                  onClick={() => {
                    handleFlashcardClick(flashcard);
                    clearSearch(); // Clear the search bar
                  }}
                >
                  {flashcard.title}
                </ListItem>
              ))}
            </List>
          ) : (
            <Text px={4} py={2} color="pink.500">
              <strong>"{searchQuery}" is unavailable 🥲</strong> . Please search
              for other flashcards.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
