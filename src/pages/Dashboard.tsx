import { EditIcon } from "@chakra-ui/icons";
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
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
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
        <Text color="blue.900">Make your own relevant set of materials</Text>
        <Spacer />
        <Text color="blue.500">Create your own flash cards</Text>
      </Button>

      <Box>
        <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
          Popular Topics
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
      <Divider />
      <Box>
        <Heading as="h3" fontSize="24px" color="blue.600" pb={6}>
          My Flashcards
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
