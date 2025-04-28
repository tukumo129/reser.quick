import { Box, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export const PageNotFoundComponent = () => {
  return (
    <Box textAlign="center" py={20} px={6}>
      <VStack spacing={6}>
        <Icon as={WarningIcon} boxSize={12} color="gray.400" />
        <Heading as="h1" size="xl" color="gray.700">
          ページが見つかりません
        </Heading>
        <Text fontSize="md" color="gray.500">
          アクセスしようとしたページが存在しないか、URLが間違っている可能性があります。
        </Text>
      </VStack>
    </Box>
  );
};
