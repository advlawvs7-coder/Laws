import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  Text,
  Divider,
  Flex,
  List,
  ListItem,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { SearchBox } from "./SearchBox";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddQuestionPage from "./AddQue";
import axios from "axios";
import * as mod from "../../../url";
import Header from "../../Navbar/Header";
import { MdInsertComment } from "react-icons/md";
import { GiFrayedArrow } from "react-icons/gi";
import LAWVSLoader from "../../../utils/Loders";
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
export const QAndA = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // store answers by question id
  const [activeCommentBoxId, setActiveCommentBoxId] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const userId = userInfo?.data?.userData._id;
  const userType = userInfo?.data?.userData.role;
  // console.log(filteredQuestions, "filteredQuestions");

  const handleLikeAnswer = async (Qid, AnsId) => {
    if (!userId) {
      toast({
        title: "Please login",
        description: "You need to login to like an answer.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${mod.api_url}/api/v1/question/questions/${Qid}/answers/${AnsId}/like`,
        { userId, userType }
      );

      toast({
        title: data.message || "Action completed",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === Qid
            ? {
                ...q,
                answers: q.answers.map((ans) =>
                  ans.id === AnsId
                    ? {
                        ...ans,
                        likes: ans.likes.includes(userId)
                          ? ans.likes.filter((id) => id !== userId) // unlike
                          : [...ans.likes, userId], // like
                      }
                    : ans
                ),
              }
            : q
        )
      );

      setFilteredQuestions((prev) =>
        prev.map((q) =>
          q.id === Qid
            ? {
                ...q,
                answers: q.answers.map((ans) =>
                  ans.id === AnsId
                    ? {
                        ...ans,
                        likes: ans.likes.includes(userId)
                          ? ans.likes.filter((id) => id !== userId)
                          : [...ans.likes, userId],
                      }
                    : ans
                ),
              }
            : q
        )
      );
    } catch (error) {
      toast({
        title: "Failed to like answer",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // const hasLiked = answers.likes?.some((like) => like.id === userId);

  const handleSubmitComment = async (Qid, AnsId, text) => {
    if (!text) return;
    try {
      await axios.post(
        `${mod.api_url}/api/v1/question/questions/${Qid}/answers/${AnsId}/comments`,
        { text, userId, userType }
      );
      toast({ title: "Comment submitted successfully", status: "success" });
      setCommentTexts((prev) => ({ ...prev, [AnsId]: "" })); // clear only that one
      fetchData();
    } catch (error) {
      toast({ title: "Failed to submit comment", status: "error" });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: categoryData } = await axios.get(
        `${mod.api_url}/api/v1/category/get_all_category`
      );
      setCategories(categoryData);

      // Fetch questions
      const { data: questionData } = await axios.get(
        `${mod.api_url}/api/v1/question/get_all_questions`
      );

      const mappedData = questionData.map((item) => ({
        id: item._id,
        question: item.que,
        slug: item.slug,
        postedBy: item.postedBy?.id?.fullName || "Unknown",
        answers: (item.answers || []).map((ans) => ({
          id: ans._id,
          text: ans.text,
          postedBy:
            ans.postedBy?.fullName || ans.postedBy?.id?.fullName || "Unknown", // ✅ string only
          createdAt: ans.createdAt,
          comments: (ans.comments || []).map((c) => ({
            id: c._id,
            text: c.text,
            postedBy:
              c.postedBy?.fullName || c.postedBy?.id?.fullName || "Unknown",
            createdAt: c.createdAt,
          })),
          likes: ans.likes || [],
        })),
        answerCount: item.answers?.length || 0,
        category:
          categoryData.find((cat) => cat._id === item.category)?.name ||
          "Unknown",
      }));

      setQuestions(mappedData);
      if (selectedCategory && selectedCategory !== "All") {
        setFilteredQuestions(
          mappedData.filter(
            (q) => q.category?.toLowerCase() === selectedCategory.toLowerCase()
          )
        );
      } else {
        setFilteredQuestions(mappedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter by category
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(
        questions.filter((q) => q.category?.toLowerCase() === cat.toLowerCase())
      );
    }
  };

  // Submit your answer
  const handleSubmit = async (id) => {
    if (!userId) {
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
      setLoading(true);
      await axios.post(`${mod.api_url}/api/v1/question/add/${id}/answers`, {
        text: answers[id],
        userId,
        userType,
      });

      toast({
        title: "Answer submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchData();
      setAnswers((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      toast({
        title: "Failed to submit answer",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Share handler
  const handleShare = (que, answ) => {
    const shareUrl = `${window.location.origin}/questions/${que}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this answer",
          text: answ,
          url: shareUrl,
        })
        .catch((err) => console.log("Share cancelled:", err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Answer link copied to clipboard ✅");
    }
  };

  // if current user is inclued in answers likes array then he already liked

  if (loading) {
    return <LAWVSLoader />;
  }

  return (
    <>
      <Header />
      <Container maxW="7xl" py={10}>
        <Flex gap={6} align="center" justify="space-between" mb={6}>
          <Heading>Questions & Answers</Heading>

          <Box color="goldenrod">
            <AddQuestionPage />
          </Box>
        </Flex>

        <Flex gap={6}>
          {/* LEFT COLUMN - Categories */}
          <Box
            textAlign="justify"
            display={{ base: "none", md: "block" }} // 👈 mobile me hide, md+ pe show
            w={{ md: "20%" }}
          >
            <Heading size="md" mb={4} color="goldenrod">
              Top Questions Categories
            </Heading>
            <List spacing={3}>
              {categories &&
                categories.map((cat, idx) => (
                  <ListItem
                    key={idx}
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedCategory === cat.name ? "goldenrod" : "gray.50"}
                    color={selectedCategory === cat?.name ? "white" : "blue"}
                    _hover={{ bg: "goldenrod", color: "white" }}
                    onClick={() => handleCategoryClick(cat.name)}
                  >
                    {cat?.name}
                  </ListItem>
                ))}
            </List>
          </Box>

          {/* RIGHT COLUMN - Q&A */}
          <Box
            flex="1"
            w={{ base: "100%", md: "80%" }} //  mobile pe full width, md+ pe 70%
            p={4}
            borderWidth="1px"
            borderRadius="md"
          >
            <SearchBox
              questions={questions}
              setFilteredQuestions={setFilteredQuestions}
            />

            <VStack align="stretch" spacing={6}>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q) => (
                  <Box
                    key={q.id}
                    // cursor="pointer"
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
                    borderLeft="4px solid goldenrod"
                  >
                    <Text
                      fontWeight="bold"
                      mb={2}
                      align="left"
                      color="#762d00"
                      noOfLines={2}
                      onClick={() => navigate(`/q-and-a/${q.slug}`)}
                      cursor="pointer"
                      display={"flex"}
                    >
                      <GiFrayedArrow /> &nbsp;Q. &nbsp;
                      {q?.question}
                    </Text>
                    <Text fontSize="sm" color="black" mb={2} align="left">
                      <b>Posted by</b> {q?.postedBy}
                    </Text>
                    <Heading
                      as="h4"
                      size="sm"
                      mb={2}
                      color="goldenrod"
                      align="left"
                    >
                      Answer
                    </Heading>

                    {/* answers start here........ */}
                    {Array.isArray(q?.answers) && q?.answers?.length > 0 ? (
                      q?.answers.map((answer, i) => {
                        const likeUserIds =
                          answer?.likes?.map((likeId) =>
                            likeId?.id
                              ? likeId.id.toString()
                              : likeId.toString()
                          ) || [];

                        const hasLikedUser = likeUserIds.includes(userId);

                        const isCommentBoxOpen =
                          activeCommentBoxId === answer.id;
                        return (
                          <React.Fragment key={answer.id || i}>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              mb={1}
                              pl={2}
                              borderLeft="4px solid #762d00"
                              bg={i % 2 === 0 ? "gray.50" : "white"}
                              borderRadius="md"
                              p={5}
                              textAlign="justify"
                            >
                              {answer?.text}
                              <Text
                                fontSize="sm"
                                color="black"
                                m={2}
                                align="right"
                              >
                                Answered by{" "}
                                <b color="#dd5806ff">{answer?.postedBy}</b>
                              </Text>
                            </Text>

                            {/* <Divider my={2} /> */}

                            <Flex
                              w="100%"
                              // justifyContent="flex-end" //sabko right align
                              align="center"
                              flexWrap="wrap"
                              gap={3}
                              m={3}
                              p={1}
                            >
                              {/*  Like Button */}
                              <Text
                                as="span"
                                fontSize="sm"
                                color={hasLikedUser ? "white" : "gray.600"}
                                bg={hasLikedUser ? "blue.500" : "gray.300"}
                                px={3}
                                py={1}
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                cursor="pointer"
                                onClick={() =>
                                  handleLikeAnswer(q.id, answer.id)
                                }
                              >
                                {answer?.likes?.length || 0} <AiOutlineLike />
                              </Text>

                              {/*  Share */}
                              <Text
                                as="span"
                                fontSize="sm"
                                color="gray.600"
                                bg="gray.300"
                                px={3}
                                py={1}
                                borderRadius="md"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                cursor="pointer"
                                onClick={() =>
                                  handleShare(q?.slug, answer?.text)
                                }
                              >
                                Share <IoIosShareAlt />
                              </Text>

                              {/*  Comments */}
                              <Box
                                flex="1 1 auto"
                                maxW={{ base: "100%", md: "600px" }}
                              >
                                <Text
                                  fontSize={{ base: "sm", md: "md" }}
                                  as="span"
                                  color="blue.600"
                                  px={2}
                                  py={1}
                                  borderRadius="md"
                                  display="flex"
                                  alignItems="center"
                                  gap={1}
                                  cursor="pointer"
                                  onClick={() =>
                                    setActiveCommentBoxId(
                                      isCommentBoxOpen ? null : answer.id
                                    )
                                  }
                                  userSelect="none"
                                >
                                  {answer?.comments?.length || 0} comments{" "}
                                  <MdInsertComment />
                                </Text>

                                {isCommentBoxOpen && (
                                  <Flex
                                    mt={2}
                                    gap={2}
                                    flexDirection={{
                                      base: "column",
                                      sm: "row",
                                    }}
                                    alignItems={{
                                      base: "stretch",
                                      sm: "center",
                                    }}
                                  >
                                    <Textarea
                                      placeholder="Write your comment..."
                                      value={commentTexts[answer?.id] || ""}
                                      onChange={(e) =>
                                        setCommentTexts((prev) => ({
                                          ...prev,
                                          [answer?.id]: e.target.value,
                                        }))
                                      }
                                    />
                                    <Button
                                      colorScheme="blue"
                                      size="sm"
                                      onClick={() =>
                                        handleSubmitComment(
                                          q.id,
                                          answer.id,
                                          commentTexts[answer.id]
                                        )
                                      }
                                    >
                                      Submit
                                    </Button>
                                  </Flex>
                                )}
                              </Box>

                              {/* Login check */}
                              {!userId && (
                                <Text fontSize="sm" color="gray.500" ml="auto">
                                  Please login to submit an answer.
                                </Text>
                              )}
                            </Flex>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        fontStyle="italic"
                        mb={2}
                      >
                        No answers yet.
                      </Text>
                    )}

                    {/* Answer input */}
                    <Box
                      margin="0px"
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      marginTop="10px"
                    >
                      <Textarea
                        placeholder="Submit your answer"
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        mt={1}
                        colorScheme="yellow"
                        onClick={() => handleSubmit(q.id)}
                        isLoading={loading}
                      >
                        Submit Answer
                      </Button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text>No questions found.</Text>
              )}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};
