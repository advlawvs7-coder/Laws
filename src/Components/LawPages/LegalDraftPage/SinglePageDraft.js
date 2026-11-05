import React, { useEffect, useState } from "react";
import axios from "axios";
import * as mod from "../../../url";
import {
  Box,
  Image,
  Heading,
  VStack,
  HStack,
  Link as ChakraLink,
  Container,
  Text,
  Spinner,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import Header from "../../Navbar/Header";
import Footer from "../../Navbar/Footer";
import { Spinnernew } from "../../spiner";
// import draftimage from "../../Assets/lawsImage/draft.jpg"; // Adjust the path as necessary

export default function SingleDraft() {
  const { slug } = useParams();
  const [drafts, setDrafts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.key === "u") || // View source
        (e.ctrlKey && e.shiftKey && e.key === "I") || // Dev tools
        e.key === "F12" // Dev tools
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const { data } = await axios.get(
          `${mod.api_url}/api/v1/draft/get_drafts/${slug}`
        );
        // console.log(data, "data");
        setDrafts(data);
      } catch (error) {
        console.error("Failed to fetch draft", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraft();
  }, [slug]);

  if (loading) return <Spinnernew size="xl" />;

  if (!drafts) return <Text color="red.500">Draft not found</Text>;
  return (
    <>
      <Header />
      <Container maxW="7xl" py={8}>
        <Box
          p={4}
          m={4}
          borderRadius="6px"
          overflow="hidden"
          boxShadow="sm"
          border="1px solid #e2e8f0"
          bg="white"
        >
          <Text color="gray.500" mb={4}>
            {drafts.author} {drafts.date}
          </Text>

          {/* <Box
            px={6}
            py={4}
            w="100%"
            borderRadius="6px"
            overflowX="auto"
            sx={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              pointerEvents: "auto",
              p: { marginBottom: "1rem", lineHeight: "1.6" },
              h1: { fontSize: "2xl", fontWeight: "bold" },
              textAlign: "justify",

              // Ordered list styles
              ol: {
                paddingLeft: "1.5em",
                textAlign: "justify",
              },
              "ol li": {
                marginBottom: "1em",
              },

              // ✅ Table styles
              table: {
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem",
                marginBottom: "1rem",
              },
              th: {
                border: "1px solid #ccc",
                padding: "6px",
                backgroundColor: "#f7fafc", // Chakra gray.50
                fontWeight: "bold",
                textAlign: "left",
              },
              td: {
                border: "1px solid #ccc",
                padding: "6px",
                textAlign: "left",
              },
              tr: {
                backgroundColor: "white",
              },
              "tr:nth-of-type(even)": {
                backgroundColor: "#f9f9f9", // Light zebra striping
              },
            }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{ __html: drafts.des }}
          /> */}
          <Box
            bg="white"
            style={{
              fontFamily: "serif",
              fontSize: "20pt",
              lineHeight: "1.8",
              whiteSpace: "pre-wrap",
              textAlign: "justify",
            }}
          >
            <ReactQuill
              value={drafts.des} // HTML from backend
              readOnly={true}
              theme="bubble" // ✅ bubble theme has no border or toolbar
              style={{
                minHeight: "600px",
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                padding: "20px",
              }}
            />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
