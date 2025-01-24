import { useNavigate } from "react-router-dom";
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
import { useFlipMyFlashcard } from "./hooks/useFlipMyFlashcard";
import { useMyFlashcardNavigation } from "./hooks/useMyFlashcardNavigation";
import { useEditModal } from "./hooks/useEditModal";
import useFlashcardSetInput from "./hooks/useFetchMyFlashcard";
import EditFlashcards from "../EditFlashcards/EditFlashcards";
import ButtonPrimary from "../../../shared/ui/components/ButtonPrimary";

export default function FlashcardSet() {
  const navigate = useNavigate();
  const { isFlipped, handleFlip } = useFlipMyFlashcard();
  const { title, flashcards } = useFlashcardSetInput();
  const { currentIndex, handleNext, handlePrevious } =
    useMyFlashcardNavigation(flashcards);
  const {
    currentSet,
    isEditOpen,
    openEditModal,
    closeEditModal,
    updateFlashcardSet,
  } = useEditModal();
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
              colorScheme="blue"
              aria-label="Options"
            />
            <MenuList sx={{ fontSize: "sm" }}>
              <MenuItem onClick={openEditModal}>Edit Flashcards</MenuItem>
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
                    ? flashcards[currentIndex].answer
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
        <EditFlashcards
          isOpen={isEditOpen}
          onClose={closeEditModal}
          flashcardSet={currentSet}
          updateFlashcardSet={updateFlashcardSet}
        />
      )}
    </>
  );
}
