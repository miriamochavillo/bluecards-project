import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
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
  Spacer,
  Text,
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
import EditFlashcardSet from "./EditFlashcardSet";
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
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");

    savedSets.sort(
      (a: FlashcardSet, b: FlashcardSet) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
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

  const openEditModal = (set: FlashcardSet) => {
    setCurrentSet(set);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setCurrentSet(null);
    setIsEditOpen(false);
  };

  return (
    <>
      <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
        <HStack
          border="2px solid"
          borderColor="blue.200"
          p={4}
          borderRadius="lg"
        >
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
                bg="blue.50"
                borderRadius="lg"
                boxShadow="lg"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
              >
                <CardHeader bg="blue.500" borderTopRadius="lg">
                  <HStack spacing={3}>
                    <Heading
                      fontSize="lg"
                      color="white"
                      cursor="pointer"
                      onClick={() => navigate(`/my-flashcards/${set.id}`)}
                      _hover={{ textDecoration: "underline", color: "white" }}
                    >
                      {set.title}
                    </Heading>
                    <Spacer />
                    <HStack spacing={2}>
                      <Menu placement="bottom-end">
                        <MenuButton
                          as={IconButton}
                          size="sm"
                          icon={<SlOptionsVertical />}
                          colorScheme="blue"
                          aria-label="Options"
                          bg="transparent"
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
          </SimpleGrid>
        )}
      </SimpleGrid>
      {currentSet && (
        <EditFlashcardSet
          isOpen={isEditOpen}
          onClose={closeEditModal}
          flashcardSet={currentSet}
          updateFlashcardSet={(updatedSet) => {
            const updatedSets = flashcardSets.map((set) =>
              set.id === updatedSet.id ? updatedSet : set
            );
            setFlashcardSets(updatedSets);
            localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
          }}
        />
      )}
    </>
  );
}
