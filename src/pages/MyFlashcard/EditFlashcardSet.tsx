import {
  Box,
  FormControl,
  Heading,
  Flex,
  IconButton,
  Divider,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  Textarea,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import { Modal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
}

interface EditFlashcardSetProps {
  isOpen: boolean;
  onClose: () => void;
  flashcardSet: FlashcardSet;
  updateFlashcardSet: (updatedSet: FlashcardSet) => void;
}

export default function EditFlashcardSet({
  isOpen,
  onClose,
  flashcardSet,
  updateFlashcardSet,
}: EditFlashcardSetProps) {
  const toast = useToast();
  const [currentSet, setCurrentSet] = useState<FlashcardSet>(flashcardSet);

  useEffect(() => {
    setCurrentSet(flashcardSet);
  }, [flashcardSet]);

  const handleEditChange = (field: string, value: string) => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      [field]: value,
    }));
  };

  const handleFlashcardChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedFlashcards = [...currentSet.flashcards];
    updatedFlashcards[index] = {
      ...updatedFlashcards[index],
      [field]: value,
    };
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: updatedFlashcards,
    }));
  };

  const addFlashcard = () => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: [...prevSet.flashcards, { definition: "", answer: "" }],
    }));
  };

  const removeFlashcard = (index: number) => {
    setCurrentSet((prevSet) => ({
      ...prevSet,
      flashcards: prevSet.flashcards.filter((_, i) => i !== index),
    }));
  };

  const saveEditedSet = () => {
    updateFlashcardSet(currentSet);
    toast({
      title: "Flashcard set updated.",
      description: "The flashcard set has been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Flashcard Set</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentSet && (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={currentSet.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={currentSet.description}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                />
              </FormControl>
              <Divider colorScheme="blue" />
              {currentSet.flashcards.map((flashcard, index) => (
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
                    <FormControl isRequired>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="bold"
                        color="blue.800"
                      >
                        Definition
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter the definition"
                        value={flashcard.definition}
                        onChange={(e) =>
                          handleFlashcardChange(
                            index,
                            "definition",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="bold"
                        color="blue.800"
                      >
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
              <Button
                variant="outline"
                colorScheme="blue"
                _hover={{ bg: "white", border: "2px solid" }}
                onClick={addFlashcard}
              >
                Add Flashcard
              </Button>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary onClick={saveEditedSet}>Save</ButtonPrimary>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
