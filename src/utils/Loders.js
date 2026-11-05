import React from "react";
import { Box, Flex, keyframes } from "@chakra-ui/react";

const dashArray = keyframes`
  0% { stroke-dasharray: 0 1 359 0; }
  50% { stroke-dasharray: 0 359 1 0; }
  100% { stroke-dasharray: 359 1 0 0; }
`;

const dashOffset = keyframes`
  0% { stroke-dashoffset: 365; }
  100% { stroke-dashoffset: 5; }
`;

const LAWVSLoader = () => {
  return (
    <Flex
      justify="center"
      align="center"
      h="100%"
      bgGradient="radial(circle at center, #0d0d1a, #000,)"
    >
      <Flex align="center" gap={4}>
        {/* Gradient Defs */}
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="lawvs-b" x1="0" y1="62" x2="0" y2="2">
              <stop stopColor="#6C63FF" />
              <stop offset="1" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id="lawvs-c" x1="0" y1="62" x2="0" y2="2">
              <stop stopColor="#FF00C8" />
              <stop offset="1" stopColor="#00FFD1" />
            </linearGradient>
            <linearGradient id="lawvs-d" x1="0" y1="62" x2="0" y2="2">
              <stop stopColor="#FFD700" />
              <stop offset="1" stopColor="#FF6B00" />
            </linearGradient>
          </defs>
        </svg>

        {/* L */}
        <Box
          as="svg"
          viewBox="0 0 40 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          w="60px"
          h="60px"
          animation={`${dashArray} 2s ease-in-out infinite, ${dashOffset} 2s linear infinite`}
          filter="drop-shadow(0 0 10px #6c63ff)"
        >
          <path
            d="M10 10L10 40L30 40"
            stroke="url(#lawvs-b)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="360"
          />
        </Box>

        {/* A */}
        <Box
          as="svg"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          w="60px"
          h="60px"
          animation={`${dashArray} 2s ease-in-out infinite, ${dashOffset} 2s linear infinite`}
          filter="drop-shadow(0 0 10px #00d4ff)"
        >
          <path
            d="M22 8L4 42H12L16 34H28L32 42H40L22 8ZM18 28L22 20L26 28H18Z"
            stroke="url(#lawvs-c)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="360"
          />
        </Box>

        {/* W */}
        <Box
          as="svg"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          w="70px"
          h="70px"
          animation={`${dashArray} 2s ease-in-out infinite, ${dashOffset} 2s linear infinite`}
          filter="drop-shadow(0 0 10px #ff00c8)"
        >
          <path
            d="M2 10L10 40L22 20L34 40L42 10"
            stroke="url(#lawvs-d)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="360"
          />
        </Box>

        {/* V */}
        <Box
          as="svg"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          w="60px"
          h="60px"
          animation={`${dashArray} 2s ease-in-out infinite, ${dashOffset} 2s linear infinite`}
          filter="drop-shadow(0 0 10px #00ffcc)"
        >
          <path
            d="M4 10L22 44L40 10"
            stroke="url(#lawvs-b)"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength="360"
          />
        </Box>

        {/* S */}
        <Box
          as="svg"
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          w="60px"
          h="60px"
          animation={`${dashArray} 2s ease-in-out infinite, ${dashOffset} 2s linear infinite`}
          filter="drop-shadow(0 0 10px #ff6b00)"
        >
          <path
            d="M34 15Q30 8 20 8Q10 8 8 15Q8 20 20 24Q32 28 32 36Q32 44 20 44Q10 44 8 38"
            stroke="url(#lawvs-c)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="360"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default LAWVSLoader;
