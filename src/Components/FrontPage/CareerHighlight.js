import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { FaBriefcase, FaFileAlt, FaGraduationCap } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const Counter = ({ end, duration = 2000, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = Math.ceil(end / (duration / 50));
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, 50);

    return () => clearInterval(interval);
  }, [inView, end, duration]);

  return (
    <Text fontSize={{ base: "40px", md: "50px", lg: "60px" }} fontWeight="bold">
      {count}+
    </Text>
  );
};

const CareerHighlight = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Box
      bg="white"
      py={{ base: 8, md: 12, lg: 16 }}
      textAlign="center"
      ref={ref}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        bg="#f0f8ff"
        borderRadius="xl"
        px={{ base: 4, md: 10, lg: 20 }}
        py={{ base: 8, md: 10 }}
        gap={{ base: 6, md: 16, lg: 24 }}
        maxW="7xl"
        mx="auto"
        flexWrap="wrap"
      >
        {/* Item 1 */}
        <Flex direction="column" align="center" gap={3}>
          <Icon
            as={FaBriefcase}
            color="goldenrod"
            boxSize={{ base: 10, md: 12 }}
          />
          <Counter end={1000} inView={inView} />
          <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            Top Law Firms
          </Text>
        </Flex>

        {/* Item 2 */}
        <Flex direction="column" align="center" gap={3}>
          <Icon
            as={FaFileAlt}
            color="goldenrod"
            boxSize={{ base: 10, md: 12 }}
          />
          <Counter end={100} inView={inView} />
          <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            Legal Drafts
          </Text>
        </Flex>

        {/* Item 3 */}
        <Flex direction="column" align="center" gap={3}>
          <Icon
            as={FaGraduationCap}
            color="goldenrod"
            boxSize={{ base: 10, md: 12 }}
          />
          <Counter end={100} inView={inView} />
          <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            Mock Exam For Preparation
          </Text>
        </Flex>
      </Flex>

      <Button
        mt={{ base: 6, md: 8 }}
        colorScheme="red"
        bg="red.500"
        color="white"
        px={{ base: 6, md: 10 }}
        py={{ base: 4, md: 6 }}
        fontWeight="bold"
        fontSize={{ base: "md", md: "lg" }}
        _hover={{ bg: "red.700" }}
        boxShadow="md"
      >
        CAREER WITH US :
      </Button>
    </Box>
  );
};

export default CareerHighlight;
