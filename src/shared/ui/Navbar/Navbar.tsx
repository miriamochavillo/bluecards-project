import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  AvatarBadge,
  Image,
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
        src="src/shared/assets/Logo-Blue.png"
        alt="BlueCards"
        boxSize="40px"
        onClick={() => navigate("/")}
        cursor="pointer"
      />
      <Heading as="h1" color="white">
        BlueCards
      </Heading>

      <Spacer />

      <SearchBar />

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
