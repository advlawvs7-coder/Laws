import axios from "axios";
import React, { useEffect, useState } from "react";
import * as mod from "../../../../url";
import {
  Box,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Divider,
  useToast,
  Button,
  Flex,
  Stack,
  SimpleGrid,
  Center,
  Img,
  Toast,
} from "@chakra-ui/react";
import { CalendarIcon, AtSignIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Header from "../../../Navbar/Header";
import Footer from "../../../Navbar/Footer";
import { Spinnernew } from "../../../spiner";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import logo from "./../../../Assets/logo/logo.png"; // Adjust the path as necessary
import { IoLocation } from "react-icons/io5";
// social share buttons
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import LAWVSLoader from "../../../../utils/Loders";
// import { CiLocationOn } from "react-icons/ci";

export const SingleJobPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const toast = useToast();
  const { id } = useParams();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  // console.log(id, "jobid");
  const getJobById = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-job-byId/${id}`
      );
      if (data) {
        setJob(data.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching job",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // job URL for sharing
  const shareUrl = window.location.href;

  // fetch similar jobs
  const fetchSimilarJobs = async () => {
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/job/get-similar-jobs/${id}`
      );
      if (data) {
        setJobs(data.data);
      }
    } catch (error) {
      Toast({
        title: "Error fetching jobs",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchAppliedJobs = async () => {
    if (!userId) return;
    try {
      const { data } = await axios.get(
        `${mod.api_url}/api/v1/user/user/applied-jobs/${userId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      // console.log(data, "data");
      if (data.success) {
        setAppliedJobs(data.appliedJobs);
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };
  useEffect(() => {
    getJobById();
    fetchSimilarJobs();
    fetchAppliedJobs();
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top
  }, [id]);

  const applyJobByUser = async (jobId, adminId) => {
    if (!userId || !token) {
      toast({
        title: "Please login",
        description: "You need to login before applying for a job.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${mod.api_url}/api/v1/user/job-apply/${jobId}/${userId}`,
        { adminId },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Job applied successfully",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      toast({
        title: "Application failed",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!job) {
    return (
      <Flex justify="center" align="center" minH="80vh">
        <Text fontSize="xl" color="gray.600">
          Job not found
        </Text>
      </Flex>
    );
  }
  if (loading) {
    return <LAWVSLoader />;
  }
  return (
    <>
      <Header />

      <Box px={{ base: 4, md: 16 }} py={10}>
        {/* Job Title & Status */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          mb={4}
        >
          <Heading
            as="h2"
            size="xl"
            color="yellow.700"
            borderBottom="3px solid"
            borderColor="yellow.600"
            w="fit-content"
            mb={{ base: 2, md: 0 }}
          >
            {job?.title}
          </Heading>

          <Badge
            colorScheme={job?.status === "Active" ? "green" : "red"}
            fontSize="md"
            px={4}
            py={1}
            borderRadius="lg"
          >
            {job?.status}
          </Badge>
        </Flex>

        <HStack
          spacing={6}
          flexWrap="wrap"
          align="center"
          color="gray.700"
          fontWeight="medium"
          mb={4}
        >
          <Text fontSize="lg">
            <AtSignIcon mr={2} />
            {job?.company}
          </Text>
          <Text fontSize="lg">
            <CalendarIcon mr={2} />
            Deadline: {new Date(job?.deadline).toLocaleDateString()}
          </Text>
          <Text fontSize="lg">
            <IoLocation
              style={{ display: "inline", marginRight: "6px", color: "blue" }}
            />
            {job?.state} ,
          </Text>
          <Text fontSize="lg">
            {/* <CiLocationOn style={{ display: "inline", marginRight: "6px" }} /> */}
            {job?.city}
          </Text>
        </HStack>

        {/* Share Section */}
        <Box mt={2} mb={4}>
          <HStack spacing={3}>
            <Text fontWeight="semibold">Share this job:</Text>
            <FacebookShareButton url={shareUrl} quote={job?.title}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={job?.title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={job?.title}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title={job?.title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </HStack>
        </Box>

        {/* Action Buttons */}
        <Flex justify="flex-end" mt={4} gap={4}>
          <Button px={1}>
            {appliedJobs.includes(job._id) ? (
              <Button flex="1" px={6}>
                Applied
              </Button>
            ) : (
              <Button
                flex="1"
                colorScheme="yellow"
                px={6}
                onClick={() => applyJobByUser(job._id, job.adminId)}
              >
                Apply Now
              </Button>
            )}
          </Button>
          <Button
            as={Link}
            to="/get-all-jobs"
            variant="outline"
            colorScheme="yellow"
          >
            Back to Jobs
          </Button>
        </Flex>

        <Divider my={6} />

        {/* Job Details + Description */}
        <Stack
          direction={{ base: "column", md: "row" }} // mobile: column, desktop: row
          spacing={8}
          // align="start"
          mt={6}
        >
          {/* Details */}
          <VStack
            spacing={0} // 👈 spacing 0, ताकि bg lines connected दिखें
            fontSize="md"
            color="gray.700"
            w="full"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="md"
            shadow="sm"
            align="stretch"
            overflow="hidden"
          >
            <Heading
              size="md"
              py={3}
              textAlign="center"
              bg="yellow.50"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              Job Details
            </Heading>

            {[
              { label: "Job Type", value: job?.jobType },
              { label: "Work Mode", value: job?.workMode },
              { label: "Industry", value: job?.industry },
              { label: "Experience Required", value: job?.experienceRequired },
              { label: "Openings", value: job?.openings },
              { label: "Salary Range", value: job?.salaryRange },
              { label: "Interview Method", value: job?.interviewMethod },
              {
                label: "Skills Required",
                value: job?.skillsRequired?.join(", ") || "Not specified",
              },
            ].map((item, i) => (
              <Flex
                key={i}
                justify="space-between"
                w="100%"
                px={4}
                py={2}
                bg={i % 2 === 0 ? "gray.50" : "white"} // 👈 alternate background
              >
                <Text fontWeight="semibold">{item.label}:</Text>
                <Text textAlign="right">{item.value}</Text>
              </Flex>
            ))}
          </VStack>

          {/* Description */}
          <Box
            w="full"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={4}
            shadow="sm"
            minHeight="450px"
          >
            <Heading
              size="md"
              py={3}
              textAlign="center"
              bg="yellow.50"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              Job Description
            </Heading>
            <ReactQuill
              value={job?.description}
              readOnly
              theme="bubble"
              className="custom-quills"
            />
          </Box>
        </Stack>
      </Box>
      {/* // similar jobs */}
      <Box px={{ base: 4, md: 16 }} py={12}>
        <Flex justifyContent="space-between">
          <Heading as="h2" size="lg" color="yellow.700" w="fit-content">
            Similar Jobs
          </Heading>
          <Button
            as={Link}
            to="/get-all-jobs"
            size="sm"
            color="yellow.700"
            w="fit-content"
            p={2}
            variant="outline"
          >
            View All Jobs
          </Button>
        </Flex>
        <Divider />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {jobs?.map((job, index) => (
            <Box
              key={index}
              bg="white"
              rounded="xl"
              borderWidth="1px"
              shadow="md"
              p={6}
              textAlign="center"
            >
              <Center mb={1}>
                <Img
                  src={logo}
                  alt={job?.name}
                  boxSize="100px" // yaha size control hoga
                  objectFit="contain"
                />
              </Center>

              <Text fontSize="lg" fontWeight="medium">
                {job?.title}
              </Text>

              <VStack
                spacing={1}
                mt={3}
                fontSize="sm"
                color="gray.700"
                fontWeight="semibold"
              >
                <Text>
                  <Text as="span" color="gray.500">
                    experience:
                  </Text>{" "}
                  {job?.experienceRequired}
                </Text>
                <Flex>
                  <IoLocation color="blue" size="20px" /> location:{" "}
                  {job?.location}
                </Flex>
                <Text>
                  <Text as="span" color="gray.500">
                    CTC:
                  </Text>{" "}
                  {job?.salaryRange} |{" "}
                  <Text as="span" color="gray.500">
                    Skills:
                  </Text>{" "}
                  {job?.skillsRequired}
                </Text>
              </VStack>
              <Flex justify="space-between" gap={2}>
                <Button
                  flex="1"
                  size="sm"
                  colorScheme="yellow"
                  as={Link}
                  to={`/get-single-job/details/${job._id}`}
                >
                  View Details
                </Button>

                {appliedJobs.includes(job._id) ? (
                  <Button
                    flex="1"
                    size="sm"
                    colorScheme="gray"
                    variant="solid"
                    disabled
                  >
                    Applied
                  </Button>
                ) : (
                  <Button
                    flex="1"
                    size="sm"
                    colorScheme="green"
                    variant="solid"
                    onClick={() => applyJobByUser(job._id, job.adminId)}
                  >
                    Apply Now
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Footer />
    </>
  );
};
