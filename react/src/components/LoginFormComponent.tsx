import { useLoginForm } from "../container/LoginFormContainer";
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export function LoginForm() {
  const { loginData, handleSubmit, onSubmit, errorMessage } = useLoginForm();

  return (
    <Box h="100vh" bg="gray.100" py={12} px={4}>
      <Center>
        <Card maxW="md" w="full" p={8} bg="white" shadow="lg" borderRadius="lg">
          <Box textAlign="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              予約管理
            </Text>
          </Box>
          {errorMessage && (
            <Alert status="error" mb={4} borderRadius="md">
              {errorMessage}
            </Alert>
          )}
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                  メールアドレス
                </FormLabel>
                <Input
                  {...loginData("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.com"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                  パスワード
                </FormLabel>
                <Input
                  {...loginData("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="パスワード"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
              </FormControl>
              <Button
                type="submit"
                mt={4}
                w="full"
                colorScheme="blue"
                borderRadius="md"
              >
                ログイン
              </Button>
            </Stack>
          </Box>
        </Card>
      </Center>
    </Box>
  );
}
