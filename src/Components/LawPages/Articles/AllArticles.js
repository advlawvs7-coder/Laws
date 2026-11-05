import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
  useToast,
  Input,
  Flex,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import truncate from "html-truncate";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 8; // ✅ change as needed
  const toast = useToast();
  const navigate = useNavigate();
  const getActiveArticles = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/article/get_active_articles`
      );

      if (data?.Articles?.length === 0) {
        toast({
          title: "No Article found",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      setArticles(data?.Articles || []);
      setFilteredArticles(data?.Articles || []);
    } catch (error) {
      toast({
        title: "Error fetching stories",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(1000 - elapsed, 0); // ensure at least 1s loader
      setTimeout(() => setLoading(false), remaining);
    }
  };

  useEffect(() => {
    getActiveArticles();
  }, []);

  // ✅ Filter when search query changes
  useEffect(() => {
    const results = articles.filter((article) =>
      article?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(results);
    setCurrentPage(1); // reset to first page when searching
  }, [searchQuery, articles]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const handleCreateArticle = () => {
    try {
      const user = localStorage.getItem("lawvsuserinfo");
      const parsedUser = user ? JSON.parse(user) : null;

      if (!parsedUser) {
        toast({
          title: "Please log in to create an article",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        // Navigate after small delay for toast visibility
        setTimeout(() => navigate("/user-auth-login"), 500);
        return;
      }

      // Redirect to create article page
      navigate("/create-article");
    } catch (error) {
      console.error("Error checking login:", error);
      toast({
        title: "Something went wrong, please log in again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/user-auth-login");
    }
  };

  return (
    <>
      <Header />
      <Container maxW="7xl" width="100%">
        <Box
          bgGradient="linear(to-r, gray.50, gray.100)"
          py={{ base: 5, md: 12 }}
          textAlign="center"
          mb={3}
          width="100%"
        >
          <Heading as="h1" size="2xl" mb={2}>
            Legal Articles
          </Heading>
          <Text fontSize="2xl" color="orange.600" fontWeight="bold">
            Top Articles Content Goes Here
          </Text>
        </Box>
        {/* 🔍 Search Bar */}
        <Flex mb={6} justify="center" align="center" gap={4} wrap="wrap">
          <Input
            placeholder="Search articles by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxW="50%"
            bg="white"
          />
          <Button
            onClick={handleCreateArticle}
            backgroundColor="green"
            color={"white"}
          >
            Create Article
          </Button>
        </Flex>

        <Box p={5}>
          <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 3 }} spacing={8}>
            {currentArticles.map((article) => (
              <Box
                key={article?.id}
                as={Link}
                to={`/article/${article?.slug}`}
                // borderWidth="1px"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                transition="all 0.4s ease-in-out"
                _hover={{
                  transform: "translateY(-4px) scale(1.03)",
                  boxShadow: "xl",
                  borderColor: "transparent",
                  bgGradient: "linear(to-br, teal.50, pink.50)",
                }}
              >
                {/* Blog Image */}
                <Image
                  src={article?.articleImage}
                  alt={article?.title}
                  w="100%"
                  h="220px"
                  // objectFit="cover"
                  transition="all 0.3s"
                  borderRadius="xl"
                  _hover={{ filter: "brightness(1.1) saturate(1.2)" }}
                />

                {/* Blog Content */}
                <Box p={5}>
                  <Text
                    align="justify"
                    fontSize="sm"
                    fontWeight="extrabold"
                    mb={1}
                    noOfLines={2}
                    color="gray.800"
                    _groupHover={{ color: "teal.600" }}
                  >
                    {article?.title}
                  </Text>
                  <Text textAlign="left" fontSize="sm" color="red.600">
                    {article?.authorName} •{" "}
                    {article?.postedOn &&
                      new Date(article.postedOn).toLocaleString()}
                  </Text>
                  {/* Blog Description Preview */}
                  <Box
                    sx={{
                      ".ql-editor, .ql-editor *": {
                        fontSize: "13px !important",
                        fontWeight: "normal !important",
                        lineHeight: "1.7 !important",
                        color: "#4a5568 !important",
                        textAlign: "justify !important",
                        margin: "0 !important",
                        padding: "0 !important",
                      },
                      ".ql-container.ql-bubble": {
                        border: "none",
                        padding: 0,
                        margin: 0,
                        background: "transparent",
                        minHeight: "80px",
                      },
                    }}
                  >
                    <ReactQuill
                      value={truncate(article?.description || "", 150)}
                      readOnly
                      theme="bubble"
                      modules={{ toolbar: false }}
                      style={{
                        minHeight: "73px",
                        maxHeight: "73px",
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* 📄 Pagination */}
        <Flex justify="center" mt={8} gap={2} wrap="wrap">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? "solid" : "outline"}
              colorScheme="blue"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
