import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { passwordForgotForm } from "../container/PasswordForgotContainer";

export function PasswordForgotComponent() {
  const { passwordForgotData, handleSubmit, onSubmit, errors } =
    passwordForgotForm();

  return (
    <Box h="100vh" bg="gray.100" py={12} px={4}>
      <Center>
        <Box maxW="md" w="full" p={8} bg="white" shadow="lg" borderRadius="lg">
          <Box textAlign="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              パスワード再設定
            </Text>
            <Text fontSize="sm" color="gray.500">
              ご登録のメールアドレスを入力してください
            </Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>メールアドレス</FormLabel>
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  {...passwordForgotData("email", {
                    required: "メールアドレスは必須です",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "正しいメールアドレスを入力してください",
                    },
                  })}
                />
                {errors.email && (
                  <Text fontSize="sm" color="red.500">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
              <Button type="submit" colorScheme="blue" w="full">
                リセットリンクを送信
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </Box>
  );
}
