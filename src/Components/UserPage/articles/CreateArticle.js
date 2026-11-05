import React, { useState } from "react";
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
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import * as mod from "../../../url";
import { formats, modules } from "../../../utils/Quill";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const userId = userInfo?.data?.userData._id;
const userType = userInfo?.data?.userData.role;
const token = userInfo?.data?.token;
const config = { headers: { Authorization: `${token}` } };
const CreateArticles = () => {
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
  const CLOUDINARY_UPLOAD_PRESET = "lawvs_img"; // your created preset
  const CLOUDINARY_CLOUD_NAME = "dhx6zek29"; // Your Cloudinary cloud name
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("cloud_name", "dhx6zek29"); //  Replace with your Cloudinary cloud name
    // formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "lawvs/articles");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    );
    return res.data.secure_url;
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const wordCount = content.trim().split(/\s+/).length;

      if (wordCount < 300 || wordCount > 1000 || !title || !imageFile) {
        toast({
          title: "Validation failed",
          description: "Please check word count min-300 to max-1000 & image",
          status: "warning",
        });
        setIsSubmitting(false);
        return;
      }

      let uploadedImageUrl = "";
      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
        setImageUrl(uploadedImageUrl);
      }

      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      const res = await axios.post(
        `${mod.api_url}/api/v1/article/create_article`,
        {
          title,
          description: content,
          articleImage: uploadedImageUrl,
          metaTitle: metTitle,
          metaKeyword: metaKeyword,
          metaDescription: metaDes,
          authorName: author,
          userId: userId,
          userType: userType,
        },
        config,
      );
      toast({
        title: "Article submitted",
        description: "Your article successfully posted.",
        status: "success",
      });
      setTitle("");
      setAuthor("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      setMetaTitle("");
      setMetaDes("");
      setMetaKeyword("");
    } catch (error) {
      console.error(
        "Error submitting article:",
        error.response?.data || error.message,
      );
      toast({
        title: "Submission failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Box ml={{ base: 0 }} p={4}>
        <Container maxW="7xl" bg="white" p={6} borderRadius="md" boxShadow="md">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            mb={6}
            bg="#D29B3F"
            p={3}
            borderRadius="md"
            textAlign="center"
          >
            Add Article
          </Text>

          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel>Article Title</FormLabel>
              <Input
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Article Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormControl>

            {imageFile && (
              <Image
                src={URL.createObjectURL(imageFile)}
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
                placeholder="Write your article here... minimum 300 words to max 500 words"
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
              <FormLabel>Article Meta Description</FormLabel>
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
              <Button
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setAuthor("");
                  setContent("");
                  setImageFile(null);
                  setImageUrl("");
                  setMetaTitle("");
                  setMetaDes("");
                  setMetaKeyword("");
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme={isSubmitting ? "gray" : "green"}
                isDisabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CreateArticles;
