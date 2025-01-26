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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";
import { useMyFlashcards } from "./hooks/useMyFlashcards";
import { usePopularFlashcards } from "./hooks/usePopularFlashcards";
import { PopularFlashcard } from "../../shared/types/typesPopularFlashcard";
import ViewButton from "../../shared/ui/components/ViewButton";

export default function Dashboard() {
  const { latestFlashcardSets } = useMyFlashcards();
  const { sortedPopularFlashcards } = usePopularFlashcards();
  const navigate = useNavigate();

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
                <HStack>
                  <Heading fontSize="lg" color="white">
                    {popularFlashcard.title}
                  </Heading>
                  <Spacer />
                  <Popover trigger="hover" placement="bottom-start">
                    <PopoverTrigger>
                      <IconButton
                        icon={<FaEye />}
                        size="md"
                        color="white"
                        bg="transparent"
                        aria-label="View"
                        rounded="full"
                        onClick={() =>
                          navigate(`/popular-flashcards/${popularFlashcard.id}`)
                        }
                        _hover={{
                          bg: "blue.600",
                          cursor: "pointer",
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent width="auto" alignContent="center">
                      <PopoverArrow />
                      <PopoverBody fontSize="sm" color="blue.500">
                        View
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
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
        <ButtonPrimary onClick={() => navigate("/popular-flashcards")}>
          View All
        </ButtonPrimary>
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
                <HStack>
                  <Heading fontSize="lg" color="white">
                    {set.title}
                  </Heading>
                  <Spacer />
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
        <ButtonPrimary onClick={() => navigate("/my-flashcards")}>
          View all
        </ButtonPrimary>
      </Box>
    </SimpleGrid>
  );
}
