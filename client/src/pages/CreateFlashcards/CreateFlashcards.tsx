import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Divider,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";
import { useSaveFlashcardSet } from "./hooks/useSaveFlashcardSet";
import { useTitle } from "./hooks/useTitle";
import { useDescription } from "./hooks/useDescription";
import { useFlashcards } from "./hooks/useFlashcards";

export default function CreateFlashcards() {
  const { title, handleTitleChange } = useTitle();
  const { description, handleDescriptionChange } = useDescription();
  const { flashcards, handleFlashcardChange, addFlashcard, removeFlashcard } =
    useFlashcards();
  const { saveFlashcardSet, isSubmitted } = useSaveFlashcardSet(
    title,
    description,
    flashcards
  );

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      <Heading
        as="h2"
        color="blue.500"
        bg="white"
        border="2px solid"
        borderColor="blue.200"
        p={4}
        borderRadius="lg"
        textAlign="center"
      >
        Create Flashcards
      </Heading>

      <Box p={6} borderRadius="lg" boxShadow="md" bg="blue.50">
        <VStack spacing={4}>
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <FormControl
              mb={4}
              bg="white"
              isRequired
              isInvalid={isSubmitted && !title.trim()}
            >
              <FormLabel fontWeight="bold" fontSize="lg" color="blue.600">
                Title
              </FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter the title of your flashcard set"
                focusBorderColor="blue.400"
                value={title}
                onChange={handleTitleChange}
              />
              <FormErrorMessage>Title is required.</FormErrorMessage>
            </FormControl>
          </Box>
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <FormControl mb={6} bg="white">
              <FormLabel fontWeight="bold" fontSize="lg" color="blue.600">
                Description
              </FormLabel>
              <Textarea
                name="description"
                placeholder="Enter a brief description of your flashcard set"
                focusBorderColor="blue.400"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </Box>
          <Divider colorScheme="blue" />
          {flashcards.map((flashcard, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              w="100%"
            >
              <HStack justifyContent="space-between" mb={2}>
                <Heading fontSize="lg" color="blue.600">
                  Flashcard {index + 1}
                </Heading>
                <Flex>
                  <IconButton
                    aria-label="Remove Flashcard"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="pink"
                    onClick={() => removeFlashcard(index)}
                  />
                </Flex>
              </HStack>
              <HStack>
                <FormControl
                  isRequired
                  isInvalid={isSubmitted && !flashcard.definition.trim()}
                >
                  <FormLabel fontSize="sm" fontWeight="bold" color="blue.800">
                    Definition
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the definition"
                    value={flashcard.definition}
                    onChange={(e) =>
                      handleFlashcardChange({
                        index,
                        field: "definition",
                        value: e.target.value,
                      })
                    }
                  />
                  <FormErrorMessage>Definition is required.</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={isSubmitted && !flashcard.term.trim()}
                >
                  <FormLabel fontSize="sm" fontWeight="bold" color="blue.800">
                    Term
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the term"
                    value={flashcard.term}
                    onChange={(e) =>
                      handleFlashcardChange({
                        index,
                        field: "term",
                        value: e.target.value,
                      })
                    }
                  />
                  <FormErrorMessage>Term is required.</FormErrorMessage>
                </FormControl>
              </HStack>
            </Box>
          ))}
          <Button
            variant="outline"
            colorScheme="blue"
            _hover={{ bg: "white", border: "2px solid" }}
            onClick={addFlashcard}
          >
            Add Flashcard
          </Button>
        </VStack>
      </Box>
      <ButtonPrimary onClick={saveFlashcardSet}>
        Save Flashcard Set
      </ButtonPrimary>
    </SimpleGrid>
  );
}
