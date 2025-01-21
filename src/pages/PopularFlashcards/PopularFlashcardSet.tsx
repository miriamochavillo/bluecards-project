import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  SimpleGrid,
  Text,
  HStack,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { popularFlashcardContent } from "./PopularFlashcardsContent";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";

interface Flashcard {
  definition: string;
  answer: string;
}

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: {
    definition: string;
    answer: string;
  }[];
}

export default function FlashcardSet() {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Fetch flashcard set from flashcardContent using setId
    if (!setId) return;
    const currentSet = popularFlashcardContent.find((set) => set.id === setId);
    if (currentSet) {
      setFlashcards(currentSet.flashcards || []);
      setTitle(currentSet.title);
    }
  }, [setId]);

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
    <>
      <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
        <HStack
          bgGradient="linear(to-r, blue.400, blue.600)"
          p={4}
          borderRadius="lg"
          boxShadow="xl"
        >
          <Heading as="h2" color="white">
            {title}
          </Heading>
        </HStack>

        {flashcards.length > 0 ? (
          <>
            <Card
              onClick={handleFlip}
              cursor="pointer"
              minH="400px"
              p="30px"
              border="2px solid"
              borderColor="blue.300"
              boxShadow="lg"
              borderRadius="xl"
              bg={isFlipped ? "blue.500" : "white"}
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Text fontSize="2xl" color={isFlipped ? "white" : "blue.800"}>
                  {isFlipped
                    ? flashcards[currentIndex].answer
                    : flashcards[currentIndex].definition}
                </Text>
              </CardBody>
            </Card>
            <HStack spacing={4}>
              <ButtonPrimary
                onClick={handlePrevious}
                disabled={flashcards.length <= 1}
              >
                Previous
              </ButtonPrimary>
              <Spacer />
              <ButtonPrimary
                onClick={handleNext}
                disabled={flashcards.length <= 1}
              >
                Next
              </ButtonPrimary>
            </HStack>
          </>
        ) : (
          <Text textAlign="center">No flashcards found in this set.</Text>
        )}
      </SimpleGrid>
    </>
  );
}
