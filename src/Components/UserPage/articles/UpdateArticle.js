import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  Flex,
  useToast,
  Image,
  Container,
  VStack,
  FormLabel,
  FormControl,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { modules, formats } from "../../../utils/Quill";
import * as mod from "../../../url";
const storedData = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = storedData?.data?.token;
const config = { headers: { Authorization: `${token}` } };

const SIDEBAR_WIDTH = "250px";

const UpdateArticles = () => {
  const { slug } = useParams(); // blog id from route
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [metTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDes, setMetaDes] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  const CLOUDINARY_UPLOAD_PRESET = "lawvs_img";
  const CLOUDINARY_CLOUD_NAME = "dhx6zek29";

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "lawvs/blogs");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url;
  };

  // ✅ Fetch blog details for edit
  useEffect(() => {
    const fetchArticleBySlug = async () => {
      try {
        const res = await axios.get(
          `${mod.api_url}/api/v1/article/get_single_article/${slug}`,
          config
        );
        const data = res.data.article;
        setTitle(data.title);

        setContent(data.description);
        setImageUrl(data.articleImage);
        setMetaTitle(data.metaTitle);
        setMetaDes(data.metaDescription);
        setMetaKeyword(data.metaKeyword);
        setAuthor(data.authorName);
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast({
          title: "Error",
          description: "Failed to load blog details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchArticleBySlug();
  }, []);

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      let uploadedImageUrl = imageUrl;

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
        setImageUrl(uploadedImageUrl);
      }

      await axios.put(
        `${mod.api_url}/api/v1/article/update_article/${slug}`,
        {
          title,
          description: content,
          blogImage: uploadedImageUrl,
          metaTitle: metTitle,
          metaKeyword: metaKeyword,
          metaDescription: metaDes,
          authorName: author,
        },
        config
      );

      toast({
        title: "Article updated.",
        description: "Your blog was successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/blogs"); // redirect to list page
    } catch (error) {
      console.error(
        "Error updating blog:",
        error.response?.data || error.message
      );
      toast({
        title: "Update failed.",
        description: "Something went wrong while updating the blog.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Header />
      <Box ml={{ base: 0 }} p={4}>
        <Container maxW="" bg="white" p={6} borderRadius="md" boxShadow="md">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            mb={6}
            bg="#D29B3F"
            p={3}
            borderRadius="md"
            textAlign="center"
          >
            Update Article
          </Text>

          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel> Blog Title</FormLabel>
              <Input
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Upload Article Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormControl>

            {(imageFile || imageUrl) && (
              <Image
                src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                alt="Preview"
                maxH="200px"
                objectFit="cover"
                borderRadius="md"
              />
            )}

            <Box marginBottom="30px">
              <FormLabel>Article Description</FormLabel>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="Write your blogs here..."
                style={{ height: "300px", marginBottom: "20px" }}
              />
            </Box>

            <FormControl>
              <FormLabel>Article Meta Title</FormLabel>
              <Input
                placeholder="Meta Title"
                value={metTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel> Article Meta Description</FormLabel>
              <Input
                placeholder="Meta Description"
                value={metaDes}
                onChange={(e) => setMetaDes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Article Meta Keywords</FormLabel>
              <Input
                placeholder="Meta Keywords"
                value={metaKeyword}
                onChange={(e) => setMetaKeyword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Article Author</FormLabel>
              <Input
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>

            <Flex justify="flex-end" gap={4} pt={4}>
              <Button variant="outline" onClick={() => navigate("/blogs")}>
                Cancel
              </Button>
              <Button
                colorScheme={isSubmitting ? "gray" : "blue"}
                isDisabled={isSubmitting}
                onClick={handleUpdate}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default UpdateArticles;
