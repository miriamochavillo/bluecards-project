import { AtSignIcon, CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { ListItem, List, ListIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { TbCardsFilled } from "react-icons/tb";
import { FaHeart, FaHome, FaRegUserCircle } from "react-icons/fa";
import { useListStyle } from "./hooks/useListStyle";

export default function Sidebar() {
  const { getLinkStyles, getHoverStyles } = useListStyle();

  return (
    <List color="blue.500" fontSize="1em" fontWeight="bold" spacing={2}>
      <NavLink to="/" style={getLinkStyles}>
        {({ isActive }) => (
          <ListItem
            color={`inherit`}
            padding="10px"
            borderRadius="10px"
            _hover={getHoverStyles(isActive)}
          >
            <ListIcon as={CalendarIcon} />
            Home
          </ListItem>
        )}
      </NavLink>
      <NavLink to="/flashcards" style={getLinkStyles}>
        {({ isActive }) => (
          <ListItem
            color={`inherit`}
            padding="10px"
            borderRadius="10px"
            _hover={getHoverStyles(isActive)}
          >
            <ListIcon as={EditIcon} />
            Flashcards
          </ListItem>
        )}
      </NavLink>
      <NavLink to="/favorites" style={getLinkStyles}>
        {({ isActive }) => (
          <ListItem
            color={`inherit`}
            padding="10px"
            borderRadius="10px"
            _hover={getHoverStyles(isActive)}
          >
            <ListIcon as={FaHeart} />
            Favorites
          </ListItem>
        )}
      </NavLink>
      <NavLink to="/profile" style={getLinkStyles}>
        {({ isActive }) => (
          <ListItem
            color={`inherit`}
            padding="10px"
            borderRadius="10px"
            _hover={getHoverStyles(isActive)}
          >
            <ListIcon as={AtSignIcon} />
            Profile
          </ListItem>
        )}
      </NavLink>
    </List>
  );
}
