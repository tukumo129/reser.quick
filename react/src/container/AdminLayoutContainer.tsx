import { useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

import { Box, Heading, VStack, Button, Divider, IconButton, useBreakpointValue, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { routePath } from "../enums/routePath";
import { useLogoutForm } from "./LogoutFormContainer";

const menuItems = [
  { label: "TOP", path: routePath.Top, icon: <FaHome className="w-7 h-7" /> },
  { label: "予約", path: routePath.Reserves, icon: <FaCalendarAlt className="w-7 h-7" /> },
];

type AdminHeaderContainerProps = {
  onMenuToggle: () => void
}
export const AdminHeaderContainer = ({ onMenuToggle }: AdminHeaderContainerProps) => {
  const navigate = useNavigate();
  const isSidebarOpen = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      bg="white"
      px={6}
      py={4}
      height={16}
      color="black"
      borderBottom="1px solid"
      borderColor="gray.300"
      display="flex"
      alignItems="center"
      shadow="sm"
    >
      <Heading
        flex="1"
        size="lg"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => navigate(routePath.Top)}
        _hover={{ opacity: 0.8 }}
      >
        予約管理アプリ
      </Heading>
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
        display={{ base: "block", md: "none" }}
        onClick={onMenuToggle}
        variant="ghost"
        color="gray.600"
        _hover={{ bg: "gray.100" }}
      />
    </Box>
  );
};

type AdminMenubarContainerProps = {
  isMenuOpen: boolean
}
export const AdminMenubarContainer = ({ isMenuOpen }: AdminMenubarContainerProps) => {
  const navigate = useNavigate();
  const { onSubmit } = useLogoutForm();

  return (
    <Box
      w={{ base: "full", md: "250px" }}
      bg="gray.800"
      color="white"
      display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
      flexDirection="column"
      h={{ base: `calc(100% - 4rem)`, md: "100%" }}
      position={{ base: "absolute", md: "static" }}
      zIndex="dropdown"
    >
      <VStack align="start" spacing={1} flex="1">
        {menuItems.map((item) => (
          <>
            <Button
              key={item.label}
              onClick={() => navigate(item.path)}
              variant="ghost"
              w="100%"
              h="12"
              justifyContent="start"
              color="white"
              fontSize="md"
              fontWeight="medium"
              _hover={{ bg: "gray.700", transform: "scale(1.02)", transition: "0.2s" }}
            >
              <span>{item.icon}</span>
              <Text ml={3}>{item.label}</Text>
            </Button>
            <Divider borderColor="gray.600" />
          </>
        ))}
      </VStack>

      <VStack align="start" spacing={1} mt="auto">
        <Divider borderColor="gray.600" display={{ base: "none", md: "block" }} />

        <Button
          onClick={() => onSubmit()}
          variant="ghost"
          w="100%"
          h="12"
          justifyContent="start"
          fontSize="md"
          fontWeight="medium"
          color="red.400"
          _hover={{ bg: "red.600", color: "white", transform: "scale(1.02)", transition: "0.2s" }}
        >
          <span>
            <FaSignOutAlt className="w-6 h-6" />
          </span>
          <Text ml={3}>ログアウト</Text>
        </Button>

        <Divider borderColor="gray.600" display={{ base: "none", md: "block" }} />

        <Button
          onClick={() => navigate(routePath.Setting)}
          variant="ghost"
          w="100%"
          h="12"
          justifyContent="start"
          fontSize="md"
          fontWeight="medium"
          color="white"
          _hover={{ bg: "gray.700", transform: "scale(1.02)", transition: "0.2s" }}
        >
          <span>
            <FaCog className="w-6 h-6" />
          </span>
          <Text ml={3}>設定</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export const AdminNoLoginHeaderContainer = () => {
  const navigate = useNavigate();

  return (
    <Box bg="white" p={4} height={16} color="black" borderBottom="1px" borderColor="gray.300" display="flex" alignItems="center" justifyContent="space-between">
      <Box onClick={() => navigate(routePath.Login)} cursor="pointer" p={2} >
        <Heading size="lg">予約管理アプリ</Heading>
      </Box>
      <Box onClick={() => navigate(routePath.CreateUser)} cursor="pointer" p={2}>
        ユーザー登録
      </Box>
    </Box>
  );
};