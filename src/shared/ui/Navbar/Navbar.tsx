import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Image,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useLogOutToast } from "./hooks/useLogOutToast";

export default function Navbar() {
  const { showToast } = useLogOutToast();
  const navigate = useNavigate();
  return (
    <Flex as="nav" alignItems="center" mb="20px" gap="10px">
      <Image
        src="src/shared/assets/1.png"
        alt="BlueCards"
        boxSize="40px"
        onClick={() => navigate("/")}
        cursor="pointer"
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
        <Avatar
          name="Miriam"
          src="/src/shared/assets/Miriam.jpg"
          bg="blue.700"
          onClick={() => navigate("/profile")}
          cursor="pointer"
        ></Avatar>
        <Button colorScheme="blue" onClick={showToast}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
}
