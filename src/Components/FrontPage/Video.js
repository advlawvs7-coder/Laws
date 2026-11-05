import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  VStack,
  Heading,
  Flex,
  Divider,
  Button,
  useToast,
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import * as mod from "../../url";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { color } from "framer-motion";

const LatestVideo = () => {
  const [videos, setVideos] = useState([]);
  const toast = useToast();
  const swiperRef = useRef(null);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/video/latest-video`
      );
      // Add "isOpen" state for each video
      const videoData = data?.data?.map((v) => ({ ...v, isOpen: false })) || [];
      setVideos(videoData);
    } catch (error) {
      toast({
        title: "Error fetching videos",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openModal = (id) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v._id === id) return { ...v, isOpen: true };
        return v;
      })
    );
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const closeModal = (id) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v._id === id) return { ...v, isOpen: false };
        return v;
      })
    );
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <Box px={{ base: 10, md: 16 }} py={1}>
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Heading as="h2" size="lg" color="yellow.700">
          Latest Videos
        </Heading>
        <Button
          as={Link}
          to="/videos-news"
          size="sm"
          color="yellow.700"
          variant="outline"
        >
          View All
        </Button>
      </Flex>

      <Divider mb={6} />

      <Box>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            440: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          style={{ height: "250px" }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {videos.map((v) => (
            <SwiperSlide key={v._id}>
              <VStack
                spacing={4}
                borderRadius="md"
                overflow="hidden"
                textAlign="justify"
                cursor="pointer"
                onClick={() => openModal(v._id)}
                shadow={"md"}
              >
                <AspectRatio w="100%" ratio={16 / 9}>
                  <iframe
                    title={v.title?.slice(0, 30)}
                    src={v.videoUrl}
                    allowFullScreen
                    pointerEvents="none"
                  />
                </AspectRatio>
                <Box textAlign="justify">
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "goldenrod",
                      padding: "0 5px",
                      _hover: { color: "blue" },
                    }}
                  >
                    {v.title?.slice(0, 50)}
                  </p>
                </Box>

                {/* Modal for each video */}
                <Modal
                  isOpen={v.isOpen}
                  onClose={() => closeModal(v._id)}
                  size="xl"
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent bg="black">
                    <ModalCloseButton
                      color="red"
                      size="lg"
                      zIndex={10}
                      _hover={{ bg: "gray.200" }}
                    />
                    <ModalBody p={0}>
                      <AspectRatio ratio={16 / 9} w="100%">
                        <iframe
                          src={v.videoUrl}
                          title={v.title}
                          allowFullScreen
                          allow="autoplay"
                        />
                      </AspectRatio>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </VStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default LatestVideo;
