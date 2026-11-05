import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
  AspectRatio,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Header from "../../Navbar/Header";
import { useEffect } from "react";
import axios from "axios";
import * as mod from "../../../url";
import { useState } from "react";
import Footer from "../../Navbar/Footer";
import { color } from "framer-motion";

const videos = [
  {
    id: 1,
    title: "",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/OtgoOIxkbm8", // FIXED
  },
  {
    id: 2,
    title:
      "Saving Vrindavan Braj is the first objective of my life! I have dedicated my life to protect Thakurji's abode, this is my only goal",
    subtitle: "Trademark Registrati",
    videoUrl: "https://www.youtube.com/embed/-ebqFmxYP3Q", // FIXED
  },
  {
    id: 3,
    title: "Domestic violence ACT 2005",
    subtitle: "LAWVS India's first",
    videoUrl: "https://www.youtube.com/embed/1KtgrgsqDos",
  },
  {
    id: 4,
    title:
      "CAW Cell Kavach | Kya aapke bhi sasural wale pareshan karte hain | FIR darj karne ki poori prakriya",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/8PNvg3PjJmA",
  },
  {
    id: 5,
    title: "Cell proceeding after filing a complaint | Dowry",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/MKBnr5LyBOE",
  },
  {
    id: 6,
    title: "If in-laws harass me, how can I take legal action?",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/mjWbCj8Cy1k",
  },
  {
    id: 7,
    title: "Dowry Case | Dowry Case 498A IPC",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/v6O3jaf19g8",
  },
  {
    id: 8,
    title: "How to start litigation - Young Lawyer",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/IPA5U-MyU3I",
  },
  {
    id: 9,
    title: "Interview : Suryansh Dixit, Join The Revolution",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/O57VEkWvml8",
  },
  {
    id: 10,
    title: "aTrademark : Know the Law to Protect Your Brand!",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/EuriJGPv4iY",
  },
  {
    id: 11,
    title: "Interview : Madhav Goswami, Join The Revolution",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/dzTttVkG414",
  },
  {
    id: 12,
    title: "Lawvs updates- Mehul Bhatnagar, Join The Revolution ",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/gNycAhcCKYc",
  },
  {
    id: 13,
    title: "Lawvs updates- Avadhesh Pratap Singh, Join The Revolution",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/-SSWVVz4aw4",
  },
  {
    id: 14,
    title: "Lawvs updates, Join The Revolution",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/SVeB5g5QHPo",
  },
  {
    id: 15,
    title:
      "LAWVS India's fiirst Portal for legal jobs ,internship sample legal drafts latest judgement",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/R5D8wlvECYo",
  },
  {
    id: 16,
    title:
      "Caste based census and survey_Bihar_Caste_Survey_Report_Reservation",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/pEf7AlYHqF0",
  },
  {
    id: 17,
    title: "Job after Lawschool | Internship opportunity in top Law firm",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/3_cjDrVrIRU",
  },
  {
    id: 18,
    title:
      "aHunt for Junior/Intern🔍 Discover the Perfect Fit for Your Firm/Chamber",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/X4Kt38Dcpnc",
  },
  {
    id: 19,
    title:
      "Free AIBE Mock Exam preparation | Evaluate your Performance lawvs.com",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/bqELo81-Dg8",
  },
  {
    id: 20,
    title: "legal short",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/uKmQf5AuB60",
  },
  {
    id: 21,
    title: "the biggest challenges in our legal system ",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/8PiPKNPrHFE",
  },
  {
    id: 22,
    title: "the importance of safeguarding against false allegations",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/3V-xmTYbXSU",
  },
  {
    id: 23,
    title: "guidance on the steps to take if a false FIR ",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/rUSwwaxHVfE",
  },
  {
    id: 24,
    title: "How Section 125 of the CRPC ensures maintenance",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/hnUYXwsfCcU",
  },
  {
    id: 25,
    title: "If you're facing false allegations in a relationship",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/XYnudXj64ig",
  },
  {
    id: 26,
    title: "VIP culture and made other promises",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/TfCnYjVHjN4",
  },
  {
    id: 27,
    title: "Allegations between political partie",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/gR4JNSBggkM",
  },
  {
    id: 28,
    title: "How action can be taken against false promises",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/CVD0IUGjX5U",
  },
  {
    id: 29,
    title: "Protect a men of dowry, domestic violence ",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/fBtSfBb_5R8",
  },
  {
    id: 30,
    title: "Stable the career in law",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/uQ-UnvmSMr4",
  },
  {
    id: 31,
    title: "Cases of illegal possession of properties",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/wfqjzAvVX8o",
  },
  {
    id: 32,
    title: "We discuss the sensitive issue of live-in relationships",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/Z5IDcY7k8OQ",
  },
  {
    id: 33,
    title: "",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/PnV_zpbcJks",
  },
  {
    id: 34,
    title: "Allegations between political partie",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/We4Vi-EhYNY",
  },
  {
    id: 35,
    title: "Ailet_Exam_2024_AILET Preparation Guide",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/woiIRcKmgzA",
  },
  {
    id: 35,
    title: "CLAT Exam Eligibility Criteria _CLAT 2024 Exam Details ",
    subtitle: "",
    videoUrl: "https://www.youtube.com/embed/ZIBeaUFUiM0",
  },
];

const VideosPage = () => {
  const [video, setVideo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(20); // change this number if you want
  const totalPages = Math.ceil(video?.length / videosPerPage);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
    onOpen();
  };
  const toast = useToast();
  const getVideo = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/video/get-all-video`
      );

      if (data?.data?.length === 0) {
        toast({
          title: "No Video found",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setVideo(data?.data || []);
      // setFilteredVideos(data?.Videos || []); // initialize
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "Error fetching videos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = video?.slice(indexOfFirstVideo, indexOfLastVideo);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  return (
    <>
      <Header />
      <Container maxW="7xl" py={10}>
        <Box
          justify="space-between"
          textAlign="center"
          mb={8}
          p={3}
          backgroundColor={"goldenrod"}
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading as="h2" size="xl" color="white">
            Videos & News
          </Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={8}>
          {currentVideos?.map((v) => (
            <VStack
              key={v._id}
              spacing={4}
              borderRadius="md"
              overflow="hidden"
              bg="white"
              transition="all 0.3s ease-in-out"
              boxShadow="xl"
              _hover={{
                transform: "translateY(-10px) scale(1.03)",
                boxShadow: "2xl",
              }}
              textAlign="justify"
              cursor="pointer"
              onClick={() => handleVideoClick(v?.videoUrl)}
            >
              <AspectRatio w="100%" ratio={16 / 9}>
                <iframe
                  title={v?.title?.slice(0, 30)}
                  src={v?.videoUrl}
                  allowFullScreen
                />
              </AspectRatio>

              <Box textAlign="justify" p={2}>
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="goldenrod"
                  px={1} // padding horizontal
                  cursor="pointer"
                  _hover={{
                    color: "blue",
                    fontSize: "14px", // small increase on hover
                  }}
                  noOfLines={2} // optional: limit to one line
                >
                  {v?.title?.slice(0, 50)}
                </Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>

        {/* ====== Modal for Playing Video ====== */}
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
          <ModalOverlay bg="blackAlpha.700" />
          <ModalContent
            bg="white" // make content visible
            borderRadius="xl"
            boxShadow="2xl"
            overflow="hidden"
            position="relative"
          >
            {/* Close Button */}
            <ModalCloseButton
              color="red"
              size="lg"
              zIndex={10}
              _hover={{ bg: "gray.200" }}
            />

            <ModalBody p={0}>
              <AspectRatio ratio={16 / 9}>
                {selectedVideo && (
                  <iframe
                    key={selectedVideo}
                    src={`${selectedVideo}?autoplay=1`}
                    title="Selected Video"
                    allowFullScreen
                    allow="autoplay"
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </AspectRatio>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Pagination Controls */}
        <Flex justify="center" align="center" mt={10} gap={4}>
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            colorScheme="yellow"
            variant="outline"
          >
            Previous
          </Button>
          <Box fontWeight="bold">
            Page {currentPage} of {totalPages}
          </Box>
          <Button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            colorScheme="yellow"
            variant="outline"
          >
            Next
          </Button>
        </Flex>
      </Container>

      <Footer />
    </>
  );
};

export default VideosPage;
