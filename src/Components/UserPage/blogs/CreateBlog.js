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
const CreateBlogs = () => {
  const [title, setTitle] = useState("");
  const [sortDes, setSortDes] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [metTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDes, setMetaDes] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const CLOUDINARY_UPLOAD_PRESET = "lawvs_img"; // your created preset in cloudinary
  const CLOUDINARY_CLOUD_NAME = "dhx6zek29"; // Your Cloudinary cloud name
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("cloud_name", "dhx6zek29"); // 🔁 Replace with your Cloudinary cloud name
    // formData.append("blogsImage_set", CLOUDINARY_UPLOAD_PRESET);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "lawvs/blogs");

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

      await axios.post(
        `${mod.api_url}/api/v1/blogs/create_blogs`,
        {
          title,
          description: content,
          subTitle,
          blogImage: uploadedImageUrl,
          shortDescription: sortDes,
          metaTitle: metTitle,
          metaKeyword: metaKeyword,
          metaDescription: metaDes,
          authorName: author,
          userId: userId,
          userType: userType,
        },
        config
      );

      toast({
        title: "Draft submitted.",
        description: "Your blogs was successfully posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setTitle("");
      setSortDes("");
      setSubTitle("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      setMetaTitle("");
      setMetaKeyword("");
      setMetaDes("");
      setAuthor("");
    } catch (error) {
      console.error(
        "Error submitting blogs:",
        error.response?.data || error.message
      );
      toast({
        title: "Submission failed.",
        description: "Something went wrong while posting the blogs.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false); // Enable button again if needed
    }
  };

  return (
    <>
      <Header />
      <Box ml={{ base: 0 }} p={1}>
        <Container maxW="" bg="white" p={1} borderRadius="md" boxShadow="md">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            mb={6}
            bg="#D29B3F"
            p={3}
            borderRadius="md"
            textAlign="center"
          >
            Add Blogs
          </Text>

          <VStack spacing={5} align="stretch" p={5}>
            <FormControl>
              <FormLabel> Blog Title</FormLabel>
              <Input
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Upload Blogs Image</FormLabel>
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
              <FormLabel>Blogs Description</FormLabel>
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
              <FormLabel>Blogs Meta Title</FormLabel>
              <Input
                placeholder="Meta Title"
                value={metTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel> Blogs Meta Description</FormLabel>
              <Input
                placeholder="Meta Description"
                value={metaDes}
                onChange={(e) => setMetaDes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Blogs Meta Keywords</FormLabel>
              <Input
                placeholder="Meta Keywords"
                value={metaKeyword}
                onChange={(e) => setMetaKeyword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Blogs Author</FormLabel>
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
                  setSortDes("");
                  setSubTitle("");
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

export default CreateBlogs;
