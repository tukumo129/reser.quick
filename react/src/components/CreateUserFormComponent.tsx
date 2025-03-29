import { useCreateUserForm } from "../container/CreateUserFormContainer";
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export function CreateUserForm() {
  const {
    createUserData,
    handleSubmit,
    watch,
    onSubmit,
    errors,
    errorMessage,
  } = useCreateUserForm();

  return (
    <Box h="100vh" bg="gray.100" py={12} px={4}>
      <Center>
        <Card maxW="md" w="full" p={8} bg="white" shadow="lg" borderRadius="lg">
          <Box textAlign="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              アカウント作成
            </Text>
          </Box>
          {errorMessage && (
            <Alert status="error" mb={4} borderRadius="md">
              {errorMessage}
            </Alert>
          )}
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                  メールアドレス
                </FormLabel>
                <Input
                  {...createUserData("email", {
                    required: {
                      value: true,
                      message: "メールアドレスを入力してください",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "正しいメールアドレスの形式で入力してください",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  placeholder="example@mail.com"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                  パスワード
                </FormLabel>
                <Input
                  {...createUserData("password", {
                    required: {
                      value: true,
                      message: "パスワードを入力してください",
                    },
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上で入力してください",
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                      message: "パスワードは英字と数字を含めてください",
                    },
                  })}
                  type="password"
                  autoComplete="new-password"
                  placeholder="8文字以上の英数字"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel fontSize="sm" fontWeight="medium" color="gray.600">
                  パスワード（確認）
                </FormLabel>
                <Input
                  {...createUserData("confirmPassword", {
                    required: {
                      value: true,
                      message: "確認用パスワードを入力してください",
                    },
                    validate: (value) =>
                      value === watch("password") || "パスワードが一致しません",
                  })}
                  type="password"
                  autoComplete="new-password"
                  placeholder="もう一度入力してください"
                  bg="gray.50"
                  borderColor="gray.300"
                  _focus={{ borderColor: "blue.500", bg: "white" }}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                mt={4}
                w="full"
                colorScheme="blue"
                borderRadius="md"
              >
                登録する
              </Button>
            </Stack>
          </Box>
        </Card>
      </Center>
    </Box>
  );
}
