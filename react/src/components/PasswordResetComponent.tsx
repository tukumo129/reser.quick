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
import { passwordResetForm } from "../container/PasswordResetContainer";
import { useSearchParams } from "react-router-dom";

export function PasswordResetComponent() {
  const { passwordResetData, handleSubmit, onSubmit, errors } =
    passwordResetForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  return (
    <Box h="100vh" bg="gray.100" py={12} px={4}>
      <Center>
        <Box maxW="md" w="full" p={8} bg="white" shadow="lg" borderRadius="lg">
          <Box textAlign="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              パスワード再設定
            </Text>
            <Text fontSize="sm" color="gray.500">
              新しいパスワードを入力してください
            </Text>
          </Box>

          <form
            onSubmit={handleSubmit((data) =>
              onSubmit({ ...data, token, email }),
            )}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>新しいパスワード</FormLabel>
                <Input
                  type="password"
                  placeholder="新しいパスワード"
                  {...passwordResetData("password", {
                    required: "パスワードは必須です",
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください",
                    },
                  })}
                />
                {errors.password && (
                  <Text fontSize="sm" color="red.500">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.password_confirmation}>
                <FormLabel>新しいパスワード（確認）</FormLabel>
                <Input
                  type="password"
                  placeholder="もう一度入力"
                  {...passwordResetData("password_confirmation", {
                    required: "確認用パスワードは必須です",
                  })}
                />
                {errors.password_confirmation && (
                  <Text fontSize="sm" color="red.500">
                    {errors.password_confirmation.message}
                  </Text>
                )}
              </FormControl>

              <Button type="submit" colorScheme="blue" w="full">
                パスワードを再設定する
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </Box>
  );
}
