// TopArticles.js
import React from "react";
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
import { useState, useEffect } from "react";
import axios from "axios";
import * as mod from "../../url";

// const articles = [
//   {
//     title:
//       "Space Law and India’s Private Sector Boom: Time for a New Regulatory Code?",
//     description:
//       "India's private space sector is expanding rapidly with startups entering rocket and satellite development.",
//     img: "https://lawvs.com/media/admin/article/1753444301_1cd1e7d3498f3f701354.png",
//   },
//   {
//     title: "Data Localization Laws in India: National Security...",
//     img: "https://lawvs.com/media/admin/article/1753444301_1cd1e7d3498f3f701354.png",
//   },
//   {
//     title: "Navigating Copyright Challenges in the Age of Inte...",
//     img: "https://lawvs.com/media/admin/article/1753444301_1cd1e7d3498f3f701354.png",
//   },
//   {
//     title: "Transparency Under Scrutiny in Maharashtra",
//     img: "https://lawvs.com/media/admin/article/1753444301_1cd1e7d3498f3f701354.png",
//   },
//   {
//     title: "The Evolution of Bail Jurisprudence in India: From...",
//     img: "https://lawvs.com/media/admin/article/1753444301_1cd1e7d3498f3f701354.png",
//   },
//   {
//     title: "Live Streaming of Court Proceedings: A Step Towar...",
//     img: "https://swarajyamag.com/infrastructure/in-live-streaming-proceedings-of-constitutional-bench-next-week-supreme-court-is-following-footsteps-of-six-high-courts",
//   },
//   {
//     title: "Decoding the DNA Bill: Privacy vs. Crime Control i...",
//     img: "https://lawvs.com/media/admin/article/1750854082_3572f95f65fb64fb123d.png",
//   },
// ];

const TopArticles = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_latest_articles`
      );

      if (data && data?.Articles) {
        setArticles(data?.Articles);
      } else if (data?.data) {
        // sometimes backend wraps it inside "data"
        setArticles(data.data);
      } else {
        console.warn("No article found in response!");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <Box maxW="1200px" mx="auto" px={5} py={10}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="goldenrod">
          Top Articles
        </Heading>
        <Link href="/all-articles" color="goldenrod" fontWeight="bold">
          View All
        </Link>
      </Flex>
      <Divider />

      {/* Other Articles */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {articles.map((bg, index) => (
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
            onClick={() => (window.location.href = `/article/${bg.slug}`)}
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
                src={bg.articleImage}
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
  );
};

export default TopArticles;
