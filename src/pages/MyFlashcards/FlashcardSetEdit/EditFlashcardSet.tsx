import {
  Box,
  FormControl,
  Heading,
  Flex,
  IconButton,
  Divider,
  FormLabel,
  Input,
  Modal,
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
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";
import { useEditFlashcardSet } from "../../EditFlashcards/hooks/useEditFlashcardSet";
import { useAddRemoveFlashcard } from "../../EditFlashcards/hooks/useAddRemoveFlashcard";
import {
  EditFlashcardSetProps,
  Flashcard,
} from "../../EditFlashcards/types/typesEditMyFlashcard";
import { useSaveEditedSet } from "../../EditFlashcards/hooks/useSaveEditedSet";

export default function EditFlashcardSet({
  isOpen,
  onClose,
  flashcardSet,
  updateFlashcardSet,
}: EditFlashcardSetProps) {
  const saveEditedSet = useSaveEditedSet(updateFlashcardSet, onClose);
  const { currentSet, setCurrentSet, handleEditChange } =
    useEditFlashcardSet(flashcardSet);
  const { handleFlashcardChange, addFlashcard, removeFlashcard } =
    useAddRemoveFlashcard(currentSet, setCurrentSet);

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
              {currentSet.flashcards.map(
                (flashcard: Flashcard, index: number) => (
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
                            handleFlashcardChange(
                              index,
                              "answer",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    </HStack>
                  </Box>
                )
              )}
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
          <ButtonPrimary onClick={() => saveEditedSet(currentSet)}>
            Save
          </ButtonPrimary>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
