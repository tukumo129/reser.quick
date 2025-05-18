import { Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import { FaCalendarAlt, FaCog, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserLogoutForm } from "./userLogoutFormContainer";
import { routePath } from "@/enums/routePath";

const menuItems = [
  { label: "TOP", path: routePath.Top, icon: <FaHome className="w-7 h-7" /> },
  {
    label: "予約",
    path: routePath.Reserves,
    icon: <FaCalendarAlt className="w-7 h-7" />,
  },
];

type AdminMenubarComponentProps = {
  isMenuOpen: boolean;
};
export const AdminMenubarComponent = ({
  isMenuOpen,
}: AdminMenubarComponentProps) => {
  const navigate = useNavigate();
  const { onSubmit } = useUserLogoutForm();

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
              _hover={{
                bg: "gray.700",
                transform: "scale(1.02)",
                transition: "0.2s",
              }}
            >
              <span>{item.icon}</span>
              <Text ml={3}>{item.label}</Text>
            </Button>
            <Divider borderColor="gray.600" />
          </>
        ))}
      </VStack>

      <VStack align="start" spacing={1} mt="auto">
        <Divider
          borderColor="gray.600"
          display={{ base: "none", md: "block" }}
        />

        <Button
          onClick={() => onSubmit()}
          variant="ghost"
          w="100%"
          h="12"
          justifyContent="start"
          fontSize="md"
          fontWeight="medium"
          color="red.400"
          _hover={{
            bg: "red.600",
            color: "white",
            transform: "scale(1.02)",
            transition: "0.2s",
          }}
        >
          <span>
            <FaSignOutAlt className="w-6 h-6" />
          </span>
          <Text ml={3}>ログアウト</Text>
        </Button>

        <Divider
          borderColor="gray.600"
          display={{ base: "none", md: "block" }}
        />

        <Button
          onClick={() => navigate(routePath.Setting)}
          variant="ghost"
          w="100%"
          h="12"
          justifyContent="start"
          fontSize="md"
          fontWeight="medium"
          color="white"
          _hover={{
            bg: "gray.700",
            transform: "scale(1.02)",
            transition: "0.2s",
          }}
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
