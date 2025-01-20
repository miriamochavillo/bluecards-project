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
  return (
    <Box>
      <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
        Popular Flashcards
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={6}>
        {[1, 2, 3].map((item) => (
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
                <Button size="sm" colorScheme="blue">
                  View
                </Button>
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
      <Button size="sm" colorScheme="blue">
        Discover More
      </Button>
    </Box>
  );
}
