import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../url";

const ScrollPopupForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        onOpen();
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onOpen]);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${mod.api_url}/api/v1/contactus/add/contact`,
        formData
      );
      toast({
        title: "Query submitted successfully!",
        description: "We'll contact you soon.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({ name: "", mobile: "", email: "", message: "" });
      onClose();
    } catch (err) {
      toast({
        title: `Error: ${err.response?.data?.message || "Submission failed"}`,
        description: `${err.response?.data?.error || ""}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
        <ModalOverlay bg="rgba(0,0,0,0.6)" backdropFilter="blur(5px)" />
        <ModalContent
          bgGradient="linear(to-br, yellow.300, blue.500, red.500)"
          color="white"
          borderRadius="2xl"
          boxShadow="2xl"
          p={2}
          mx={4}
        >
          <ModalHeader textAlign="center" fontWeight="bold" fontSize="xl">
            💬 Get in Touch
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    bg="whiteAlpha.900"
                    color="black"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone:</FormLabel>
                  <Input
                    name="mobile"
                    bg="whiteAlpha.900"
                    color="black"
                    placeholder="Phone Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    bg="whiteAlpha.900"
                    color="black"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    bg="whiteAlpha.900"
                    color="black"
                    name="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </FormControl>
              </VStack>

              <ModalFooter justifyContent="center" mt={4}>
                <Button
                  colorScheme="yellow"
                  bgGradient="linear(to-r, yellow.400, orange.400)"
                  _hover={{ bgGradient: "linear(to-r, orange.400, pink.400)" }}
                  type="submit"
                  size="lg"
                >
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScrollPopupForm;
