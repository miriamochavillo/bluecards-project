import {
  Card,
  Heading,
  CardHeader,
  CardBody,
  Text,
  SimpleGrid,
  HStack,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../shared/ui/components/ButtonPrimary";

export default function FlashcardMenu() {
  const navigate = useNavigate();

  return (
    <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
      <Heading
        as="h2"
        color="white"
        bgGradient="linear(to-r, blue.400, blue.600)"
        p={4}
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
      >
        Flashcards
      </Heading>
      <Card
        border="2px solid"
        borderColor="blue.300"
        boxShadow="lg"
        borderRadius="xl"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: "scale(1.01)",
          boxShadow: "xl",
          bg: "blue.50",
          borderColor: "blue.800",
        }}
      >
        <CardHeader>
          <Heading as="h3" fontSize="24px" color="blue.800" fontWeight="bold">
            My Flashcards
          </Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={3} align="center">
            <Text fontSize="xl" color="blue.600" fontWeight="semibold">
              View and review your existing flashcards.
            </Text>
          </HStack>
        </CardBody>
        <Divider borderColor="blue.400" />
        <CardFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonPrimary
            rightIcon={<ViewIcon />}
            onClick={() => navigate("/my-flashcards")}
          >
            View
          </ButtonPrimary>
        </CardFooter>
      </Card>

      <Card
        border="2px solid"
        borderColor="blue.300"
        boxShadow="lg"
        borderRadius="xl"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: "scale(1.01)",
          boxShadow: "xl",
          bg: "blue.50",
          borderColor: "blue.800",
        }}
      >
        <CardHeader>
          <Heading as="h3" fontSize="24px" color="blue.800" fontWeight="bold">
            Create Flashcards
          </Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={3} align="center">
            <Text fontSize="xl" color="blue.600" fontWeight="semibold">
              Create new flashcards to help you study and remember important
              concepts.
            </Text>
          </HStack>
        </CardBody>
        <Divider borderColor="blue.400" />
        <CardFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonPrimary
            rightIcon={<AddIcon />}
            onClick={() => navigate("/create-flashcards")}
          >
            Create
          </ButtonPrimary>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
