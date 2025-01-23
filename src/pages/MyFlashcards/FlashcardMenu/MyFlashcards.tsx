import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import EditFlashcardSet from "../FlashcardSetEdit/EditFlashcardSet";
import { FaEdit, FaEye } from "react-icons/fa";
import { useEditModalOpen } from "./hooks/useEditModalOpen";
import { useFlashcardSetManager } from "./hooks/useFlashcardSetManager";

export default function MyFlashcards() {
  const navigate = useNavigate();
  const { isEditOpen, currentSet, openEditModal, closeEditModal } =
    useEditModalOpen();
  const { flashcardSets, setFlashcardSets, deleteFlashcardSet } =
    useFlashcardSetManager();

  return (
    <>
      <SimpleGrid spacing={8} maxW="1200px" mx="auto" p={6}>
        <HStack
          border="2px solid"
          borderColor="blue.200"
          p={4}
          borderRadius="lg"
        >
          <Heading as="h2" color="blue.500" bg="white" textAlign="center">
            My Flashcards
          </Heading>
          <Spacer />
          <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton
                aria-label="Create"
                icon={<AddIcon />}
                colorScheme="blue"
                variant="solid"
                size="lg"
                _hover={{ bg: "blue.800", transform: "scale(1.05)" }}
                onClick={() => navigate("/create-flashcards")}
              />
            </PopoverTrigger>
            <PopoverContent width="auto" alignContent="center">
              <PopoverArrow />
              <PopoverBody fontSize="sm">Add New Flashcards</PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>

        {flashcardSets.length === 0 ? (
          <Text fontSize="lg" color="gray.600" textAlign="center">
            No flashcard sets created yet. Click "Create" to add one!
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {flashcardSets.map((set) => (
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
                            onClick={() => openEditModal(set)}
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
      {currentSet && (
        <EditFlashcardSet
          isOpen={isEditOpen}
          onClose={closeEditModal}
          flashcardSet={currentSet}
          updateFlashcardSet={(updatedSet) => {
            const updatedSets = flashcardSets.map((set) =>
              set.id === updatedSet.id ? updatedSet : set
            );
            setFlashcardSets(updatedSets);
            localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
          }}
        />
      )}
    </>
  );
}
