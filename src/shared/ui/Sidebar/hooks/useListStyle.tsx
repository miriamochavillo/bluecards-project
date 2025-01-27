export const useListStyle = () => {
  const getLinkStyles = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "white" : undefined,
    backgroundColor: isActive ? "var(--chakra-colors-blue-500)" : "transparent",
    display: "block",
    borderRadius: "10px",
  });

  const getHoverStyles = (isActive: boolean) =>
    isActive ? {} : { color: "blue.500", bg: "blue.100" };

  return { getLinkStyles, getHoverStyles };
};
