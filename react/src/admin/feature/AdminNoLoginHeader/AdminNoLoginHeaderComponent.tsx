import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { routePath } from "@/enums/routePath";

export const AdminNoLoginHeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      p={4}
      height={16}
      color="black"
      borderBottom="1px"
      borderColor="gray.300"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box onClick={() => navigate(routePath.Login)} cursor="pointer" p={2}>
        <Heading size="lg">予約管理アプリ</Heading>
      </Box>
      <Box
        onClick={() => navigate(routePath.CreateUser)}
        cursor="pointer"
        p={2}
      >
        ユーザー登録
      </Box>
    </Box>
  );
};
