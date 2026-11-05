import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../url";
import Header from "../Navbar/Header";
import Footer from "../Navbar/Footer";
const meetimg = require("../Assets/lawsImage/meet.jpg");

const MeetUserForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${mod.api_url}/api/v1/meetusers/create/meet`, form);
      toast({
        title: "Meet User Created ",
        description: "The user has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setForm({ name: "", email: "", mobile: "", comments: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />{" "}
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage={`url(${meetimg})`} // replace with your actual image path
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        p={0}
        // mb={{ base: "0px", md: "0" }}
      >
        <Card
          w={{ base: "100%", md: "450px" }}
          shadow="xl"
          borderRadius="2xl"
          background={"gray.100"}
        >
          <CardHeader
            textAlign="center"
            // textAlign="center"
            // mb={6}
            bg="yellow.400"
            // py={3}
            // borderRadius="md"
            color="white"
            boxShadow="md"
          >
            <Heading fontSize="2xl" color="teal.600">
              Meeting form
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Fill in the details below to join the meeting
            </Text>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    focusBorderColor="teal.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    focusBorderColor="teal.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    focusBorderColor="teal.500"
                  />
                </FormControl>

                {/* <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    focusBorderColor="teal.500"
                  />
                </FormControl> */}

                <FormControl>
                  <FormLabel>Comments</FormLabel>
                  <Textarea
                    name="comments"
                    value={form.comments}
                    onChange={handleChange}
                    placeholder="Write your comments here..."
                    focusBorderColor="teal.500"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="yellow"
                  width="full"
                  size="lg"
                  isLoading={loading}
                  loadingText="Submitting..."
                  borderRadius="full"
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default MeetUserForm;
