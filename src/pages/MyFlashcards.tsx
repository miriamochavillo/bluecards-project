import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
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
  Spacer,
  Text,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
}

export default function MyFlashcards() {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    // Fetch flashcard sets from localStorage
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    setFlashcardSets(savedSets);
  }, []);

  const deleteFlashcardSet = (id: string) => {
    const updatedSets = flashcardSets.filter((set) => set.id !== id);
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
  };

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      <HStack border="2px solid" borderColor="blue.200" p={4} borderRadius="lg">
        <Heading as="h2" color="blue.500" bg="white" textAlign="center">
          My Flashcards
        </Heading>
        <Spacer />
        <IconButton
          aria-label="Create"
          icon={<AddIcon />}
          colorScheme="blue"
          variant="solid"
          size="lg"
          _hover={{ bg: "blue.900", transform: "scale(1.05)" }}
          onClick={() => navigate("/create-flashcards")}
        />
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
              border="2px solid"
              borderColor="blue.200"
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
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
                      onClick={() => navigate(`/flashcard-set/${set.id}`)}
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
                        <MenuItem>Edit</MenuItem>
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
  );
}
