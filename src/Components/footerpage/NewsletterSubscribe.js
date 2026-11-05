import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Icon,
  VStack,
  HStack,
  useBreakpointValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import axios from "axios";
import * as mod from "../../url";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // 👉 Email Validation Function
  const isValidEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 👉 Handle Subscribe
  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: "Please enter your email.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email address.",
        description: "Please enter a valid email (e.g., example@gmail.com).",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${mod.api_url}/api/v1/newslatter/subscribe`,
        { email }
      );

      toast({
        title: "Subscribed successfully!",
        description:
          response.data?.message || "You’ll receive updates in your inbox.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed.",
        description:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // 👉 Telegram & WhatsApp Links
  const handleTelegramClick = () => {
    window.open("https://t.me/Lawvssatisfyingalllegalneeds", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://chat.whatsapp.com/ByGIBOZ7GHC35Ryj2nBaht", "_blank");
  };

  return (
    <VStack spacing={6} w="100%" py={6} backgroundColor={"blue.50"}>
      <Box
        border="1px solid #e0e0e0"
        borderRadius="md"
        p={4}
        w={{ base: "100%", md: "80%" }}
        bg="white"
        boxShadow="sm"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Flex align="center" gap={3}>
            <Icon as={FaEnvelopeOpenText} color="red.600" boxSize={8} />
            <Box>
              <Text fontWeight="bold" color="red.700">
                Never miss an opportunity
              </Text>
              <Text fontSize="sm" color="gray.600">
                Subscribe to our newsletter
              </Text>
            </Box>
          </Flex>

          {/* Input & Button */}
          <Flex
            gap={2}
            align="center"
            w={{ base: "100%", md: "auto" }}
            justify={{ base: "center", md: "flex-end" }}
          >
            <Input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxW={{ base: "100%", md: "250px" }}
              borderColor="gray.300"
              _focus={{ borderColor: "red.500" }}
              isDisabled={loading}
            />
            <Button
              bg="red.700"
              color="white"
              _hover={{ bg: "red.800" }}
              px={6}
              onClick={handleSubscribe}
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Subscribe"}
            </Button>
          </Flex>
        </Flex>
      </Box>

      <HStack
        spacing={isMobile ? 3 : 6}
        w={{ base: "100%", md: "80%" }}
        justify="center"
        flexWrap="wrap"
      >
        <Button
          leftIcon={<FaTelegramPlane />}
          variant="outline"
          color="#0088cc"
          borderColor="#0088cc"
          fontWeight="semibold"
          _hover={{ bg: "#0088cc", color: "white" }}
          w={{ base: "100%", md: "auto" }}
          onClick={handleTelegramClick}
        >
          Join Telegram Channel
        </Button>

        <Button
          leftIcon={<FaWhatsapp />}
          variant="outline"
          color="green.600"
          borderColor="green.600"
          fontWeight="semibold"
          _hover={{ bg: "green.600", color: "white" }}
          w={{ base: "100%", md: "auto" }}
          onClick={handleWhatsAppClick}
        >
          Join WhatsApp Channel
        </Button>
      </HStack>
    </VStack>
  );
};

export default NewsletterSubscribe;
