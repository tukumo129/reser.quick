import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/enums/routePath";

type AdminHeaderComponentProps = {
  onMenuToggle: () => void;
};
export const AdminHeaderComponent = ({
  onMenuToggle,
}: AdminHeaderComponentProps) => {
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
