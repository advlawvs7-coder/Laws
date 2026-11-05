import React from "react";
import Header from "../Navbar/Header";
import {
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Flex,
  VStack,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import Footer from "../Navbar/Footer";
const image = require("./../Assets/lawsImage/vision.jpeg");
const image1 = require("./../Assets/lawsImage/mission.jpg");
export const Aboutus = () => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  return (
    <>
      <Header />
      <Box
        w="100%"
        minH={{ base: "15vh", md: "40vh", lg: "60vh" }}
        bgImage="url('https://lawvs.com/public/lawvs/assets/images/law-banner.png')"
        bgRepeat="no-repeat"
        bgSize={{ base: "contain", md: "cover" }}
        bgPosition="center"
        bgColor="black"
        display="flex"
        alignItems="center"
        px={{ base: 4, md: 12, lg: 20 }}
      >
        <Box
          maxW={{ base: "full", md: "lg", lg: "2xl" }}
          textAlign={{ base: "left", md: "left" }}
          color="white"
        >
          {/* Heading */}
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            mb={6}
            lineHeight="1.3"
            textAlign="left" // 🔹 Always left aligned
          >
            Law Internship
          </Heading>

          {/* Search Box (Responsive) */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={0}
            bg="white"
            borderRadius="full"
            overflow="hidden"
            maxW="full"
            alignItems="center"
            mt={{ base: 6, md: 12 }}
          ></Stack>
        </Box>
      </Box>
      <Box
        bg={bg}
        px={{ base: 4, md: 16 }}
        py={{ base: 8, md: 16 }}
        textAlign={"left"}
        mx="auto"
        alignItems={"justify"}
        mb={0}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={10}
        >
          {/* Text Section */}
          <VStack align="flex-start" spacing={6} flex="1">
            <Heading
              as="h2"
              size="xl"
              color="teal.600"
              borderBottom="2px solid teal"
            >
              OUR VISION
            </Heading>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Objective:
              </Text>
              <Text color={textColor} textAlign={"justify"}>
                The goal of our effort is to build a complete and efficient
                ecosystem that benefits all legal industry players.
              </Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2}>
                Reducing the Burden on Legal Interns:
              </Text>
              <Text color={textColor} textAlign={"justify"}>
                We recognise the difficulties that legal interns experience when
                looking for internships in their immediate area. Our main goal
                is to relieve this load by creating a centralised platform that
                links law students with appropriate internship opportunities. We
                hope to make it simpler for aspiring legal professionals to
                acquire useful practical experience by simplifying the
                internship search process.
              </Text>
            </Box>
          </VStack>

          {/* Image Section */}
          <Box flex="1" display="flex" textAlign={"justify"}>
            <Image
              src={image}
              alt="Vision"
              borderRadius="xl"
              shadow="md"
              maxH="400px"
              objectFit="cover"
            />
          </Box>
        </Flex>
        <Box
          mx="auto"
          p={{ base: 4, md: 8 }}
          bg="white"
          textAlign={"justify"}
          mt={0}
        >
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading as="h3" size="md" mb={3} fontWeight={700}>
                Simplified Employment Opportunities:
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                In addition to assisting law students in finding internships,
                our platform aims to create a simplified process for individuals
                to explore employment opportunities in their selected area of
                specialisation. We think that by linking job seekers with firms
                and organisations seeking legal experts, we can improve the
                efficiency of the legal employment market.
              </Text>
            </Box>

            <Box>
              <Heading as="h3" size="md" mb={3} fontWeight={700}>
                Enhancing the Legal Domain:
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                Our ultimate objective is to strengthen and expand the legal
                domain in India. We attempt to bring together all of the
                necessary materials for people considering a career in law. We
                create a synergistic atmosphere that fosters cooperation,
                information exchange, and career progression by bringing
                together law students, legal clerks, corporations, and activists
                on our platform.
              </Text>
            </Box>

            <Box>
              <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                Join us on this unified platform and be a part of the legal
                profession's future in India. We can all work together to make
                the legal community stronger and more lively.
              </Text>
            </Box>
          </VStack>
        </Box>
        <Box
          // maxW="1100px"
          mx="auto"
          py={{ base: 8, md: 16 }}
          px={{ base: 4, md: 8 }}
          bg="white"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={{ base: 8, md: 10 }}
          >
            {/* Left side image */}
            <Box flex="1">
              <Image
                src={image1}
                alt="Our Mission"
                borderRadius="md"
                boxShadow="md"
                w="100%"
                objectFit="cover"
              />
            </Box>

            {/* Right side content */}
            <Box flex="1">
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                color="gray.800"
                mb={2}
                textAlign={"left"}
              >
                OUR MISSION
              </Heading>
              <Divider
                borderColor="yellow.500"
                borderWidth="2px"
                mb={4}
                w="60px"
              />

              <VStack align="stretch" spacing={4}>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.700"
                  lineHeight="tall"
                  textAlign={"justify"}
                >
                  Our platform is intended to give complete help to those in the
                  legal profession. We aspire to improve communication and
                  collaboration among attorneys, advocates, counsels, legal
                  firms, corporations, and law interns. We hope to improve the
                  efficiency and efficacy of legal services by cultivating a
                  connected legal community.
                </Text>

                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.700"
                  lineHeight="tall"
                  textAlign={"justify"}
                >
                  We recognize the difficulties that prior law students and
                  practitioners have faced. As a result, our platform is
                  dedicated to reducing these issues by providing essential
                  information and help. Whether you're a law student searching
                  for advice or a seasoned practitioner looking for professional
                  development opportunities, our website is here to help you
                  every step of the way.
                </Text>
              </VStack>
            </Box>
          </Flex>
          <Box
            mx="auto"
            p={{ base: 4, md: 8 }}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            textAlign={"justify"}
          >
            <VStack align="stretch" spacing={4}>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                color="gray.700"
              >
                We believe in offering autonomy to law students, career
                searchers, and internship seekers in the legal area. Individuals
                can exercise their preferences and options when it comes to
                hiring legal practitioners by visiting our website. Our powerful
                filtering system allows visitors to refine their search based on
                specified criteria, offering a smooth and personalised
                experience.
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                color="gray.700"
              >
                Furthermore, we provide a platform for companies to publish
                career or internship opportunities in the legal profession.
                Organisations can use our website to connect with skilled and
                ambitious individuals who are actively seeking opportunities in
                the legal profession. Our user-friendly interface streamlines
                the process of publishing and updating job or internship ads,
                allowing companies to quickly identify qualified individuals.
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                color="gray.700"
              >
                We are dedicated to establishing a dynamic and friendly legal
                community on our law website. We think that through allowing
                efficient communication, cooperation, and empowerment, we can
                help the legal profession as a whole grow and succeed.
              </Text>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="tall"
                color="gray.700"
              >
                Explore our website today to get the benefits of a dynamic
                platform committed to servicing the legal community's
                requirements.
              </Text>
            </VStack>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};
