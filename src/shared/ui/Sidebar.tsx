import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { ListItem, List, ListIcon, Divider, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <List color="white" spacing={4} fontSize="1em">
      <ListItem color="blue.500">
        <HStack _hover={{ color: "blue.300" }}>
          <ListIcon as={CalendarIcon} />
          <NavLink to="/">Home</NavLink>
        </HStack>
      </ListItem>
      <ListItem color="blue.500">
        <ListIcon as={EditIcon} />
        <NavLink to="/flashcards">Flashcards</NavLink>
      </ListItem>
      <Divider borderColor="blue.600" />
      <ListItem color="blue.500">
        <ListIcon as={AtSignIcon} />
        <NavLink to="/profile">Profile</NavLink>
      </ListItem>
    </List>
  );
}
