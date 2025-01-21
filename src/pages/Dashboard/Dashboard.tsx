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
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { popularFlashcardContent } from "../PopularFlashcards/PopularFlashcardsContent";
import { FaEye } from "react-icons/fa";

interface MyFlashcardSet {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: { definition: string; answer: string }[];
}

interface PopularFlashcard {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  views: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [latestFlashcardSets, setLatestFlashcardSets] = useState<
    MyFlashcardSet[]
  >([]);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const sortedSets = savedSets.sort(
      (a: MyFlashcardSet, b: MyFlashcardSet) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setLatestFlashcardSets(sortedSets.slice(0, 3));
  }, []);

  const sortedPopularFlashcards = popularFlashcardContent
    .sort((a: PopularFlashcard, b: PopularFlashcard) => b.views - a.views)
    .slice(0, 3);

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

      <Box>
        <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
          Popular Flashcards
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={6}>
          {sortedPopularFlashcards.map((popularFlashcard: PopularFlashcard) => (
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
                  <IconButton
                    icon={<FaEye />}
                    size="xs"
                    color="blue.600"
                    bg="transparent"
                    aria-label="View"
                    onClick={() =>
                      navigate(`/popular-flashcards/${popularFlashcard.id}`)
                    }
                    _hover={{
                      color: "white",
                      bg: "transparent",
                      cursor: "pointer",
                    }}
                  />
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
        <Button
          size="sm"
          color="blue.700"
          onClick={() => navigate("/popular-flashcards")}
        >
          View All
        </Button>
      </Box>

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
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
            >
              <CardHeader bg="blue.500" borderTopRadius="lg">
                <HStack spacing={3}>
                  <Heading fontSize="lg" color="white">
                    {set.title}
                  </Heading>
                  <Spacer />
                  <IconButton
                    icon={<FaEye />}
                    size="xs"
                    color="blue.600"
                    bg="transparent"
                    aria-label="View"
                    onClick={() => navigate(`/my-flashcards/${set.id}`)}
                    _hover={{
                      color: "white",
                      bg: "transparent",
                      cursor: "pointer",
                    }}
                  />
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
          color="blue.500"
          onClick={() => navigate("/my-flashcards")}
        >
          View All
        </Button>
      </Box>
    </SimpleGrid>
  );
}
