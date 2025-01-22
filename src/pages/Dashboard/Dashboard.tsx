import {
  Text,
  Button,
  SimpleGrid,
  Spacer,
  Heading,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularFlashcards from "./PopularFlashcards.tsx";

interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [latestFlashcardSets, setLatestFlashcardSets] = useState<
    FlashcardSet[]
  >([]);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const sortedSets = savedSets.sort(
      (a: FlashcardSet, b: FlashcardSet) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setLatestFlashcardSets(sortedSets.slice(0, 3));
  }, []);

  return (
    <SimpleGrid spacing={10} maxW="1200px" mx="auto" p={6}>
      <Button
        p="50px"
        bg="white"
        border="2px solid"
        borderColor="blue.200"
        _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
        onClick={() => navigate("/create-flashcards")}
      >
        <Text color="blue.800">Make your own relevant set of materials</Text>
        <Spacer />
        <Text color="blue.500">Create your own flash cards</Text>
      </Button>

      <PopularFlashcards />

      <Divider />

      <Box>
        <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
          My Flashcards
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={6}>
          {latestFlashcardSets.map((set) => (
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
                      onClick={() => navigate(`/my-flashcards/${set.id}`)}
                    >
                      View
                    </Button>
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
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => navigate("/my-flashcards")}
        >
          View All
        </Button>
      </Box>
    </SimpleGrid>
  );
}
