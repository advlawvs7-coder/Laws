// TopBlogs.js
import React from "react";
import axios from "axios";
import * as mod from "../../url";
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Image,
  VStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";

const TopBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/blogs/get_latest_blogs`
      );

      if (data && data.blogs) {
        setBlogs(data.blogs);
      } else if (data?.data) {
        // sometimes backend wraps it inside "data"
        setBlogs(data.data);
      } else {
        console.warn("No blogs found in response!");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Box>
      <Box maxW="1200px" mx="auto" px={5} py={10}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="goldenrod">
            Top Blogs
          </Heading>
          <Link href="/all-blogs" color="goldenrod" fontWeight="bold">
            View All
          </Link>
        </Flex>

        <Divider mb={6} />

        {/* Stories Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {blogs.map((bg, index) => (
            <Flex
              key={index}
              align="flex-start"
              gap={4}
              border="1px solid transparent"
              borderRadius="md"
              pb={4}
              p={3}
              bg="white"
              boxShadow="md"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "xl",
                borderColor: "goldenrod",
                bg: "yellow.50",
              }}
              onClick={() => (window.location.href = `/single-blog/${bg.slug}`)}
              cursor="pointer"
            >
              <Box
                overflow="hidden"
                borderRadius="md"
                minW="150px"
                maxW="150px"
                height="100px"
              >
                <Image
                  src={bg.blogImage}
                  alt={bg.title}
                  w="full"
                  h="full"
                  // objectFit="cover"
                  transition="transform 0.4s ease"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
              </Box>

              <VStack
                textAlign="justify"
                align="start"
                spacing={2}
                p={2}
                flex="1"
                justify="center"
              >
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  _hover={{ color: "goldenrod" }}
                  noOfLines={2}
                >
                  {bg.title}
                </Text>
                {/* Optional description */}
                {/* <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {bg.description}
          </Text> */}
              </VStack>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default TopBlogs;
