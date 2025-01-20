import { ListItem, List, ListIcon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { TbCardsFilled } from "react-icons/tb";
import { FaHome, FaRegUserCircle } from "react-icons/fa";

export default function Sidebar() {
  const getLinkStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "white" : undefined,
    backgroundColor: isActive ? "var(--chakra-colors-blue-500)" : "transparent",
    display: "block",
    borderRadius: "10px",
  });

  const getHoverStyles = (isActive: boolean) =>
    isActive ? {} : { color: "blue.500", bg: "blue.100" };

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
            <ListIcon as={FaHome} />
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
            <ListIcon as={TbCardsFilled} />
            Flashcards
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
            <ListIcon as={FaRegUserCircle} />
            Profile
          </ListItem>
        )}
      </NavLink>
    </List>
  );
}
