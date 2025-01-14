import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

export default function CreateFlashcards() {
  return (
    <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
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
        Create Flashcards
      </Heading>

      {/* Flashcard Set Form */}
      <Box p={6} borderRadius="lg" boxShadow="md" bg="blue.50">
        {/* Flashcards Section */}

        <VStack spacing={4}>
          \{" "}
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <FormControl mb={4} bg="white">
              <FormLabel fontWeight="bold" fontSize="lg" color="blue.600">
                Title
              </FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter the title of your flashcard set"
                focusBorderColor="blue.400"
              />
            </FormControl>
          </Box>
          {/* Set Description */}
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <FormControl mb={6} bg="white">
              <FormLabel fontWeight="bold" fontSize="lg" color="blue.600">
                Description
              </FormLabel>
              <Textarea
                name="description"
                placeholder="Enter a brief description of your flashcard set"
                focusBorderColor="blue.400"
              />
            </FormControl>
          </Box>
          <Divider colorScheme="blue" />
          <Box
            bg="white"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            w="100%"
          >
            <HStack justifyContent="space-between" mb={2}>
              <Heading fontSize="lg" color="blue.600">
                Flashcard
              </Heading>
              <IconButton
                aria-label="Remove Flashcard"
                icon={<DeleteIcon />}
                size="sm"
                colorScheme="teal"
              />
            </HStack>
            <FormControl mb={3}>
              <FormLabel fontSize="sm" fontWeight="bold" color="blue.900">
                Definition
              </FormLabel>
              <Input type="text" placeholder="Enter the definition" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="bold" color="blue.900">
                Answer
              </FormLabel>
              <Input type="text" placeholder="Enter the answer" />
            </FormControl>
          </Box>
        </VStack>

        {/* Add Flashcard Button */}
        <Button mt={4} leftIcon={<AddIcon />} colorScheme="blue">
          Add Flashcard
        </Button>
      </Box>

      {/* Submit Button */}
      <Button
        mt={6}
        colorScheme="teal"
        size="lg"
        w="100%"
        _hover={{ bg: "blue.900" }}
      >
        Save Flashcard Set
      </Button>
    </SimpleGrid>
  );
}
