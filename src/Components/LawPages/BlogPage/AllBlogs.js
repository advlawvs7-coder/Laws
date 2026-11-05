import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
  Flex,
  Input,
  useToast,
  Button,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as mod from "../../../url";
import ReactQuill from "react-quill";
import truncate from "html-truncate";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBlogs, setFilterBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8; //  change as needed
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const getStories = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/blogs/get_active_blogs`
      );
      if (data?.blogs?.length === 0) {
        toast({
          title: "No stories found",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setBlogs(data.blogs);
      setFilterBlogs(data.blogs);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error fetching stories",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    getStories();
  }, []);
  useEffect(() => {
    const results = blogs.filter((news) =>
      news?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterBlogs(results);
    setCurrentPage(1); // reset to first page when searching
  }, [searchQuery, blogs]);

  //  Pagination logic
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filterBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filterBlogs.length / blogsPerPage);

  const handleCreateBlog = () => {
    try {
      const user = localStorage.getItem("lawvsuserinfo");
      const parsedUser = user ? JSON.parse(user) : null;

      if (!parsedUser) {
        toast({
          title: "Please log in to create an Blogs",
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
      navigate("/create-blog");
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
      <Container maxW="7xl">
        <Box
          bgGradient="linear(to-r, gray.50, gray.100)"
          py={{ base: 5, md: 10 }}
          textAlign="center"
          mb={3}
        >
          <Heading as="h1" size="2xl" mb={2}>
            Legal Blogs
          </Heading>
          <Text fontSize="2xl" color="orange.600" fontWeight="bold">
            Top Blogs Content Goes Here
          </Text>
        </Box>
        <Flex mb={6} justify="center" align="center" gap={4} wrap="wrap">
          <Input
            placeholder="Search Blogs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxW="50%"
            bg="white"
          />
          <Button
            onClick={handleCreateBlog}
            backgroundColor="green"
            color={"white"}
          >
            Create Blog
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 3 }} spacing={8}>
          {currentBlogs.map((blog) => (
            <Box
              key={blog?.id}
              // borderWidth="1px"
              // borderRadius="2xl"
              overflow="hidden"
              boxShadow="md"
              bg="white"
              transition="all 0.4s ease-in-out"
              _hover={{
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: "xl",
                borderColor: "transparent",
                bgGradient: "linear(to-br, teal.50, pink.50)",
              }}
              as={Link}
              to={`/single-blog/${blog?.slug}`}
            >
              <Image
                src={blog?.blogImage}
                alt={blog?.title}
                w="100%"
                h="220px"
                // objectFit="cover"
                transition="all 0.3s"
                _hover={{ filter: "brightness(1.1) saturate(1.2)" }}
              />

              <Box p={4}>
                <Text
                  align="left"
                  fontSize="sm"
                  fontWeight="extrabold"
                  mb={2}
                  noOfLines={2}
                  color="gray.800"
                  _groupHover={{ color: "teal.600" }}
                >
                  {blog?.title}
                </Text>
                <Text align="left" fontSize="sm" color="red.600" w="100%">
                  {blog?.authorName}.
                  {blog?.postedOn && new Date(blog?.postedOn).toLocaleString()}
                </Text>
                <Box
                  align="left"
                  fontSize="md"
                  color="gray.700"
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
                    value={truncate(blog?.description || "", 150)} // 150 chars with formatting
                    readOnly
                    theme="bubble"
                    style={{
                      minHeight: "80px",
                      maxHeight: "80px",
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
