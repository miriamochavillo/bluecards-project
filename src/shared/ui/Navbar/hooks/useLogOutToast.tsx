import { CheckIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

export const useLogOutToast = () => {
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 5000,
      isClosable: true,
      position: "top",
      icon: <CheckIcon />,
    });
  };

  return { showToast };
};
