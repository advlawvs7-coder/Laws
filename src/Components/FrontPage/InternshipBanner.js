// InternshipBanner.js
import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Image,
  Button,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaRegHandPointer } from "react-icons/fa";

const InternshipBanner = () => {
  const imageHeight = useBreakpointValue({ base: "250px", md: "auto" });

  return (
    <Box backgroundColor={"blue.50"} p={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        mx="auto"
        bg="white"
        overflow="hidden"
        borderRadius="xl"
        boxShadow="2xl"
        my={10}
        flexWrap="wrap"
      >
        {/* Left Image */}
        <Box flex="1" w="100%" maxH={{ base: "300px", md: "500px" }}>
          <Image
            src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg"
            alt="Student working"
            objectFit="cover"
            w="100%"
            h={imageHeight}
          />
        </Box>

        {/* Right Content */}
        <Box
          flex="1"
          bg="#1c2341"
          color="white"
          p={{ base: 6, md: 10 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          maxH={{ base: "auto", md: "500px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <VStack
            align={{ base: "center", md: "flex-start" }}
            spacing={5}
            w="100%"
          >
            {/* <Image
            src="https://lawvs.com/wp-content/uploads/2024/05/lawvs-logo.png"
            alt="Lawvs Logo"
            h={{ base: "35px", md: "40px" }}
          /> */}

            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              INTERNSHIP
            </Text>

            <Text fontSize={{ base: "md", md: "lg" }}>
              Mode : Online & Offline
            </Text>

            <Text fontSize={{ base: "sm", md: "md" }}>
              SIGN UP TO{" "}
              <Text as="span" color="#d4af37" fontWeight="bold">
                LAWVS INTERNSHIP!
              </Text>
            </Text>

            <VStack
              align={{ base: "center", md: "flex-start" }}
              spacing={2}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Text>• Develop professional skills & experience</Text>
              <Text>• Network with other like-minded interns</Text>
              {/* <Text>• Find top jobs & internships.</Text> */}
            </VStack>

            {/* <Button
            bg="#b3863b"
            color="white"
            rightIcon={<FaRegHandPointer />}
            _hover={{ bg: "#8d6b2b" }}
            w={{ base: "full", sm: "auto" }}
          >
            Register Now
          </Button> */}

            {/* <Box pt={4}>
              <Image
                src="https://api.qrserver.com/v1/create-qr-code/?data=https://forms.gle/&size=120x120"
                alt="QR Code"
                borderRadius="md"
                mb={2}
                mx={{ base: "auto", md: "0" }}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Register by Filling Google form
              </Text>
              <Link
                href="mailto:info@lawvs.com"
                color="#d4af37"
                fontWeight="semibold"
                fontSize={{ base: "sm", md: "md" }}
              >
                info@lawvs.com
              </Link>
            </Box> */}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default InternshipBanner;
