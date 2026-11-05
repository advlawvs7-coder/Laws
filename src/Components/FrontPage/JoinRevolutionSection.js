// JoinRevolutionSection.js
import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  VStack,
  Card,
  CardBody,
} from "@chakra-ui/react";

const JoinRevolutionSection = () => {
  const students = [
    {
      name: "Suryansh Dixit",
      university: "Ganeshi Lal Aggarwal University",
      description:
        "Suryansh Dixit is a dedicated law student at Ganeshi Lal Aggarwal University, Mathura, where he laid a solid foundation for his legal career...",
      imageUrl:
        "https://lawvs.com/media/admin/revolution/1721297341_64a99393ec0439f7f8fe.png",
    },
    {
      name: "Madhav Goswami",
      university: "GLA University",
      description:
        "Meet Madhav Goswami – a trailblazer in the legal arena, renowned for his numerous accolades and triumphs in moot court competitions...",
      imageUrl:
        "https://lawvs.com/media/admin/revolution/1719558678_ab90749576a7355d63c1.png",
    },
    {
      name: "Mehul Bhatnagar",
      university: "Delhi University",
      description:
        "Dive deep into the world of Model United Nations with Mehul Bhatnagar, a distinguished debater and veteran of nearly 40 MUNs...",
      imageUrl:
        "https://lawvs.com/media/admin/revolution/1718887631_d1036c91a9329808b2f5.png",
    },
  ];

  return (
    <Box bg="#f0f8ff" py={12} px={6} textAlign="center">
      <Heading as="h2" size="xl" mb={8} color="goldenrod">
        Join the Revolution
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {students.map((student, index) => (
          <Card
            key={index}
            shadow="md"
            borderRadius="xl"
            overflow="hidden"
            _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Image
                src={student.imageUrl}
                alt={student.name}
                w="100px"
                h="100px"
                borderRadius="full"
                objectFit="cover"
              />
            </Box>

            <CardBody>
              <VStack spacing={3}>
                <Heading as="h3" size="md" color="gray.700">
                  {student.name}
                </Heading>
                <Text fontWeight="bold" color="gray.500">
                  {student.university}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {student.description}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JoinRevolutionSection;
