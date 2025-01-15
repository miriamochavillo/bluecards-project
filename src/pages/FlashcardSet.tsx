import { useState } from "react";
import {
  Card,
  CardBody,
  SimpleGrid,
  Text,
  Button,
  HStack,
  Spacer,
  Heading,
} from "@chakra-ui/react";

export default function FlashcardSet() {
  const flashcards = [
    {
      definition:
        "They are a design pattern that promotes reusability and separation of concerns. It simply takes the original component and returns the enhanced component.",
      answer: "Higher Order Components",
    },
    {
      definition:
        "They allow you to interact with elements outside the normal data flow(From parent to child) and directly access a DOM element or React component instance. They are used in place of props or states.",
      answer: "References",
    },
    {
      definition:
        "Provides a way to pass data through the component tree without having to pass props down manually at every level(Parent to child).",
      answer: "Context",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
      <Heading
        as="h2"
        color="white"
        bgGradient="linear(to-r, blue.400, blue.600)"
        p={4}
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
      >
        Flashcard Title
      </Heading>
      <Card
        onClick={handleFlip}
        cursor="pointer"
        minH="400px"
        p="30px"
        border="2px solid"
        borderColor="blue.300"
        boxShadow="lg"
        borderRadius="xl"
        bg={isFlipped ? "blue.400" : "white"}
      >
        <CardBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Text fontSize="2xl" color={isFlipped ? "white" : "blue.900"}>
            {isFlipped
              ? flashcards[currentIndex].answer
              : flashcards[currentIndex].definition}
          </Text>
        </CardBody>
      </Card>
      <HStack spacing={4}>
        <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>
          Previous
        </Button>
        <Spacer />
        <Button onClick={handleNext} disabled={flashcards.length <= 1}>
          Next
        </Button>
      </HStack>
    </SimpleGrid>
  );
}
