import {
  Box,
  Text,
  CardFooter,
  CardBody,
  Button,
  CardHeader,
  Heading,
  HStack,
  Spacer,
  Card,
  SimpleGrid,
} from "@chakra-ui/react";
export default function PopularFlashcards() {
  const popularFlashcards = [
    {
      id: 1,
      title: "Thermodynamics",
      description:
        "Thermodynamics is the branch of physics that deals with the study of energy, heat, work, and how they interrelate. It examines the principles governing the transfer and transformation of energy in physical systems.",
      lastUpdated: "January 20, 2024",
    },
    {
      id: 2,
      title: "Material Science",
      description:
        "Material Science is an interdisciplinary field that studies the properties, structures, processing, and performance of materials. ",
      lastUpdated: "January 20, 2024",
    },
    {
      id: 3,
      title: "Quantum Mechanics",
      description:
        "Quantum mechanics is a fundamental branch of physics that studies the behavior of matter and energy on the smallest scales, such as atoms and subatomic particles.",
      lastUpdated: "January 20, 2024",
    },
  ];
  return (
    <Box>
      <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
        Popular Flashcards
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={6}>
        {popularFlashcards.map((flashCard, id) => (
          <Card
            key={id}
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
                  {flashCard.title}
                </Heading>
                <Spacer />
                <Button size="sm" colorScheme="blue">
                  View
                </Button>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text fontSize="sm" color="gray.600">
                {flashCard.description}
              </Text>
            </CardBody>
            <CardFooter>
              <Text fontSize="xs" color="gray.500">
                {flashCard.lastUpdated}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Button size="sm" colorScheme="blue">
        Discover More
      </Button>
    </Box>
  );
}
