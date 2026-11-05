import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  Container,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Toast,
  useToast, // ✅ ADD THIS
} from "@chakra-ui/react";

import draftimage from "../../Assets/lawsImage/draft.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import * as mod from "../../../url";
import LAWVSLoader from "../../../utils/Loders";
import { useNavigate } from "react-router-dom";
import { Spinnernew } from "../../spiner";
import { useBreakpointValue } from "@chakra-ui/react";

export default function DraftsGrid() {
  const [allDrafts, setAllDrafts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [selectedDraft, setSelectedDraft] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [buyLoading, setBuyLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const userId = userInfo?.data?.userData._id;
  const userType = userInfo?.data?.userData.role;
  const token = userInfo?.data?.token;
  const config = { headers: { Authorization: `${token}` } };
  const toast = useToast();
  const draftsPerPage = 24;

  const isMobile = useBreakpointValue({ base: true, md: false });
  const fetchAllDrafts = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/draft/get_active_drafts`,
      );
      setAllDrafts(data);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(1000 - elapsed, 0); // ensure minimum 1s
      setTimeout(() => setLoading(false), remaining);
    }
  };
  useEffect(() => {
    fetchAllDrafts();
  }, []);

  // Filter drafts by title
  const filteredDrafts = allDrafts.filter(
    (draft) =>
      draft.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const indexOfLastDraft = currentPage * draftsPerPage;
  const indexOfFirstDraft = indexOfLastDraft - draftsPerPage;
  const currentDrafts = filteredDrafts.slice(
    indexOfFirstDraft,
    indexOfLastDraft,
  );

  const totalPages = Math.ceil(filteredDrafts.length / draftsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const applyCoupon = async () => {
    if (!userId || !userType) {
      toast({
        title: "please login to apply coupon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/user-auth-login");
      return;
    }
    if (!couponCode.trim()) {
      toast({
        title: "Please enter a coupon code",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${mod.api_url}/api/v1/draft/aply-coupon/${selectedDraft.slug}`,
        {
          draftId: selectedDraft._id,
          couponCode,
        },
        { headers: { Authorization: ` ${token}` } },
      );

      setFinalPrice(0);

      toast({
        title: "Coupon applied 🎉",
        description:
          finalPrice === 0
            ? "This draft is now FREE!"
            : `Final price is ₹${res.data.finalAmount}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setVerified(true);
    } catch (err) {
      toast({
        title: "Coupon failed",
        description: err.response?.data?.message || "Invalid coupon",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const confirmBuy = async () => {
    if (!userId || !userType) {
      toast({
        title: "please login to buy draft",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      navigate("/user-auth-login");
      return;
    }
    if (!verified) {
      toast({
        title: "Please apply a valid coupon before buying",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setBuyLoading(true);
      await axios.post(
        `${mod.api_url}/api/v1/draft/buy-draft`,
        {
          draftId: selectedDraft._id,
          couponCode: couponCode || null,
          userId,
          userType,
        },
        { headers: { Authorization: ` ${token}` } },
      );

      toast({
        title: "Draft purchased successfully ✅",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate(`/user-auth-my-drafts`);
    } catch (err) {
      toast({ title: err?.response?.data?.message || "Error buying draft" });
      console.log(err, "hhhhhh");
    } finally {
      setBuyLoading(false);
    }
  };

  const getDiscountedPrice = (draft) => {
    if (!draft.coupon?.isActive) return draft.price;

    if (draft.coupon.discountType === "FREE") return 0;

    if (draft.coupon.discountType === "PERCENT") {
      return Math.max(
        0,
        draft.price - (draft.price * draft.coupon.discountValue) / 100,
      );
    }

    if (draft.coupon.discountType === "FLAT") {
      return Math.max(0, draft.price - draft.coupon.discountValue);
    }

    return draft.price;
  };

  if (loading) {
    return <Spinnernew />;
  }
  return (
    <Container maxW="7xl" py={12}>
      {/* Search Bar */}
      <InputGroup size="lg" mb={8}>
        <Input
          placeholder="Search drafts by name"
          borderRadius="md"
          borderColor="gray.300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="5rem">
          <Button h="100%" colorScheme="blue" borderRadius="md">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* Drafts Cards */}
      {currentDrafts.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" color="gray.500">
            No drafts found matching your search.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {currentDrafts.map((d, i) => {
            const discountedPrice = getDiscountedPrice(d);
            const hasDiscount = discountedPrice < d?.price;

            const discountPercent =
              d.coupon?.discountType === "PERCENT"
                ? d.coupon.discountValue
                : hasDiscount
                  ? Math.round(((d.price - discountedPrice) / d.price) * 100)
                  : 0;
            return (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={4}
                boxShadow="md"
              >
                <VStack spacing={4}>
                  {/* Draft Image */}
                  <Image
                    src={draftimage}
                    alt="Draft"
                    boxSize="80px"
                    objectFit="contain"
                  />

                  {/* Title */}
                  <Box
                    bgColor="#720e04"
                    color="white"
                    p={3}
                    textAlign="center"
                    borderRadius="md"
                    fontWeight="semibold"
                    fontSize="sm"
                  >
                    <Text noOfLines={3}>{d.title.toUpperCase()}</Text>
                  </Box>

                  {/* Price */}
                  <Box textAlign="center">
                    {hasDiscount && (
                      <Badge
                        colorScheme="red"
                        mb={1}
                        borderRadius="full"
                        px={3}
                        fontSize="xs"
                      >
                        {discountedPrice === 0
                          ? "FREE"
                          : `${discountPercent}% OFF`}
                      </Badge>
                    )}

                    <HStack justify="center" spacing={2}>
                      {hasDiscount && (
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          textDecoration="line-through"
                        >
                          ₹{Math.floor(d.price)}
                        </Text>
                      )}

                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        color={discountedPrice === 0 ? "green.600" : "blue.600"}
                      >
                        ₹{Math.floor(discountedPrice)}
                      </Text>
                    </HStack>

                    {hasDiscount && discountedPrice !== 0 && (
                      <Text fontSize="xs" color="green.500">
                        You save ₹{Math.round(d.price - discountedPrice)}
                      </Text>
                    )}
                  </Box>

                  {/* Buttons */}
                  <HStack spacing={3} width="100%" mt="auto">
                    <Button
                      bgColor="#720e04"
                      size="md"
                      width="100%"
                      color="white"
                      onClick={() => {
                        setSelectedDraft(d);
                        setFinalPrice(d.price);
                        setCouponCode("");
                        onOpen();
                      }}
                      _hover={{
                        bg: "#c98520",
                      }}
                    >
                      Buy
                    </Button>

                    <Button
                      bgColor="#720e04"
                      size="md"
                      width="100%"
                      color="white"
                      as={Link}
                      to={`/drafts/${d.slug}`}
                      _hover={{
                        bg: "#c48221",
                      }}
                    >
                      View
                    </Button>
                  </HStack>
                </VStack>{" "}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Buy Draft</ModalHeader>

                    <ModalBody>
                      {selectedDraft && (
                        <>
                          <Text fontWeight="bold">{selectedDraft.title}</Text>

                          {/* Original price */}
                          <Text mt={2} color="gray.500">
                            Original Price: ₹{selectedDraft.price}
                          </Text>

                          {/* Coupon input */}
                          <Input
                            mt={3}
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                          />

                          <Button mt={2} size="sm" onClick={applyCoupon}>
                            Apply Coupon
                          </Button>

                          {/* FINAL PRICE */}
                          <Text
                            mt={4}
                            fontWeight="bold"
                            fontSize="lg"
                            color={
                              discountedPrice === 0 ? "green.500" : "blue.500"
                            }
                          >
                            Final Price: ₹{Math.floor(discountedPrice)}
                          </Text>

                          {/* FREE MESSAGE */}
                          {finalPrice === 0 && (
                            <Text color="green.600" fontSize="sm">
                              🎉 This draft is FREE after applying coupon!
                            </Text>
                          )}
                        </>
                      )}
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="green"
                        mr={3}
                        isLoading={buyLoading}
                        onClick={confirmBuy}
                      >
                        {finalPrice === 0 ? "Get Free" : "Confirm Buy"}
                      </Button>

                      <Button variant="ghost" onClick={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <HStack justify="center" mt={8} spacing={2} flexWrap="wrap">
          {/* Previous */}
          <Button
            size={{ base: "sm", md: "md" }}
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Prev
          </Button>

          {/* Page Numbers */}
          {!isMobile &&
            Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                size="md"
                variant={currentPage === i + 1 ? "solid" : "outline"}
                bg={currentPage === i + 1 ? "#720e04" : "transparent"}
                color={currentPage === i + 1 ? "white" : "black"}
                _hover={{
                  bg: currentPage === i + 1 ? "#720e04" : "gray.100",
                }}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

          {/* Mobile Current Page Only */}
          {isMobile && (
            <Button
              size="sm"
              bg="#720e04"
              color="white"
              _hover={{ bg: "#720e04" }}
            >
              {currentPage} / {totalPages}
            </Button>
          )}

          {/* Next */}
          <Button
            size={{ base: "sm", md: "md" }}
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </Container>
  );
}
