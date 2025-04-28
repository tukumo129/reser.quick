import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useAppUuidRecoil } from "../recoils/AppUuidRecoil";
import { getRoutePath, routePath } from "../../enums/routePath";

export const AppErrorComponent = () => {
  const { appUuid } = useAppUuidRecoil();
  const path =
    appUuid !== ""
      ? getRoutePath(routePath.AppTop, appUuid)
      : routePath.ErrorNotFound;
  return (
    <Box textAlign="center" py={10} px={6}>
      <VStack spacing={4}>
        <Heading as="h2" size="xl" color="red.500">
          エラーが発生しました
        </Heading>
        <Text fontSize="md">
          ページの読み込みに失敗しました。もう一度お試しください。
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => (window.location.href = path)}
        >
          トップページへ戻る
        </Button>
      </VStack>
    </Box>
  );
};
