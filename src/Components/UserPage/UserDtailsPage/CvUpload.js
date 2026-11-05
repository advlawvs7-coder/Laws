import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Progress,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import useUser from "../../hooks/useUser";

export const CvUpload = () => {
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  //   const [user, setUser] = useState("");
  //   const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const { user, setUser, loading, setLoading } = useUser(userId, token);

  // 👇 Agar user ke paas pehle se resumeUrl hai to file name set kar do
  useEffect(() => {
    if (user?.resumeUrl) {
      const fileName = user.resumeUrl.split("/").pop();
      setUploadedFile(fileName);
    }
  }, [user]);

  // Trigger hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle file select
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setUploading(true);
      setProgress(0);
      const response = await axios.post(
        `${mod.api_url}/api/v1/user/${userId}/upload-resume`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );
      toast({
        title: "Resume uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Update user state with new resumeUrl
      setUser((prev) => ({
        ...prev,
        resumeUrl: response.data?.resumeUrl,
      }));
      setUploadedFile(file.name); // uploaded file ka naam
      setUploading(false);
      setProgress(0);
    } catch (error) {
      setUploading(false);
      toast({
        title: "Failed to upload resume",
        description: error.response?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box textAlign={"left"}>
      <Flex justifyContent="space-between" align="center">
        <Heading size="sm">Resume</Heading>
        {user?.resumeUrl ? (
          <Button
            as="a"
            href={`${mod.api_url}${user.resumeUrl}`}
            // target="_blank"
            colorScheme="teal"
            mt={2}
          >
            View Uploaded Resume
          </Button>
        ) : (
          <Text color="gray.500">No resume uploaded</Text>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button
          colorScheme="teal"
          onClick={handleUploadClick}
          isDisabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </Button>
      </Flex>

      {/* Upload progress bar */}
      {uploading && (
        <Box mt={2}>
          <Progress value={progress} size="sm" colorScheme="green" />
          <Text fontSize="sm">{progress}%</Text>
        </Box>
      )}

      {/* Show uploaded file name and preview */}
      {user?.resumeUrl && (
        <Box mt={4}>
          {/* <Text fontWeight="bold">Uploaded File: {uploadedFile}</Text> */}
          <Box
            mt={2}
            border="1px solid #ccc"
            borderRadius="md"
            overflow="hidden"
          >
            {/* <iframe
              src={`${user.resumeUrl}`}
              title="Resume Preview"
              width="100%"
              height="400px"
              style={{ border: "none" }}
            /> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};
