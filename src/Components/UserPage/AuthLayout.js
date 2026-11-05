// src/components/AuthLayout.jsx
import React from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";

const AuthLayout = ({ left, right }) => {
  return (
    <>
      <Header />
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="4xl"
        mx="auto"
        p={4}
        bg="white"
        boxShadow="xl"
        rounded="md"
        overflow="hidden"
        mt="20px"
      >
        <Box flex="1" p={8}>
          {left}
        </Box>

        {/* Vertical divider for desktop */}
        <Divider
          orientation="vertical"
          borderColor="gray.200"
          display={{ base: "none", md: "block" }}
        />

        <Box flex="1" p={8} bg="gray.50">
          {right}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default AuthLayout;
