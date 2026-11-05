// Footer.js
import React from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Icon,
  Image,
  Circle,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from "./../Assets/logo/logo.png"; // Adjust path as needed
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/lawvslegalservices" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/lawvs.com/" },
    { icon: FaInstagram, url: "https://www.instagram.com/law_vs/" },
    {
      icon: FaYoutube,
      url: "https://www.youtube.com/channel/UCznIzuaDRopc1wbfisboIVw",
    },
    { icon: FaTwitter, url: "https://x.com/LawvsF" },
  ];

  return (
    <Box bg="black" color="white" py={10} px={{ base: 5, md: 10, lg: 20 }}>
      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={{ base: 8, md: 10, lg: 14 }}
        maxW="1200px"
        mx="auto"
      >
        {/* Logo + Social */}
        <VStack align="flex-start" spacing={5}>
          <ChakraLink as={RouterLink} to="/">
            <Image
              src={logo}
              alt="Logo"
              height="70px"
              width="200px"
              backgroundColor="white"
              p="5px"
            />
          </ChakraLink>
          <Text fontSize="sm" textAlign="left">
            SATISFYING ALL LEGAL NEEDS
          </Text>
          <HStack spacing={3}>
            {socialLinks.map((social, idx) => (
              <Link
                href={social.url}
                isExternal
                key={idx}
                _hover={{ textDecoration: "none" }}
              >
                <Circle
                  size="32px"
                  bg="#D29B3F"
                  color="black"
                  _hover={{ bg: "gray.700", color: "white" }}
                >
                  <Icon as={social.icon} color="white" boxSize={4} />
                </Circle>
              </Link>
            ))}
          </HStack>
        </VStack>

        {/* Pages */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Pages
          </Text>

          <ChakraLink as={RouterLink} to="/about-us">
            About Us
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/all-articles">
            Articles
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/events">
            Events
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/contact">
            Contact
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/privacy-and-policy">
            Privacy and Security
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/terms-and-conditions">
            Terms and Conditions
          </ChakraLink>
        </VStack>

        {/* Other Pages */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Other Pages
          </Text>
          <ChakraLink as={RouterLink} to="/legal-law-jobs">
            Legal law jobs
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/legal-law-program">
            Legal law programs
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/law-internship">
            Law Internship Posting
          </ChakraLink>
          <ChakraLink as={RouterLink} to="#"></ChakraLink>
        </VStack>

        {/* Quick Contact */}
        <VStack align="flex-start" spacing={3}>
          <Text fontWeight="bold" borderBottom="2px solid gold">
            Quick Contact
          </Text>
          <HStack align="flex-start" spacing={3}>
            <MdLocationOn size="20" />
            <Text fontSize="sm" textAlign="left">
              Office No.101, <br />
              Himland House, Commercial Complex, <br />
              Karampura, <br />
              Delhi-110015, India
            </Text>
          </HStack>
          <HStack spacing={3}>
            <MdPhone size="20" />
            <Text fontSize="sm">8171974067</Text>
          </HStack>
          <HStack spacing={3}>
            <MdEmail size="20" />
            <Text fontSize="sm">info@lawvs.com</Text>
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
