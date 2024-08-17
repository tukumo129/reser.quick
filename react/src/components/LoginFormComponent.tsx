import { useLoginForm } from "../container/LoginFormContainer";
import {Alert, Box,Button,Center,FormControl,FormLabel,Input,Stack,Text} from "@chakra-ui/react";

export function LoginForm() {
  const { loginData, handleSubmit, onSubmit, errorMessage } = useLoginForm();

  return (
    <Box h="100vh" bg="gray.200" py={12} px={4}>
      <Center>
        <Box maxW="md" w="full">
          <Box textAlign="center" mb={8}>
            <Text fontSize="3xl">
              予約管理
            </Text>
          </Box>
          {errorMessage && (
            <Alert status="error" mb={4}>
              {errorMessage}
            </Alert>
          )}
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <FormControl id="email">
                <FormLabel srOnly>メールアドレス</FormLabel>
                <Input
                  {...loginData("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="メールアドレス"
                  bg="white"
                  borderColor="gray.500"
                  roundedTop="md"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel srOnly>パスワード</FormLabel>
                <Input
                  {...loginData("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="パスワード"
                  bg="white"
                  borderColor="gray.500"
                  roundedBottom="md"
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              mt={6}
              w="full"
              colorScheme='yellow'
              rounded="md"
            >
              ログイン
            </Button>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}
