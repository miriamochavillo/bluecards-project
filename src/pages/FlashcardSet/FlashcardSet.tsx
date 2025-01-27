import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  SimpleGrid,
  Text,
  HStack,
  Spacer,
  Heading,
  IconButton,
  MenuItem,
  MenuList,
  Menu,
  MenuDivider,
  MenuButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";
import { MyFlashcardSet } from "../../shared/types/typesMyFlashcardSet";
import { useFlashcardSet } from "./hooks/useFlashcardSet";
import { useFlashcardNavigation } from "./hooks/useFlashcardNavigation";
import EditFlashcardSet from "../FlashcardSetEdit/EditFlashcardSet";
import { useEditModalOpen } from "../MyFlashcards/hooks/useEditModalOpen";
// Main component for displaying a flashcard set
export default function FlashcardSet() {
  const { setId } = useParams();
  const { flashcards, title, setFlashcards, setTitle, description } =
    useFlashcardSet(setId);
  const { currentIndex, isFlipped, handleFlip, handleNext, handlePrevious } =
    useFlashcardNavigation(flashcards);
  const { isEditOpen, currentSet, openEditModal, closeEditModal } =
    useEditModalOpen();
  const navigate = useNavigate();

  // Function to update the flashcard set in localStorage
  const updateFlashcardSet = (updatedSet: MyFlashcardSet) => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const updatedSets = savedSets.map((set: MyFlashcardSet) =>
      set.id === updatedSet.id ? updatedSet : set
    );
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    setFlashcards(updatedSet.flashcards);
    setTitle(updatedSet.title);
  };

  return (
    <>
      <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
        <HStack
          bgGradient="linear(to-r, blue.400, blue.600)"
          p={4}
          borderRadius="lg"
          boxShadow="xl"
        >
          <Heading as="h2" color="white">
            {title}
          </Heading>
          <Spacer />
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              size="sm"
              icon={<HamburgerIcon />}
              colorScheme="teal"
              aria-label="Options"
            />
            <MenuList sx={{ fontSize: "sm" }}>
              <MenuItem
                onClick={() =>
                  openEditModal({
                    id: setId || "",
                    title,
                    flashcards,
                    description,
                    lastUpdated: new Date().toLocaleString(),
                    favorite: false,
                  })
                }
              >
                Edit Flashcards
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/my-flashcards")}>
                Return to My Flashcards
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {flashcards.length > 0 ? (
          <>
            <Card
              onClick={handleFlip}
              cursor="pointer"
              minH="400px"
              p="30px"
              border="2px solid"
              borderColor="blue.300"
              boxShadow="lg"
              borderRadius="xl"
              bg={isFlipped ? "blue.500" : "white"}
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Text fontSize="2xl" color={isFlipped ? "white" : "blue.800"}>
                  {isFlipped
                    ? flashcards[currentIndex].term
                    : flashcards[currentIndex].definition}
                </Text>
              </CardBody>
            </Card>
            <HStack spacing={4}>
              <ButtonPrimary
                onClick={handlePrevious}
                disabled={flashcards.length <= 1}
              >
                Previous
              </ButtonPrimary>
              <Spacer />
              <ButtonPrimary
                onClick={handleNext}
                disabled={flashcards.length <= 1}
              >
                Next
              </ButtonPrimary>
            </HStack>
          </>
        ) : (
          <Text textAlign="center">No flashcards found in this set.</Text>
        )}
      </SimpleGrid>
      {currentSet && (
        <EditFlashcardSet
          isOpen={isEditOpen}
          onClose={closeEditModal}
          flashcardSet={currentSet}
          updateFlashcardSet={updateFlashcardSet}
        />
      )}
    </>
  );
}
