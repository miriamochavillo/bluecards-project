import {
  SimpleGrid,
  Text,
  Heading,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Image,
  GridItem,
  Grid,
  Divider,
  Box,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <SimpleGrid spacing={8} maxW="800px" mx="auto" p={6}>
      <Heading
        as="h2"
        color="white"
        bgGradient="linear(to-r, blue.400, blue.600)"
        p={4}
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
      >
        Profile
      </Heading>

      <Card
        bg="white"
        border="2px solid"
        borderColor="blue.300"
        boxShadow="lg"
        borderRadius="2xl"
        align="center"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "scale(1.02)", boxShadow: "2xl" }}
      >
        <CardHeader bg="blue.50" p={6} w="100%" textAlign="center">
          <Box display="flex" justifyContent="center" mb={4}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src="src/shared/assets/Miriam.jpg"
              alt="Miriam Ochavillo"
              border="4px solid"
              borderColor="blue.300"
            />
          </Box>
          <Heading
            as="h3"
            fontSize="28px"
            color="blue.700"
            fontWeight="extrabold"
          >
            Miriam Ochavillo
          </Heading>
          <Text fontSize="md" color="blue.500" fontWeight="medium">
            Junior Software Engineer
          </Text>
        </CardHeader>

        <Divider borderColor="blue.300" />

        <CardBody p={6}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} textAlign="left">
            <GridItem>
              <Text fontWeight="bold" fontSize="lg" color="blue.700">
                Email
              </Text>
              <Text fontSize="md" color="gray.600">
                miriam.ochavillo@gmail.com
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold" fontSize="lg" color="blue.700">
                Phone
              </Text>
              <Text fontSize="md" color="gray.600">
                +51 999 999 999
              </Text>
            </GridItem>
          </Grid>
        </CardBody>

        <CardFooter p={4} bg="blue.50" w="100%" textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Last updated: Jan 13, 2025
          </Text>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
