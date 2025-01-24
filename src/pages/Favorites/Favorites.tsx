import {
  SimpleGrid,
  HStack,
  Spacer,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
} from "@chakra-ui/react";
import { FaHeart, FaEye, FaEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useFlashcardSetManager } from "../MyFlashcards/FlashcardMenu/hooks/useFlashcardSetManager";

export default function Favorites() {
  const navigate = useNavigate();
  const { flashcardSets, toggleFavorite, deleteFlashcardSet } =
    useFlashcardSetManager();

  const favoriteSets = flashcardSets.filter((set) => set.favorite);

  return (
    <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
      <Heading as="h2" color="blue.500" bg="white" textAlign="center">
        Favorite Flashcards
      </Heading>

      {favoriteSets.length === 0 ? (
        <Text fontSize="lg" color="gray.600" textAlign="center">
          No favorite flashcard sets yet. Mark some as favorite to see them
          here!
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {favoriteSets.map((set) => (
            <Card
              key={set.id}
              bg="blue.50"
              borderRadius="lg"
              boxShadow="lg"
              transition="all 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
            >
              <CardHeader bg="blue.500" borderTopRadius="lg">
                <HStack spacing={3}>
                  <Heading
                    fontSize="lg"
                    color="white"
                    cursor="pointer"
                    onClick={() => navigate(`/my-flashcards/${set.id}`)}
                    _hover={{ textDecoration: "underline", color: "white" }}
                  >
                    {set.title}
                  </Heading>
                  <Spacer />
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Toggle Favorite"
                    size="sm"
                    color={set.favorite ? "pink.300" : "blue.800"}
                    onClick={() => toggleFavorite(set.id)}
                    variant="ghost"
                    _hover={{
                      bg: "transparent",
                    }}
                  />
                  <HStack spacing={2}>
                    <Menu placement="bottom-end">
                      <MenuButton
                        as={IconButton}
                        size="sm"
                        icon={<SlOptionsVertical />}
                        colorScheme="blue"
                        aria-label="Options"
                        bg="transparent"
                      />
                      <MenuList
                        sx={{
                          fontSize: "sm",
                          color: "blue.700",
                        }}
                        minWidth="100px"
                      >
                        <MenuItem
                          icon={<FaEye />}
                          onClick={() => navigate(`/my-flashcards/${set.id}`)}
                        >
                          View
                        </MenuItem>
                        <MenuItem
                          icon={<FaEdit />}
                          onClick={() =>
                            navigate(`/my-flashcards/${set.id}/edit`)
                          }
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<DeleteIcon />}
                          onClick={() => deleteFlashcardSet(set.id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
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
      )}
    </SimpleGrid>
  );
}
