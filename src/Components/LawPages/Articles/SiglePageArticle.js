import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Container,
  useToast,
  Link as ChakraLink,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import axios from "axios";
import * as mod from "../../../url";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import ShareSidebar from "../../../utils/ShareSidebar";
import LAWVSLoader from "../../../utils/Loders";

export default function SingleArticle() {
  const [article, setArticle] = useState(null);
  const [latestArticle, setLatestArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { slug } = useParams();
  // Fetch article by slug
  const getArticleBySlug = async (slug) => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_single_article/${slug}`
      );
      if (!data) {
        toast({
          title: "Story not found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setArticle(null);
        return;
      }
      setArticle(data?.article || null);
    } catch (error) {
      toast({
        title: "Error fetching  single article.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fetch latest articles (excluding current one)
  const getLatestArticles = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_latest_articles`
      );
      const filtered = data?.Articles?.filter((s) => s.slug !== slug).slice(
        0,
        5
      );
      setLatestArticle(filtered);
    } catch (error) {
      console.error("Error fetching latest articles:", error);
    }
  };

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    const startTime = Date.now();

    Promise.all([getArticleBySlug(slug), getLatestArticles()]).finally(() => {
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      const remaining = Math.max(1000 - elapsed, 0); // 1000ms = 1s

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    });
  }, [slug]);

  if (loading) {
    return <LAWVSLoader />;
  }

  if (!article) {
    return <Text textAlign="center">Story not found</Text>;
  }

  return (
    <>
      <Header />
      <Container maxW="7xl" py={{ base: 6, md: 10 }}>
        <HStack
          align="start"
          spacing={{ base: 0, md: 8 }}
          flexDir={{ base: "column", md: "row" }}
        >
          {/* Left Side - Story Details */}
          <Box flex="70%" p={{ base: 2, md: 6 }}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              mb={4}
              color="gray.800"
              lineHeight="short"
              textAlign="justify"
            >
              {article?.title}
            </Heading>
            <Text
              color="red.500"
              mb={1}
              fontSize={{ base: "sm", md: "md" }}
              textAlign={"left"}
            >
              {article?.authorName}
            </Text>
            <Text
              color="gray.500"
              mb={1}
              fontSize={{ base: "sm", md: "md" }}
              textAlign={"left"}
            >
              {article?.postedOn && new Date(article.postedOn).toLocaleString()}
            </Text>
            <Image
              src={article?.articleImage}
              alt={article?.title}
              mb={6}
              w="100%"
              maxH="400px"
              // objectFit="cover"
              borderRadius="xl"
              boxShadow="md"
              transition="all 0.4s ease"
              _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
            />

            {/* Full Content (HTML) */}
            <Box
              sx={{
                ".ql-editor ": {
                  lineHeight: "1.8 !important",
                  color: "#2d3748", // gray.800
                  textAlign: "justify",
                  fontFamily: "serif",
                  fontSize: "20px !important",
                },
                // ".ql-editor p": { marginBottom: "1em" },
                ".ql-editor p": {
                  marginTop: "1 !important",
                  marginBottom: "0 !important", // sirf niche space
                  fontSize: "20px !important",
                  fontFamily: "serif",
                  lineHeight: "1.7",
                },

                ".ql-editor img": {
                  maxWidth: "400px", // responsive
                  minWidth: "500px", // responsive
                  height: "300px",
                  borderRadius: "12px", // rounded corners
                  margin: "16px 0", // top-bottom space
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // soft shadow
                  objectFit: "cover",
                  alignItems: "center",
                },
                ".ql-editor, .ql-editor *": {
                  fontSize: "20px !important",
                  // fontWeight: "normal !important",
                  lineHeight: "1.7 !important",
                  // color: "#4a5568 !important",
                  textAlign: "justify !important",
                  margin: "0 !important",
                  padding: "0 !important",
                  fontFamily: "serif !important",
                },
              }}
            >
              <ReactQuill
                value={article?.description}
                readOnly
                theme="bubble"
                style={{
                  minHeight: "300px",
                  textAlign: "justify",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,
                }}
              />
            </Box>
          </Box>

          {/* Right Side - Latest Stories */}
          <Box
            flex="30%"
            position="sticky"
            top="100px"
            align="start"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={1}
            maxW={{ base: "100%", md: "500px" }}
            minH="600px"
            bg="white"
            // boxShadow="md"
            transition="all 0.3s ease"
            _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
          >
            <Heading
              size="md"
              mb={5}
              textAlign="center"
              backgroundColor="yellow.400"
              py={3}
              borderRadius="md"
              fontWeight="semibold"
              letterSpacing="wide"
            >
              Latest Articles
            </Heading>

            <VStack align="start" spacing={5}>
              {latestArticle.map((s) => (
                <HStack
                  key={s.slug}
                  spacing={4}
                  align="center"
                  w="100%"
                  p={2}
                  borderRadius="lg"
                  transition="all 0.3s ease"
                  _hover={{ bg: "gray.50", transform: "translateX(6px)" }}
                >
                  <Flex>
                    {" "}
                    <Image
                      src={s.articleImage}
                      alt={s.title}
                      width="120px"
                      height="80px"
                      borderRadius="md"
                      boxShadow="sm"
                      transition="all 0.3s ease"
                      _hover={{ boxShadow: "md" }}
                    />
                    <ChakraLink
                      as={Link}
                      to={`/article/${s.slug}`}
                      fontWeight="semibold"
                      fontSize={{ base: "sm", md: "md" }}
                      color="gray.700"
                      noOfLines={2}
                      transition="color 0.2s"
                      _hover={{ color: "teal.600" }}
                      textAlign="justify"
                      marginLeft={3}
                    >
                      {s?.title}
                    </ChakraLink>
                  </Flex>
                </HStack>
              ))}
            </VStack>
          </Box>
          <ShareSidebar url={window.location.href} title={article.title} />
        </HStack>
      </Container>
      <Footer />
    </>
  );
}
