import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MyFlashcards() {
  const navigate = useNavigate();
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Card
            key={item}
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
                  Card Title
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
                This is a brief description of the flashcard content.
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
        colorScheme="blue"
        variant="solid"
        size="lg"
        _hover={{ bg: "blue.900", transform: "scale(1.05)" }}
        onClick={() => navigate("/create-flashcards")}
      >
        Create New Set of Flashcards
      </Button>
    </SimpleGrid>
  );
}
