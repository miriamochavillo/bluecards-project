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
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateFlashcards() {
  const flashcardSetId = uuidv4();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([
    { definition: "", answer: "" },
  ]);

  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();

  // Handlers for input changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  // Update flashcard content based on index and field
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

  // Add a new flashcard to the list
  const addFlashcard = () => {
    setFlashcards([...flashcards, { definition: "", answer: "" }]);
  };

  // Remove a flashcard from the list by index
  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  // Save the flashcard set to localStorage and navigate to another page
  const saveFlashcardSet = () => {
    setIsSubmitted(true);
    if (
      !title.trim() ||
      flashcards.some((f) => !f.definition.trim() || !f.answer.trim())
    ) {
      return;
    }

    const newFlashcardSet = {
      id: flashcardSetId,
      title,
      description,
      flashcards,
      lastUpdated: new Date().toLocaleString(),
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

    // Navigate to the "my-flashcards" page
    navigate("/my-flashcards");
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
                  {/* <IconButton
                    aria-label="Drag Flashcard"
                    icon={<DragHandleIcon />}
                    size="sm"
                    colorScheme="teal"
                    mr={2}
                  /> */}
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
                      handleFlashcardChange(index, "definition", e.target.value)
                    }
                  />
                  <FormErrorMessage>Definition is required.</FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={isSubmitted && !flashcard.answer.trim()}
                >
                  <FormLabel fontSize="sm" fontWeight="bold" color="blue.800">
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
                  <FormErrorMessage>Answer is required.</FormErrorMessage>
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
        _hover={{ bg: "blue.800" }}
        onClick={saveFlashcardSet}
      >
        Save Flashcard Set
      </Button>
    </SimpleGrid>
  );
}
