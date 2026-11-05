import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from "../Navbar/Header";
import { api_url } from "../../url";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = userInfo?.data?.token;
  const userId = userInfo?.data?.userData?._id;

  // 🔹 Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${api_url}/api/v1/draft/get-order-byuser/${userId}`,
          {
            headers: {
              Authorization: ` ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  // 🔹 View draft
  const handleViewDraft = (slug) => {
    navigate(`/drafts/${slug}`);
  };

  // 🔹 Download file
  const pdfDownload = async (draftId, type) => {
    try {
      const res = await fetch(
        `${api_url}/api/v1/draft/download/pdf/${draftId}?type=${type}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        },
      );

      if (!res.ok) {
        toast("Download not allowed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `draft.${type}`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast("Download failed");
    }
  };
  const wordDownload = async (draftId, type) => {
    try {
      const res = await fetch(
        `${api_url}/api/v1/draft/download/word/${draftId}?type=${type}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        },
      );

      if (!res.ok) {
        toast("Download not allowed");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `draft.${type}`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast("Download failed");
    }
  };

  return (
    <>
      <Header />

      <Container maxW="6xl" mt={10} pb={20}>
        <Heading mb={6}>My Purchased Drafts</Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : orders.length === 0 ? (
          <Text>No orders found</Text>
        ) : (
          <VStack spacing={5} align="stretch">
            {orders.map((order) => (
              <Box
                key={order._id}
                p={5}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
              >
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg">
                    {order.draft?.title}
                  </Text>

                  <Badge
                    colorScheme={
                      order.paymentStatus === "FREE" ? "green" : "blue"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </HStack>

                {/* <Text mt={2}>Price Paid: ₹{order.amount}</Text> */}

                <HStack mt={4} spacing={3}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewDraft(order.draft.slug)}
                  >
                    View Draft
                  </Button>

                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => pdfDownload(order.draft._id, "pdf")}
                  >
                    Download PDF
                  </Button>

                  <Button
                    size="sm"
                    colorScheme="purple"
                    onClick={() => wordDownload(order.draft._id, "docx")}
                  >
                    Download Word
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </>
  );
};
