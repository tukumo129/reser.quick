import { useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaCog } from "react-icons/fa";

import { Box, Heading, VStack, Button, Divider, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { routePath } from "../enums/routePath";

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
    <Box bg="white" p={4} height={16} color="black" borderBottom="1px" borderColor="gray.300" display="flex" alignItems="center">
      <Heading flex="1" size="lg" onClick={() => navigate(routePath.Top)}>予約管理アプリ</Heading>
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
        display={{ base: 'block', md: 'none' }}
        onClick={onMenuToggle}
      />
    </Box>
  );
};

type AdminMenubarContainerProps = {
  isMenuOpen: boolean
}
export const AdminMenubarContainer = ({ isMenuOpen }: AdminMenubarContainerProps) => {
  const navigate = useNavigate();
  return (
    <Box
      w={{ base: 'full', md: '250px' }}
      bg="yellow.300"
      borderRight="1px"
      borderColor="gray.300"
      display={{ base: isMenuOpen ? 'flex' : 'none', md: 'flex' }}
      flexDirection="column"
      h={{ base: `calc(100% - 4rem)`, md: '100%' }}
      position={{ base: 'absolute', md: 'static' }}
      zIndex="dropdown"
    >
      <VStack align="start" spacing={0}>
        {menuItems.map((item) => (
          <>
            <Button
              onClick={() => navigate(item.path)}
              variant="ghost"
              w="100%"
              h="12"
              justifyContent="start"
              colorScheme="yellow"
              color="black">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Button>
            <Divider borderColor="gray.500" />
          </>
        ))}
      </VStack>
      <Box mt="auto">
        <Divider borderColor="gray.500" display={{ base: 'none', md: 'block' }} />
        <Button
          variant="ghost"
          w="100%"
          h="12"
          justifyContent="start"
          colorScheme="yellow"
          color="black"
          onClick={() => navigate(routePath.Setting)}
          display="flex"
          alignItems="center"
        >
          <span><FaCog className="w-7 h-7" /></span>
          <span>設定</span>
        </Button>
      </Box>
    </Box>
  );
};