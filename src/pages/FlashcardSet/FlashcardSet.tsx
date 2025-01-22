import { useState, useEffect } from "react";
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
import EditFlashcards from "./EditFlashcards";
import ButtonPrimary from "../../shared/ui/components/ButtonPrimary";

type Flashcard = {
  definition: string;
  answer: string;
};

type FlashcardSet = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  flashcards: {
    definition: string;
    answer: string;
  }[];
};

export default function FlashcardSet() {
  const { setId } = useParams();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Fetch flashcard set from localStorage using setId
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const currentSet = savedSets.find((set: FlashcardSet) => set.id === setId);
    if (currentSet) {
      setFlashcards(currentSet.flashcards);
      setTitle(currentSet.title);
    }
  }, [setId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSet, setCurrentSet] = useState<FlashcardSet | null>(null);

  const openEditModal = () => {
    setCurrentSet({
      id: setId || "",
      title,
      flashcards,
      description: "", // Add description if needed
      lastUpdated: new Date().toISOString(),
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const updateFlashcardSet = (updatedSet: FlashcardSet) => {
    const savedSets = JSON.parse(localStorage.getItem("flashcardSets") || "[]");
    const updatedSets = savedSets.map((set: FlashcardSet) =>
      set.id === updatedSet.id ? updatedSet : set
    );
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    setFlashcards(updatedSet.flashcards);
    setTitle(updatedSet.title);
  };

  const navigate = useNavigate();
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
