import {
  Popover,
  PopoverBody,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

import { IconButton } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ViewButton({ setId }: { setId: string }) {
  const navigate = useNavigate();
  return (
    <Popover trigger="hover" placement="bottom-start">
      <PopoverTrigger>
        <IconButton
          icon={<FaEye />}
          size="sm"
          color="white"
          bg="transparent"
          aria-label="View"
          rounded="full"
          onClick={() => navigate(`/my-flashcards/${setId}`)}
          _hover={{
            bg: "blue.400",
            cursor: "pointer",
          }}
        />
      </PopoverTrigger>
      <PopoverContent width="auto" alignContent="center">
        <PopoverArrow />
        <PopoverBody fontSize="sm" color="blue.500">
          View
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
