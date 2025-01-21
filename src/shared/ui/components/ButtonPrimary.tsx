import { Button, ButtonProps } from "@chakra-ui/react";

export default function ButtonPrimary({ children, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      colorScheme="blue"
      bg="blue.500"
      _hover={{ bg: "blue.700" }}
    >
      {children}
    </Button>
  );
}
