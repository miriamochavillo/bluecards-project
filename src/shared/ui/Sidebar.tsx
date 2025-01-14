import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { ListItem, List, ListIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" fontSize="1em" fontWeight="bold">
      <NavLink to="/">
        <ListItem
          color="blue.500"
          padding="10px"
          borderRadius="10px"
          _hover={{ color: "white", bg: "blue.500" }}
        >
          <ListIcon as={CalendarIcon} />
          Home
        </ListItem>
      </NavLink>
      <NavLink to="/flashcards">
        <ListItem
          color="blue.500"
          padding="10px"
          borderRadius="10px"
          _hover={{ color: "white", bg: "blue.500" }}
        >
          <ListIcon as={EditIcon} />
          Flashcards
        </ListItem>
      </NavLink>
      <NavLink to="/profile">
        <ListItem
          color="blue.500"
          padding="10px"
          borderRadius="10px"
          _hover={{ color: "white", bg: "blue.500" }}
        >
          <ListIcon as={AtSignIcon} />
          Profile
        </ListItem>
      </NavLink>
    </List>
  );
}
