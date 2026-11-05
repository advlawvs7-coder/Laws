import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Stack,
  Container,
} from "@chakra-ui/react";
const imge = require("../Assets/lawsImage/librarywebinar.jpg");

export default function LibraryWebinarPage() {
  return (
    <Container py={12} maxW="container.xl">
      <Image
        src={imge}
        alt="Lady Justice"
        w="100%" // full width of container
        h={{ base: "40vh", md: "60vh" }} // responsive height
        objectFit="cover" // maintain aspect ratio and cover container
        borderRadius="md" // optional rounded corners
      />
      {/* </Container> */}

      {/* <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={8}
      >
        <Box
          bg="gray.900"
          color="white"
          borderRadius="md"
          p={8}
          flex="1"
          textAlign="left"
        >
          <Heading size="md" mb={4}>
            SIGN UP TO <span style={{ color: "#FFD700" }}>LAWVS LIBRARY</span>!
          </Heading>
          <VStack align="start" spacing={3}>
            <Text>• Range of Study Material to upskill yourself</Text>
            <Text>• Previous Year Question-Papers</Text>
            <Text>• Interviews, Law Decoded & much more…</Text>
          </VStack>
          <Image
            src="/images/lady-justice.png"
            alt="Lady Justice"
            mt={4}
            w="100px"
          />
        </Box>

        <Box flexShrink={0}>
          <Image
            src="/images/qr-code.png"
            alt="QR Code"
            w="150px"
            borderRadius="md"
          />
        </Box>

        <Box
          bg="gray.900"
          color="white"
          borderRadius="md"
          p={8}
          flex="1"
          textAlign="left"
        >
          <Heading size="md" mb={4}>
            WEBINAR
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" mb={2}>
            Series of Masterclass
          </Text>
          <Text mb={4}>
            Webinars have proven to be an effective way to position yourself.
            It allows you to interact with your community and real prospects.
          </Text>
          <Image
            src="/images/webinar-live.png"
            alt="Live Webinar"
            w="120px"
          />
        </Box>
      </Flex> */}
    </Container>
  );
}
