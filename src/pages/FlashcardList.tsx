import { useEffect, useState } from "react";
import { CardBody, CardHeader, Heading } from "@chakra-ui/react";

import {
  Card,
  CardFooter,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const initialFlashcardSets = [
  {
    id: 1,
    title: "Flashcard Set 1",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
  {
    id: 2,
    title: "Flashcard Set 2",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
  {
    id: 3,
    title: "Flashcard Set 3",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
  {
    id: 4,
    title: "Flashcard Set 4",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
  {
    id: 5,
    title: "Flashcard Set 5",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
  {
    id: 6,
    title: "Flashcard Set 5",
    description: "This is a brief description of the flashcard content.",
    definition: "This is a brief definition of the flashcard content.",
    answer: "This is a brief answer of the flashcard content.",
  },
];

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("flashcardSets"));
  if (!data) return [];
  return data;
};

export default function FlashcardList() {
  const navigate = useNavigate();

  const [flashcardSets, setFlashcardSets] = useState(initialFlashcardSets);
  useEffect(() => {
    localStorage.setItem("flashcardSets", JSON.stringify(flashcardSets));
  }, [flashcardSets]);

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      {/* Heading */}
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
        My Flashcards
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {flashcardSets.map((flashcardSet) => (
          <Card
            key={flashcardSet.id}
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
                  {flashcardSet.title}
                </Heading>
                <Spacer />
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="blue">
                    View
                  </Button>
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    colorScheme="teal"
                    aria-label="Edit"
                    _hover={{ bg: "teal.600" }}
                  />
                </HStack>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="gray.600">
                {flashcardSet.description}
              </Text>
            </CardBody>
            <CardFooter>
              <Text fontSize="xs" color="gray.500">
                Last updated: Jan 13, 2025
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Button
        rightIcon={<AddIcon />}
        colorScheme="blue"
        variant="solid"
        size="lg"
        _hover={{ bg: "blue.900", transform: "scale(1.05)" }}
        onClick={() => navigate("/create-flashcards")}
      >
        Create
      </Button>
    </SimpleGrid>
  );
}
