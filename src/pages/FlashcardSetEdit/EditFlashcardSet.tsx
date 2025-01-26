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
  ModalOverlay,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";
import { useEditFlashcardSet } from "../../shared/hooks/EditFlashcardSet/useEditFlashcardSet";
import { useAddRemoveFlashcard } from "../../shared/hooks/EditFlashcardSet/useAddRemoveFlashcard";
import { useSaveEditedSet } from "../../shared/hooks/EditFlashcardSet/useSaveEditedSet";
import { EditFlashcardSetProps } from "../../shared/types/typesEditFlashcardSet";
import { Flashcard } from "../../shared/types/typesFlashcard";
import { useValidation } from "../../shared/hooks/EditFlashcardSet/useValidation";

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
  const { areFlashcardsValid, handleSave } = useValidation(
    currentSet,
    saveEditedSet
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Flashcard Set</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentSet && (
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={!currentSet.title.trim()}>
                <FormLabel>Title</FormLabel>
                <Input
                  value={currentSet.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                />
                {!currentSet.title.trim() && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
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
                      <FormControl
                        isRequired
                        isInvalid={!flashcard.definition.trim()}
                      >
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
                        {!flashcard.definition.trim() && (
                          <FormErrorMessage>
                            Definition is required.
                          </FormErrorMessage>
                        )}
                      </FormControl>
                      <FormControl
                        isRequired
                        isInvalid={!flashcard.term.trim()}
                      >
                        <FormLabel
                          fontSize="sm"
                          fontWeight="bold"
                          color="blue.800"
                        >
                          Term
                        </FormLabel>
                        <Input
                          type="text"
                          placeholder="Enter the term"
                          value={flashcard.term}
                          onChange={(e) =>
                            handleFlashcardChange(index, "term", e.target.value)
                          }
                        />
                        {!flashcard.term.trim() && (
                          <FormErrorMessage>Term is required.</FormErrorMessage>
                        )}
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
          <ButtonPrimary onClick={handleSave} isDisabled={!areFlashcardsValid}>
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
