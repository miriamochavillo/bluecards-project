import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  SimpleGrid,
  Text,
  Button,
  HStack,
  Spacer,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, HamburgerIcon } from "@chakra-ui/icons";

interface Flashcard {
  title: string;
  definition: string;
  answer: string;
}

interface FlashcardSet {
  id: string;
  flashcards: {
    definition: string;
    answer: string;
  }[];
  title: string;
}

export default function FlashcardSet() {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Fetch flashcard set from localStorage using setId
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const currentSet = savedSets.find((set: FlashcardSet) => set.id === setId);
    if (currentSet) {
      setFlashcards(currentSet.flashcards);
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

  const navigate = useNavigate();
  return (
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
        <Spacer />
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          colorScheme="blue"
          variant="solid"
          size="lg"
          onClick={() => navigate("/my-flashcards")}
        />
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
            <Button
              onClick={handlePrevious}
              disabled={flashcards.length <= 1}
              colorScheme="blue"
            >
              <Icon as={ArrowLeftIcon} boxSize={3} />
              Previous
            </Button>
            <Spacer />
            <Button
              onClick={handleNext}
              disabled={flashcards.length <= 1}
              colorScheme="blue"
            >
              Next
              <Icon as={ArrowRightIcon} boxSize={3} />
            </Button>
          </HStack>
        </>
      ) : (
        <Text textAlign="center">No flashcards found in this set.</Text>
      )}
    </SimpleGrid>
  );
}
