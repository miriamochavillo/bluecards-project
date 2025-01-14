import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";

export default function CreateFlashcards() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([
    { definition: "", answer: "" },
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleFlashcardChange = (
    index: number,
    field: keyof (typeof flashcards)[0],
    value: string
  ) => {
    if (index < 0 || index >= flashcards.length) return;
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { definition: "", answer: "" }]);
  };

  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const saveFlashcardSet = () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    if (flashcards.some((f) => !f.definition.trim() || !f.answer.trim())) {
      alert("All flashcards must have a definition and an answer.");
      return;
    }
    // Logic to save the flashcard set
    console.log({ title, description, flashcards });
  };

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
            <FormControl mb={4} bg="white">
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
                    aria-label="Drag Flashcard"
                    icon={<DragHandleIcon />}
                    size="sm"
                    colorScheme="teal"
                    mr={2}
                  />
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
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold" color="blue.900">
                    Definition
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the definition"
                    value={flashcard.definition}
                    onChange={(e) =>
                      handleFlashcardChange(index, "definition", e.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold" color="blue.900">
                    Answer
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the answer"
                    value={flashcard.answer}
                    onChange={(e) =>
                      handleFlashcardChange(index, "answer", e.target.value)
                    }
                  />
                </FormControl>
              </HStack>
            </Box>
          ))}
        </VStack>

        <Button
          mt={4}
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={addFlashcard}
        >
          Add Flashcard
        </Button>
      </Box>

      <Button
        mt={6}
        colorScheme="teal"
        size="lg"
        w="100%"
        _hover={{ bg: "blue.900" }}
        onClick={saveFlashcardSet}
      >
        Save Flashcard Set
      </Button>
    </SimpleGrid>
  );
}
