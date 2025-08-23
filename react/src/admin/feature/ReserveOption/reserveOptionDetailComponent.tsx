import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayoutComponent } from "../AdminLayout/adminLayoutComponent";
import { ErrorComponent } from "../ErrorPage/errorComponent";
import { useGetReserveOption } from "@/admin/api/ReserveOption/getReserveOption";
import { useUpdateReserveOptionForm } from "@/admin/feature/ReserveOption/updateOptionReserveFormContainer";
import { routePath } from "@/enums/routePath";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";

export function ReserveOptionDetailComponent() {
  const { reserveOptionId } = useParams();
  const navigate = useNavigate();
  const { reserveOption, isLoading, error } = useGetReserveOption(
    Number(reserveOptionId),
  );
  const {
    UpdateReserveOptionData,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading: submitIsLoading,
  } = useUpdateReserveOptionForm(reserveOption.id);

  useEffect(() => {
    if (reserveOption) {
      reset(reserveOption);
    }
  }, [reserveOption]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorComponent />;

  return (
    <AdminLayoutComponent pageName={"予約オプション詳細"}>
      <Box p={6} pb={24} bg="white" borderRadius="lg" boxShadow="xl">
        <form onSubmit={handleSubmit(onSubmit)} id="updateReserveOptionForm">
          <Stack spacing={6}>
            <FormControl isInvalid={!!errors.name} id="name">
              <FormLabel fontWeight="semibold">
                オプション名
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                defaultValue={reserveOption.name}
                {...UpdateReserveOptionData("name")}
                placeholder="オプション名を入力してください"
                size="lg"
                borderRadius="md"
                _focus={{
                  borderColor: "blue.400",
                  boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)",
                }}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <Divider borderColor="gray.300" />
            <FormControl isInvalid={!!errors.slotTime} id="slotTime">
              <FormLabel fontWeight="semibold">
                予約枠時間
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                type="number"
                defaultValue={reserveOption.slotTime}
                {...UpdateReserveOptionData("slotTime")}
                size="lg"
                borderRadius="md"
                w={{ base: "100%", md: "6rem" }}
              />
              <FormErrorMessage>{errors.slotTime?.message}</FormErrorMessage>
            </FormControl>
            <Divider borderColor="gray.300" />
            <FormControl isInvalid={!!errors.price} id="price">
              <FormLabel fontWeight="semibold">
                金額
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                type="number"
                defaultValue={reserveOption.price}
                {...UpdateReserveOptionData("price")}
                size="lg"
                borderRadius="md"
                w={{ base: "100%", md: "6rem" }}
              />
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </form>

        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="white"
          borderTopWidth="1px"
          borderTopColor="gray.300"
          p={5}
          display="flex"
          justifyContent="right"
          alignItems="center"
          boxShadow="xl"
        >
          <HStack spacing={6}>
            <Button
              colorScheme="gray"
              bg="gray.600"
              color="white"
              _hover={{
                bg: "gray.700",
                transform: "scale(1.05)",
                transition: "0.2s",
              }}
              w={{ base: "100%", md: "10rem" }}
              onClick={() => navigate(routePath.ReserveOptions)}
              borderRadius="md"
              isDisabled={submitIsLoading}
            >
              キャンセル
            </Button>
            <Button
              colorScheme="blue"
              bgGradient="linear(to-r, blue.500, blue.400)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, blue.600, blue.500)",
                transform: "scale(1.05)",
                transition: "0.2s",
              }}
              w={{ base: "100%", md: "10rem" }}
              type="submit"
              form="updateReserveOptionForm"
              borderRadius="md"
              isDisabled={submitIsLoading}
            >
              更新
            </Button>
          </HStack>
        </Box>
      </Box>
    </AdminLayoutComponent>
  );
}
