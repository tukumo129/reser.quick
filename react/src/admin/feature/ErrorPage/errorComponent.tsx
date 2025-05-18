import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { AppLayoutComponent } from "@/app/feature/AppLayout/AppLayoutComponent";

export const ErrorComponent = () => {
  return (
    <AppLayoutComponent pageName={"エラー"}>
      <Box textAlign="center" py={10} px={6}>
        <VStack spacing={4}>
          <Text fontSize="xl" color="red.500">
            データの取得に失敗しました。
          </Text>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            ページを再読み込み
          </Button>
        </VStack>
      </Box>
    </AppLayoutComponent>
  );
};
