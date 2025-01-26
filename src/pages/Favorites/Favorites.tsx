import {
  SimpleGrid,
  HStack,
  Spacer,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MyFlashcardSet } from "../../shared/types/typesMyFlashcardSet";
import ViewButton from "../../shared/ui/components/ViewButton";
import FavoriteButton from "../../shared/ui/components/FavoriteButton";

export default function Favorites() {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState<MyFlashcardSet[]>([]);

  // Function to toggle the favorite status of a flashcard set
  const toggleFavorite = (id: string) => {
    const updatedSets = flashcardSets.map((set) =>
      set.id === id ? { ...set, favorite: !set.favorite } : set
    );
    setFlashcardSets(updatedSets);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
  };

  // Effect hook to load flashcard sets from local storage when the component mounts
  useEffect(() => {
    const storedSets = JSON.parse(
      localStorage.getItem("flashcardSets") || "[]"
    );
    setFlashcardSets(storedSets);
  }, []);

  // Filter the flashcard sets to only include those marked as favorite
  const favoriteSets = flashcardSets.filter((set) => set.favorite);

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      <Heading as="h2" color="blue.500" bg="white" textAlign="center">
        Favorite Flashcards
      </Heading>

      {favoriteSets.length === 0 ? (
        <Text fontSize="lg" color="gray.600" textAlign="center">
          No favorite flashcard sets yet. Mark some as favorite to see them
          here!
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {favoriteSets.map((set) => (
            <Card
              key={set.id}
              bg="blue.50"
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
                "& > div:first-of-type": { bg: "blue.700" },
              }}
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
                  <FavoriteButton set={set} toggleFavorite={toggleFavorite} />
                  <ViewButton setId={set.id} />
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
