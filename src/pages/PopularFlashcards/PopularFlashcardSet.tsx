import {
  Card,
  CardBody,
  SimpleGrid,
  Text,
  HStack,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";
import { useFetchFlashcard } from "./hooks/useFetchFlashcard";
import { useFlashcardNavigation } from "./hooks/useFlashcardNavigation";
import { useFlip } from "./hooks/useFlip";

export default function FlashcardSet() {
  const { flashcards, title } = useFetchFlashcard();
  const { currentIndex, handleNext, handlePrevious } =
    useFlashcardNavigation(flashcards);
  const { isFlipped, handleFlip } = useFlip();

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
