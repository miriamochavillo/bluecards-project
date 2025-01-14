import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  useToast,
  AvatarBadge,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";

export default function Navbar() {
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 1000,
      isClosable: true,
      position: "top",
      icon: <CheckIcon />,
    });
  };
  return (
    <Flex as="nav" alignItems="center" mb="20px" gap="10px">
      <Image
        src="src/shared/assets/1.png"
        alt="BrightCards Logo"
        boxSize="40px"
      />
      <Heading as="h1" color="white">
        BlueCards
      </Heading>

      <Spacer />

      <InputGroup maxW="400px" mx="auto">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search flashcards..."
          bg="white"
          border="2px solid"
          borderColor="blue.400"
          focusBorderColor="blue.600"
          borderRadius="2xl"
          _placeholder={{ color: "gray.500" }}
        />
      </InputGroup>

      <Spacer />

      <HStack spacing="20px">
        <Avatar name="Miriam" src="/src/shared/assets/Miriam.jpg" bg="blue.700">
          <AvatarBadge bg="blue.500" w="1.3em">
            <Text fontSize="xs">10</Text>
          </AvatarBadge>
        </Avatar>
        <Button colorScheme="blue" onClick={showToast}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
