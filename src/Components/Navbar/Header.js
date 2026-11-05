// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  Image,
  VStack,
  Circle,
  useBreakpointValue,
  Collapse,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaFileAlt,
  FaVideo,
  FaNewspaper,
  FaBlog,
  FaQuestionCircle,
} from "react-icons/fa";

import logo from "../Assets/logo/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import DashHeader from "./Headerdashoard";
import MobileFooterNav from "./MobileFooterNav";
import KnowladgeMenu from "./KnowladgeMenu";
const userInfo = JSON.parse(localStorage.getItem("lawvsuserinfo"));
const userId = userInfo?.data?.userData._id;
// const userType = userInfo?.data?.userData.role;
// const token = userInfo?.data?.token;
// Social media links
const socialLinks = [
  { icon: FaFacebookF, url: "https://www.facebook.com/lawvslegalservices" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/lawvs.com/" },
  { icon: FaInstagram, url: "https://www.instagram.com/law_vs/" },
  {
    icon: FaYoutube,
    url: "https://www.youtube.com/channel/UCznIzuaDRopc1wbfisboIVw",
  },
  { icon: FaTwitter, url: "https://x.com/LawvsF" },
];

// ─── JobsMenu ──────────────────────────────────────────────
const JobsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Menu isOpen={isOpen}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="ghost"
          _hover={{ bg: "gray.100" }}
          _expanded={{ bg: "gray.200" }}
        >
          Search Jobs
        </MenuButton>
        <MenuList>
          <MenuItem>
            <ChakraLink as={RouterLink} to={"/get-practice-area"}>
              Jobs By Practice Area
            </ChakraLink>
          </MenuItem>
          <MenuItem>
            {" "}
            <ChakraLink as={RouterLink} to={"/get-law_degrees"}>
              Jobs By Qualification
            </ChakraLink>
          </MenuItem>
          <MenuItem>
            <ChakraLink as={RouterLink} to={"/get-all-jobs"}>
              Browse All Jobs
            </ChakraLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
// ─── knowledge menu ────────────────────────────────────────────

// const MootCourtMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

//   // Dynamically adjust submenu position based on screen size
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   return (
//     <Box
//       onMouseEnter={() => setIsMenuOpen(true)}
//       onMouseLeave={() => {
//         setIsMenuOpen(false);
//         setIsSubmenuOpen(false);
//       }}
//     >
//       <Menu isOpen={isMenuOpen}>
//         <MenuButton
//           as={Button}
//           rightIcon={<ChevronDownIcon />}
//           variant="ghost"
//           _hover={{ bg: "gray.100" }}
//           _expanded={{ bg: "gray.200" }}
//         >
//           Moot Court
//         </MenuButton>

//         <MenuList>
//           {/* Submenu */}
//           <Box
//             position="relative"
//             onMouseEnter={() => setIsSubmenuOpen(true)}
//             onMouseLeave={() => setIsSubmenuOpen(false)}
//           >
//             <MenuItem>
//               INSTRUCTIONS FOR PARTICIPANTS
//               <ChevronRightIcon ml="auto" />
//             </MenuItem>

//             {isSubmenuOpen && (
//               <MenuList
//                 position="absolute"
//                 top={isMobile ? "100%" : "90%"}
//                 left={isMobile ? "30%" : "80%"}
//                 mt={isMobile ? "0" : "-1"}
//                 zIndex="popover"
//                 w="max-content"
//               >
//                 <MenuItem>
//                   <ChakraLink as={RouterLink} to={"/moot-user-signup"}>
//                     REGISTRATION FORM
//                   </ChakraLink>
//                 </MenuItem>
//                 <MenuItem>
//                   <ChakraLink as={RouterLink} to={"/rulesAnd_regulation"}>
//                     RULES AND REGULATIONS OF COMPETITION
//                   </ChakraLink>
//                 </MenuItem>

//                 <MenuItem>
//                   <ChakraLink as={RouterLink} to={"/steps_to_register"}>
//                     STEPS TO REGISTER
//                   </ChakraLink>
//                 </MenuItem>
//                 <MenuItem>
//                   <ChakraLink as={RouterLink} to={"/ask_que_for_team"}>
//                     FAQ FOR TEAM
//                   </ChakraLink>
//                 </MenuItem>
//                 <MenuItem>
//                   <ChakraLink as={RouterLink} to={"/moot_map"}>
//                     MOOT MAP
//                   </ChakraLink>
//                 </MenuItem>
//               </MenuList>
//             )}
//           </Box>
//           <MenuItem>
//             <ChakraLink as={RouterLink} to={"/brochure_&_praposition"}>
//               {" "}
//               BROCHURE{" "}
//             </ChakraLink>
//           </MenuItem>

//           <MenuItem>
//             <ChakraLink as={RouterLink} to={"/organiging_committee"}>
//               ORGANIZING COMMITTEE
//             </ChakraLink>
//           </MenuItem>

//           <MenuItem>
//             <ChakraLink as={RouterLink} to={"/information_for_Judges"}>
//               INFORMATION FOR JUDGES
//             </ChakraLink>
//           </MenuItem>
//           <MenuItem>
//             <ChakraLink as={RouterLink} to={"/askque_for_judges"}>
//               FAQ FOR JUDGES
//             </ChakraLink>
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     </Box>
//   );
// };

// ───--------------- TopHeader ─────────────────────────────────────────────
const TopHeader = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    {...props} //  Pass props to avoid Chakra warnings
    bg="#020202ff"
    color="white"
    px={{ base: 4, md: 8 }}
    py={1}
  >
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      gap={2}
    >
      {/* Contact Info */}
      <HStack spacing={6}>
        <HStack spacing={2}>
          <Link
            href="https://wa.me/8171974067"
            isExternal
            mt="10px"
            _hover={{ textDecoration: "underline" }}
          >
            <Icon as={FaWhatsapp} boxSize={6} m={2} color={"green.500"} />
            8171974067
          </Link>
        </HStack>

        <HStack spacing={2}>
          <Link
            href="mailto:info@lawvs.com"
            mt="10px"
            _hover={{ textDecoration: "underline" }}
          >
            <Icon as={FaEnvelope} boxSize={4} m={2} />
            info@lawvs.com
          </Link>
        </HStack>
      </HStack>

      {/* Buttons */}
      <HStack spacing={3}>
        {userId ? (
          ""
        ) : (
          <>
            <ChakraLink
              as={RouterLink}
              to="/user-auth-login"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              size="sm"
              bg="#ecb24eff"
              color="white"
              borderRadius="full"
              padding={2}
              px={6}
            >
              Login/Register
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/admin-auth-login"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              size="sm"
              bg="#f1b856ff"
              color="white"
              borderRadius="full"
              padding={2}
              px={6}
            >
              Create Opportunity
            </ChakraLink>
          </>
        )}
      </HStack>

      {/* Social Icons */}
      <HStack spacing={3}>
        {socialLinks.map((social, idx) => (
          <Link
            href={social.url}
            isExternal // adds target="_blank" rel="noopener noreferrer"
            key={idx}
            _hover={{ textDecoration: "none" }}
          >
            <Circle
              size="32px"
              bg="#f7b037ff"
              borderRadius="full"
              color="black"
              _hover={{ bg: "blue.500", color: "green" }}
            >
              <Icon as={social.icon} color="white" boxSize={4} />
            </Circle>
          </Link>
        ))}
      </HStack>
    </Flex>
  </Box>
));

// ─── MainHeader ────────────────────────────────────────────
const MainHeader = ({ isMobileNavOpen, toggleMobileNav }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="white"
      px={{ base: 4, md: 8 }}
      py={1}
      boxShadow="2xl"
      position="sticky"
      top="0"
      zIndex="999"
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Logo */}
        <HStack spacing={0} m={0} p={0}>
          <ChakraLink as={RouterLink} to="/">
            <Image
              src={logo}
              alt="Logo"
              height="80px"
              width="200px"
              objectFit="contain"
              m={0}
              p={0}
            />
          </ChakraLink>
        </HStack>

        {/* Navigation */}
        {isMobile ? (
          <>
            <IconButton
              icon={<FaBars />}
              onClick={toggleMobileNav}
              variant="ghost"
              fontSize="20px"
              aria-label="Toggle Navigation"
            />
            {!userId ? (
              <ChakraLink
                as={RouterLink}
                to="/user-auth-login"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                size="sm"
                bg="#ecb24eff"
                color="white"
                borderRadius="full"
                padding={2}
                px={6}
              >
                Login/Register
              </ChakraLink>
            ) : (
              <DashHeader />
            )}
          </>
        ) : (
          <HStack
            spacing={6}
            fontSize="sm"
            fontWeight="medium"
            color="gray.700"
            as="nav"
          >
            {/* <MootCourtMenu /> */}
            <JobsMenu />
            <KnowladgeMenu />
            

            <ChakraLink as={RouterLink} to="/legal-draft">
              Legal Drafts
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/videos-news">
              Videos
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/all-articles">
              Articles
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/all-blogs">
              Blogs
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/all-news">
              News
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/q-and-a">
              Q & A
            </ChakraLink>
          </HStack>
        )}
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer
        placement="left"
        onClose={toggleMobileNav}
        isOpen={isMobileNavOpen}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            bg="gray.200"
            color="white"
            fontWeight="bold"
          >
            <ChakraLink as={RouterLink} to="/">
              <Image
                src={logo}
                alt="Logo"
                height="50px"
                width="200px"
                objectFit="contain"
                m={0}
                p={0}
              />
            </ChakraLink>
          </DrawerHeader>
          <DrawerBody>
            <VStack
              align="stretch"
              spacing={4}
              fontSize="md"
              fontWeight="medium"
              color="gray.700"
              pt={4}
            >
              {/* <MootCourtMenu /> */}
              <JobsMenu />
              <ChakraLink
                as={RouterLink}
                to="/legal-draft"
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                _hover={{ bg: "blue.100", color: "blue.700" }}
              >
                <FaFileAlt style={{ marginRight: "8px" }} />
                <Text>Legal Drafts</Text>
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to="/videos-news"
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                _hover={{ bg: "blue.100", color: "blue.700" }}
              >
                <FaVideo style={{ marginRight: "8px" }} />
                <Text>Videos & News</Text>
              </ChakraLink>

              <ChakraLink
                as={RouterLink}
                to="/q-and-a"
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                _hover={{ bg: "blue.100", color: "blue.700" }}
              >
                <FaQuestionCircle style={{ marginRight: "8px" }} />
                <Text>Q & A</Text>
              </ChakraLink>
              <DashHeader />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

// ─── Header Wrapper  mobile view ────────────────────────────────────────
const Header = () => {
  const [showTopHeader, setShowTopHeader] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const prevScrollY = useRef(0);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > prevScrollY.current && currentY > 100) {
        setShowTopHeader(false);
      } else {
        setShowTopHeader(true);
      }

      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileNavOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      {/* TopHeader hide in mobile view */}
      {!isMobile && (
        <Box
          transform={showTopHeader ? "translateY(0)" : "translateY(-100%)"}
          transition="transform 0.3s ease"
        >
          <TopHeader />
        </Box>
      )}

      <MainHeader
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />

      <MobileFooterNav /> 
    </>
  );
};

export default Header;
