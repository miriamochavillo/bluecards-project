import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";

export default function RootLayout() {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(12, 1fr)" }}
      templateAreas={{
        base: `"nav nav"
               "side side"
               "main main"`,
        lg: `"nav nav"
             "side main"`,
      }}
      bg="white"
    >
      <GridItem
        area="nav"
        colSpan={{ base: 2, lg: 12 }}
        p="20px"
        bg="blue.900"
        pb="0"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Navbar />
      </GridItem>

      <GridItem
        area="side"
        colSpan={{ base: 2, lg: 2 }}
        bg="blue.50"
        minHeight={{ lg: "89vh" }}
        p={{ base: "20px", lg: "30px" }}
        position={{ lg: "sticky" }}
        top={{ lg: "80px" }}
        height="fit-content"
      >
        <Sidebar />
      </GridItem>

      <GridItem area="main" colSpan={{ base: 2, lg: 10 }} p="20px" bg="white">
        <Outlet />
      </GridItem>
    </Grid>
  );
}
