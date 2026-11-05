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
const storedData = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const token = storedData?.data?.token;
const config = { headers: { Authorization: `${token}` } };

const SIDEBAR_WIDTH = "250px";

const CreateNews = () => {
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
  const CLOUDINARY_UPLOAD_PRESET = "lawvs_img"; // your created preset
  const CLOUDINARY_CLOUD_NAME = "dhx6zek29"; // Your Cloudinary cloud name
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("cloud_name", "dhx6zek29"); // 🔁 Replace with your Cloudinary cloud name
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
      let uploadedImageUrl = "";

      if (imageFile) {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
        setImageUrl(uploadedImageUrl);
      }

      await axios.post(
        `${mod.api_url}/api/v1/news/create_news`,
        {
          title,
          description: content,
          subTitle,
          articleImage: uploadedImageUrl,
          shortDescription: sortDes,
          metaTitle: metTitle,
          metaKeyword: metaKeyword,
          metaDescription: metaDes,
          authorName: author,
        },
        config
      );

      toast({
        title: "article submitted.",
        description: "Your article was successfully posted.",
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
        "Error submitting article:",
        error.response?.data || error.message
      );
      toast({
        title: "Submission failed.",
        description: "Something went wrong while posting the article.",
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
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={4}>
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
            Add News
          </Text>

          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel>News Title</FormLabel>
              <Input
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>News Short Description</FormLabel>
              <Textarea
                placeholder="Enter short description"
                value={sortDes}
                onChange={(e) => setSortDes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>News Sub Title</FormLabel>
              <Input
                placeholder="Enter Sub Title"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>News Upload Image</FormLabel>
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
              <FormLabel>News Description</FormLabel>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder="Write your article here..."
                style={{ height: "300px", marginBottom: "20px" }}
              />
            </Box>

            <FormControl>
              <FormLabel>News Meta Title</FormLabel>
              <Input
                placeholder="Meta Title"
                value={metTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>News Meta Description</FormLabel>
              <Input
                placeholder="Meta Description"
                value={metaDes}
                onChange={(e) => setMetaDes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>News Meta Keywords</FormLabel>
              <Input
                placeholder="Meta Keywords"
                value={metaKeyword}
                onChange={(e) => setMetaKeyword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>News Author</FormLabel>
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
    </>
  );
};

export default CreateNews;
