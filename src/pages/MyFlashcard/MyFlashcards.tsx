import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Divider,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
}

export default function MyFlashcards() {
  const toast = useToast();
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<FlashcardSet | null>(null);

  useEffect(() => {
    // Fetch flashcard sets from localStorage
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    setFlashcardSets(savedSets);
  }, []);

  const deleteFlashcardSet = (id: string) => {
    const updatedSets = flashcardSets.filter((set) => set.id !== id);
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    toast({
      title: "Flashcard set deleted.",
      description: "The flashcard set has been successfully removed.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const editFlashcardSet = (id: string, updatedSet: Partial<FlashcardSet>) => {
    const updatedSets = flashcardSets.map((set) =>
      set.id === id ? { ...set, ...updatedSet } : set
    );
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    toast({
      title: "Flashcard set updated.",
      description: "The flashcard set has been successfully updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const openEditModal = (set: FlashcardSet) => {
    setCurrentSet(set);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setCurrentSet(null);
    setIsEditOpen(false);
  };

  const handleEditChange = (field: keyof FlashcardSet, value: string) => {
    if (currentSet) {
      setCurrentSet({ ...currentSet, [field]: value });
    }
  };

  const handleFlashcardChange = (
    index: number,
    field: "definition" | "answer",
    value: string
  ) => {
    if (currentSet) {
      const newFlashcards = [...currentSet.flashcards];
      newFlashcards[index][field] = value;
      setCurrentSet({ ...currentSet, flashcards: newFlashcards });
    }
  };

  const addFlashcard = () => {
    if (currentSet) {
      const newFlashcards = [
        ...currentSet.flashcards,
        { definition: "", answer: "" },
      ];
      setCurrentSet({ ...currentSet, flashcards: newFlashcards });
    }
  };

  const removeFlashcard = (index: number) => {
    if (currentSet) {
      const newFlashcards = currentSet.flashcards.filter((_, i) => i !== index);
      setCurrentSet({ ...currentSet, flashcards: newFlashcards });
    }
  };

  const saveEditedSet = () => {
    if (currentSet) {
      editFlashcardSet(currentSet.id, currentSet);
      closeEditModal();
    }
  };

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      <HStack border="2px solid" borderColor="blue.200" p={4} borderRadius="lg">
        <Heading as="h2" color="blue.500" bg="white" textAlign="center">
          My Flashcards
        </Heading>
        <Spacer />
        <Popover trigger="hover">
          <PopoverTrigger>
            <IconButton
              aria-label="Create"
              icon={<AddIcon />}
              colorScheme="blue"
              variant="solid"
              size="lg"
              _hover={{ bg: "blue.800", transform: "scale(1.05)" }}
              onClick={() => navigate("/create-flashcards")}
            />
          </PopoverTrigger>
          <PopoverContent width="auto" alignContent="center">
            <PopoverArrow />
            <PopoverBody fontSize="sm">Add New Flashcards</PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>

      {flashcardSets.length === 0 ? (
        <Text fontSize="lg" color="gray.600" textAlign="center">
          No flashcard sets created yet. Click "Create" to add one!
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {flashcardSets.map((set) => (
            <Card
              key={set.id}
              bg="white"
              border="2px solid"
              borderColor="blue.200"
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
                bg: "blue.100",
              }}
            >
              <CardHeader>
                <HStack spacing={3}>
                  <Heading fontSize="lg" color="blue.700">
                    {set.title}
                  </Heading>
                  <Spacer />
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => navigate(`/my-flashcards/${set.id}`)}
                    >
                      View
                    </Button>
                    <Menu placement="bottom-end">
                      <MenuButton
                        as={IconButton}
                        size="sm"
                        icon={<SlOptionsVertical />}
                        colorScheme="teal"
                        aria-label="Options"
                      />
                      <MenuList>
                        <MenuItem onClick={() => openEditModal(set)}>
                          Edit
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => deleteFlashcardSet(set.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </HStack>
              </CardHeader>
              <CardBody>
                <Text fontSize="sm" color="gray.600">
                  {set.description || "No description available."}
                </Text>
              </CardBody>
              <CardFooter>
                <Text fontSize="xs" color="gray.500">
                  Last updated: {set.lastUpdated}
                </Text>
              </CardFooter>
            </Card>
          ))}
          <Modal
            isOpen={isEditOpen}
            onClose={closeEditModal}
            isCentered
            size="4xl"
          >
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
                        onChange={(e) =>
                          handleEditChange("title", e.target.value)
                        }
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
                    ))}
                    <Button
                      mt={4}
                      leftIcon={<AddIcon />}
                      colorScheme="blue"
                      onClick={addFlashcard}
                    >
                      Add Flashcard
                    </Button>
                  </VStack>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={saveEditedSet}>
                  Save
                </Button>
                <Button onClick={closeEditModal} ml={3}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </SimpleGrid>
      )}
    </SimpleGrid>
  );
}
