import {
  Text,
  CardFooter,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Spacer,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
import { popularFlashcardContent } from "./PopularFlashcardsContent";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";

interface PopularFlashcard {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  views: number;
  flashcards: { definition: string; answer: string }[];
}

export default function PopularFlashcards() {
  const sortedFlashcards = popularFlashcardContent.sort(
    (a: PopularFlashcard, b: PopularFlashcard) => b.views - a.views
  );
  const navigate = useNavigate();
  return (
    <SimpleGrid spacing={10} maxW="1200px" mx="auto" p={6}>
      <HStack border="2px solid" borderColor="blue.200" p={4} borderRadius="lg">
        <Heading as="h2" color="blue.500" bg="white" textAlign="center">
          Popular Flashcards
        </Heading>
        <Spacer />
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={6}>
        {sortedFlashcards.map((popularFlashcard: PopularFlashcard) => (
          <Card
            key={popularFlashcard.id}
            bg="blue.50"
            borderRadius="lg"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
          >
            <CardHeader bg="blue.700" borderTopRadius="lg">
              <HStack spacing={3}>
                <Heading fontSize="lg" color="white">
                  {popularFlashcard.title}
                </Heading>
                <Spacer />
                <ButtonPrimary
                  onClick={() =>
                    navigate(`/popular-flashcards/${popularFlashcard.id}`)
                  }
                >
                  View
                </ButtonPrimary>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="gray.600">
                {popularFlashcard.description}
              </Text>
            </CardBody>
            <CardFooter>
              <Text fontSize="xs" color="gray.500">
                Last updated: {popularFlashcard.lastUpdated}
              </Text>
              <Spacer />
              <Text fontSize="xs" color="gray.500">
                Views: {popularFlashcard.views}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </SimpleGrid>
  );
}
