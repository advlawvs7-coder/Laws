import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const AdminjobInfo = localStorage.getItem("lawvsadmininfo");
  const parsedUserInfo = JSON.parse(AdminjobInfo);
  const adminId = parsedUserInfo?.data?.id;
  const token = parsedUserInfo?.token;
  const SIDEBAR_WIDTH = "250px";
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // per page users

  const fetchUsers = async (currentPage = 1) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/get_all_users?page=${currentPage}&limit=${limit}`,
        config,
      );

      setUsers(data?.users);
      setTotalPages(data?.totalPages || 1); // backend se totalPages aana chahiye
      setPage(currentPage);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response?.data || error.message,
      );
      toast({
        title: "Error fetching users.",
        description: error.response?.data?.message || "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const blockUser = async (_id) => {
    confirmAlert({
      title: "Confirm to block",
      message: "Are you sure you want to block this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              // Make the PUT request to block the user
              await axios.put(
                `${mod.api_url}/api/auth/user/user/${_id}/block`,
                {},
                config,
              );

              // Update the users state
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === _id ? { ...user, blocked: true } : user,
                ),
              );

              // Display success toast notification
              toast({
                title: "User blocked successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } catch (error) {
              // Display error toast notification with proper error message
              toast({
                title: "Error blocking user.",
                description:
                  error.response?.data?.message || "Something went wrong!",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if 'No' is clicked
          },
        },
      ],
    });
  };

  const unblockUser = async (_id) => {
    confirmAlert({
      title: "Confirm to unblock",
      message: "Are you sure you want to unblock this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
              const response = await axios.put(
                `${mod.api_url}/api/auth/user/user/${_id}/unblock`,
                {},
                config,
              );
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === _id ? { ...user, blocked: false } : user,
                ),
              );
              toast({
                title: `User unblocked successfully.`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } catch (error) {
              toast({
                title: "Error updating user status.",
                description:
                  error.response?.data?.message || "Something went wrong!",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            // Do nothing if 'No' is clicked
          },
        },
      ],
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mt="100px" ml={{ base: 0, md: SIDEBAR_WIDTH }} p={6}>
        <Heading
          size="md"
          backgroundColor="yellow.300"
          p={3}
          borderRadius="50px"
        >
          All Users
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {users?.map((user, index) => (
            <GridItem key={index} w="100%">
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <VStack align="stretch">
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <Text fontWeight="bold">{user.firstName}</Text>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <Text fontWeight="bold">{user.lastName}</Text>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <Text fontWeight="bold">{user.mobile}</Text>
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <Text>Role: {user.role}</Text>
                    </div>
                  </div>
                  <Text>Email: {user.email}</Text>
                  {/* <Button>Status: {user.isBlocked ? "Blocked" : "Active"}</Button>
                <Button
                  colorScheme={user.isBlocked ? "green" : "red"}
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button> */}
                  {user.blocked === false ? (
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={() => blockUser(user._id)}
                      >
                        Block
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => unblockUser(user._id)}
                      >
                        Unblock
                      </button>
                    </>
                  )}
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Flex justify="center" mt={8} gap={2} wrap="wrap">
            <Button
              size="sm"
              onClick={() => setPage((prev) => prev - 1)}
              isDisabled={page === 1}
            >
              Prev
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                bg={page === i + 1 ? "#720e04" : "gray.200"}
                color={page === i + 1 ? "white" : "black"}
                _hover={{
                  bg: page === i + 1 ? "#720e04" : "gray.300",
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
              isDisabled={page === totalPages}
            >
              Next
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default AllUsers;
