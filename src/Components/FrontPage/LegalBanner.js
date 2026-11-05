import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const banner2 = require("../Assets/lawsImage/sanjeev.jpg");
const home1 = require("../Assets/lawsImage/home1.jpg");
const LegalBanner = () => {
  return (
    <>
      <Link to="/join-meeting-form" _hover={{ textDecoration: "none" }}>
        <Box
          w="100%"
          minH={{ base: "28vh", md: "100%", lg: "90vh" }}
          bgImage={`url(${home1})`}
          bgRepeat="no-repeat"
          bgSize={{ base: "contain", md: "cover" }}
          bgPosition="center"
          bgColor="black"
          display="flex"
          alignItems="center"
          px={{ base: 4, md: 12, lg: 20 }}
        >
          <Box
            maxW={{ base: "full", md: "lg", lg: "2xl" }}
            textAlign={{ base: "left", md: "left" }}
            color="white"
            cursor="pointer"
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              mb={6}
              lineHeight="1.3"
              textAlign="left"
            >
              legal portal to <br /> satisfy all legal <br /> needs!
            </Heading>

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={0}
              bg="white"
              borderRadius="full"
              overflow="hidden"
              maxW="full"
              alignItems="center"
              mt={{ base: 6, md: 12 }}
            >
              {/* future content here */}
            </Stack>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default LegalBanner;
