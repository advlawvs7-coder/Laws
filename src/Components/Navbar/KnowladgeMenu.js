import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  Button,
  Divider,
} from "@chakra-ui/react";
import { IoMdArrowForward } from "react-icons/io";
import axios from "axios";
import * as mod from "../../url";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const MotionBox = motion(Box);
const KnowladgeMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [activeMenu, setActiveMenu] = useState("articles");
  const [contentData, setContentData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "articles",
      label: "Articles",
      url: "api/v1/article/get_latest_articles",
      page: "/all-articles",
    },
    {
      key: "blogs",
      label: "Blogs",
      url: "api/v1/blogs/get_latest_blogs",
      page: "/all-blogs",
    },
    {
      key: "news",
      label: "News",
      url: "api/v1/news/get_latest_news",
      page: "/all-news",
    },
  ];

  // ⏳ Hover Delay Handlers
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 100); // delay before closing (ms)
    setHoverTimeout(timeout);
  };

  // 🧩 Fetch content dynamically
  useEffect(() => {
    const fetchData = async () => {
      if (contentData[activeMenu]) return;

      setLoading(true);
      setError(null);

      try {
        const currentMenu = menuItems.find((m) => m.key === activeMenu);
        const { data } = await axios.get(`${mod.api_url}/${currentMenu.url}`);

        const items =
          data?.Articles ||
          data?.blogs ||
          data?.News ||
          data.data ||
          data ||
          [];

        setContentData((prev) => ({
          ...prev,
          [activeMenu]: items.slice(0, 4),
        }));
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeMenu]);
  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -400 },
  };

  return (
    <ChakraProvider>
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Flex p={2} justify="space-around">
          <Text
            cursor="pointer"
            fontWeight="bold"
            m={2}
            color="gray.700"
            _hover={{ color: "blue.500" }}
          >
            Knowledge {isOpen ? "▲" : "▼"}
          </Text>
        </Flex>

        {isOpen && (
          <Box
            position="absolute"
            top="90px"
            left="50px"
            w="90vw"
            bg="white"
            shadow="2xl"
            p={6}
            zIndex="1000"
          >
            <Flex>
              {/* Left Menu */}
              <VStack
                align="stretch"
                spacing={0}
                minW="220px"
                color="gray"
                borderRight={"1px solid #ccc"}
              >
                {menuItems.map((menu, i) => (
                  <Box key={menu.key}>
                    <Box
                      as="button"
                      onClick={() => setActiveMenu(menu.key)}
                      textAlign="left"
                      p="12px 50px"
                      fontWeight={activeMenu === menu.key ? "bold" : "normal"}
                      backgroundColor={
                        activeMenu === menu.key ? "#0d47a1" : "transparent"
                      }
                      color={activeMenu === menu.key ? "white" : "#000000fd"}
                      fontSize="16px"
                      fontFamily="Arial, sans-serif"
                      borderLeft={
                        activeMenu === menu.key
                          ? "4px solid orange"
                          : "4px solid transparent"
                      }
                      cursor="pointer"
                      transition="all 0.2s ease"
                      mb="10px"
                      _hover={{
                        backgroundColor:
                          activeMenu === menu.key ? "#0d47a1" : "#b2b6e7ff",
                      }}
                    >
                      <Flex justify="space-between" align="center">
                        {menu.label}
                        <IoMdArrowForward />
                      </Flex>
                    </Box>

                    {i < menuItems.length - 1 && (
                      <Box
                        as="hr"
                        border="0"
                        borderTop="1px solid #ddd"
                        mb="10px"
                      />
                    )}
                  </Box>
                ))}
              </VStack>

              {/* Right Content with Slide Animation */}
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeMenu}
                  flex="1"
                  pl={6}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={8}
                    flex="1"
                    pl={6}
                  >
                    {/* Grid of cards */}
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={4}
                      flex="2"
                    >
                      {contentData[activeMenu]?.map((item, idx) => (
                        <MotionBox
                          key={idx}
                          position="relative"
                          borderRadius="md"
                          overflow="hidden"
                          cursor="pointer"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => {
                            if (activeMenu === "articles") {
                              navigate(`/article/${item.slug}`);
                            } else if (activeMenu === "blogs") {
                              navigate(`/single-blog/${item.slug}`);
                            } else if (activeMenu === "news") {
                              navigate(`/news/${item.slug}`);
                            }
                          }}
                        >
                          <Box
                            as="img"
                            src={
                              item.articleImage ||
                              item.blogImage ||
                              item.NewsImage ||
                              item.videoThumbnail ||
                              "https://via.placeholder.com/400x250"
                            }
                            alt={item.title}
                            width="300px"
                            height="200px"
                            transition="transform 0.5s ease"
                            _hover={{ transform: "scale(1.3)" }}
                          />
                          <Flex
                            position="absolute"
                            bottom="0"
                            width="100%"
                            color="white"
                            justify="space-between"
                            align="center"
                            p={3}
                            bg="rgba(0,0,0,0.5)"
                          >
                            <Text fontWeight="bold" fontSize="sm" isTruncated>
                              {item.title}
                            </Text>
                            <IoMdArrowForward size={20} />
                          </Flex>
                        </MotionBox>
                      ))}
                    </SimpleGrid>

                    {/* List of titles */}
                    <Flex direction="column" flex="1" gap={2}>
                      <VStack align="stretch" spacing={5}>
                        {contentData[activeMenu]?.map((item, idx) => (
                          <Box key={idx}>
                            <Text
                              cursor="pointer"
                              _hover={{
                                color: "blue.500",
                                boxShadow: "md",
                                p: "6px",
                              }}
                              p={2}
                              textAlign="left"
                              fontSize="sm"
                              fontWeight="medium"
                              noOfLines={2}
                              onClick={() => {
                                if (activeMenu === "articles") {
                                  navigate(`/article/${item.slug}`);
                                } else if (activeMenu === "blogs") {
                                  navigate(`/single-blog/${item.slug}`);
                                } else if (activeMenu === "news") {
                                  navigate(`/news/${item.slug}`);
                                }
                              }}
                            >
                              {item.title}
                            </Text>
                            <Divider />
                          </Box>
                        ))}
                      </VStack>

                      {/* Know More Button */}
                      <Box
                        role="group"
                        position="relative"
                        display="inline-block"
                        overflow="hidden"
                        borderRadius="md"
                        cursor="pointer"
                        onClick={() => {
                          if (activeMenu === "articles") {
                            navigate(`/all-articles`);
                          } else if (activeMenu === "blogs") {
                            navigate(`/all-blogs`);
                          } else if (activeMenu === "news") {
                            navigate(`/all-news`);
                          }
                        }}
                        p={2}
                        width="fit-content"
                      >
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          height="100%"
                          width="40%"
                          bgGradient="linear(to-r, orange.400, orange.600)"
                          transition="width 0.5s ease"
                          zIndex={0}
                          _groupHover={{ width: "100%" }}
                        />
                        <Button
                          position="relative"
                          zIndex={1}
                          bg="transparent"
                          color="black"
                          rightIcon={<IoMdArrowForward />}
                          _hover={{ color: "white" }}
                          px={6}
                          py={2}
                        >
                          Know more
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                </MotionBox>
              </AnimatePresence>
            </Flex>

            {/* Close Button */}
            <Flex justify="flex-end" mt={4}>
              <Button colorScheme="red" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default KnowladgeMenu;
