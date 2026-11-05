"use client";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Link as ChakraLink,
  IconButton,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import * as mod from "../../url";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HomeBannerUser = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get(
          `${mod.api_url}/api/v1/newslatter/get/active/banner`,
        );
        setBanners(data || []);
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading)
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );

  if (banners.length === 0)
    return (
      <Text mt={10} textAlign="center">
        No banners available
      </Text>
    );

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      bg="black"
      w="100%"
      h={{ base: "135px", md: "300px", xl: "530px" }}
      // sm: "250px", ,
    >
      <AnimatePresence mode="wait">
        {banners.map(
          (banner, index) =>
            index === current && (
              <MotionBox
                key={banner._id}
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Banner Image */}
                <img
                  src={banner.imgUrl}
                  alt={banner.title}
                  position="absolute"
                  top={0}
                  left={0}
                  w="100%"
                  h="100%"
                  objectFit={{ base: "contain", md: "cover" }}
                />

                {/* Dark Overlay */}
                <Box
                  position="absolute"
                  inset="0"
                  // bg={{ base: "rgba(0,0,0,0.3)", md: "rgba(0,0,0,0.55)" }}
                />

                {/* Content Container */}
                <VStack
                  position="absolute"
                  top="50%"
                  left={{ base: "50%", md: "10%" }}
                  transform={{
                    base: "translate(-50%, -50%)",
                    md: "translateY(-50%)",
                  }}
                  align={{ base: "center", md: "flex-start" }}
                  textAlign={{ base: "center", md: "left" }}
                  spacing={5}
                  color="white"
                  px={{ base: 4, md: 8 }}
                  maxW={{ base: "90%", md: "600px" }}
                >
                  <MotionHeading
                    fontSize={{
                      base: "xl",
                      sm: "2xl",
                      md: "4xl",
                      xl: "5xl",
                    }}
                    fontWeight="bold"
                    lineHeight="1.2"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link to="/join-meeting-form">{banner.title}</Link>
                  </MotionHeading>

                  <MotionText
                    fontSize={{
                      base: "sm",
                      md: "md",
                      xl: "lg",
                    }}
                    lineHeight="1.7"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    dangerouslySetInnerHTML={{ __html: banner.Des }}
                  />

                  {banner.linkUrl && (
                    <MotionButton
                      as={ChakraLink}
                      href={banner.linkUrl}
                      isExternal
                      bg="#720e04"
                      color="white"
                      size={{ base: "sm", md: "lg" }}
                      borderRadius="full"
                      px={8}
                      _hover={{ bg: "#8c1207" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </MotionButton>
                  )}
                </VStack>
              </MotionBox>
            ),
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            icon={<ArrowBackIcon />}
            onClick={prevSlide}
            position="absolute"
            top="50%"
            left={{ base: 2, md: 6 }}
            transform="translateY(-50%)"
            bg="rgba(0,0,0,0.4)"
            color="white"
            size={{ base: "sm", md: "lg" }}
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.7)" }}
          />

          <IconButton
            aria-label="Next"
            icon={<ArrowForwardIcon />}
            onClick={nextSlide}
            position="absolute"
            top="50%"
            right={{ base: 2, md: 6 }}
            transform="translateY(-50%)"
            bg="rgba(0,0,0,0.4)"
            color="white"
            size={{ base: "sm", md: "lg" }}
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.7)" }}
          />
        </>
      )}
    </Box>
  );
};

export default HomeBannerUser;
