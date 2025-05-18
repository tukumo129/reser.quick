import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayoutComponent } from "../AdminLayout/adminLayoutComponent";
import { ErrorComponent } from "../ErrorPage/errorComponent";
import { useUpdateReserveForm } from "./updateReserveFormContainer";
import { useGetReserve } from "@/admin/api/Reserve/getReserve";
import { useGetSetting } from "@/admin/api/Setting/getSetting";
import { routePath } from "@/enums/routePath";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";

export function ReserveDetailComponent() {
  const { reserveId } = useParams();
  const navigate = useNavigate();
  const {
    reserve: gerReserveData,
    isLoading: getReserveIsLoading,
    error: getReserveError,
  } = useGetReserve(Number(reserveId));
  const {
    setting,
    isLoading: getSettingIsLoading,
    error: getSettingError,
  } = useGetSetting();
  const {
    UpdateReserveData,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading: submitIsLoading,
  } = useUpdateReserveForm(gerReserveData.id);

  const reserve = {
    id: gerReserveData.id,
    name: gerReserveData.name,
    reserveId: gerReserveData.reserveId,
    startDate: gerReserveData.startDateTime.split(" ")[0],
    startTime: gerReserveData.startDateTime.split(" ")[1],
    endDate: gerReserveData.endDateTime.split(" ")[0],
    endTime: gerReserveData.endDateTime.split(" ")[1],
    guestNumber: gerReserveData.guestNumber,
  };

  useEffect(() => {
    if (reserve) {
      reset(reserve);
    }
  }, [reserve]);

  if (getReserveIsLoading || getSettingIsLoading) return <LoadingSpinner />;
  if (getReserveError || getSettingError) return <ErrorComponent />;

  function generateTimeSlots(reserveSlotTime: string): string[] {
    const timeSlots: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
      for (
        let minute = 0;
        minute < 60;
        minute += parseInt(reserveSlotTime, 10)
      ) {
        const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        timeSlots.push(formattedTime);
      }
    }

    return timeSlots;
  }

  return (
    <AdminLayoutComponent pageName={"予約詳細"}>
      <Box p={{ base: 6, md: 10 }} bg="white" borderRadius="lg" boxShadow="xl">
        <form onSubmit={handleSubmit(onSubmit)} id="updateReserveForm">
          <Stack spacing={6}>
            <Stack>
              <Text fontWeight="semibold">予約番号</Text>
              <Text>{reserve.reserveId}</Text>
            </Stack>
            <Divider borderColor="gray.300" />
            <FormControl isInvalid={!!errors.name} id="name">
              <FormLabel fontWeight="semibold">
                名前
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                defaultValue={reserve.name}
                {...UpdateReserveData("name")}
                placeholder="名前を入力してください"
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
            <HStack spacing={6} align="start">
              <FormControl
                isInvalid={!!errors.startDate}
                id="startDate"
                w="full"
              >
                <FormLabel fontWeight="semibold">
                  開始日時
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input
                  type="date"
                  {...UpdateReserveData("startDate")}
                  defaultValue={reserve.startDate}
                  size="lg"
                  borderRadius="md"
                />
                <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.startTime}
                id="startTime"
                w="full"
              >
                <FormLabel fontWeight="semibold">
                  開始時刻
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Select
                  {...UpdateReserveData("startTime")}
                  size="lg"
                  borderRadius="md"
                >
                  {generateTimeSlots(setting.reserveSlotTime).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
            <Divider borderColor="gray.300" />
            <HStack spacing={6} align="start">
              <FormControl isInvalid={!!errors.endDate} id="endDate" w="full">
                <FormLabel fontWeight="semibold">
                  終了日時
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Input
                  type="date"
                  {...UpdateReserveData("endDate")}
                  defaultValue={reserve.endDate}
                  size="lg"
                  borderRadius="md"
                />
                <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.endTime} id="endTime" w="full">
                <FormLabel fontWeight="semibold">
                  終了時刻
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </FormLabel>
                <Select
                  {...UpdateReserveData("endTime")}
                  size="lg"
                  borderRadius="md"
                >
                  {generateTimeSlots(setting.reserveSlotTime).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
              </FormControl>
            </HStack>
            <Divider borderColor="gray.300" />
            <FormControl isInvalid={!!errors.guestNumber} id="guestNumber">
              <FormLabel fontWeight="semibold">
                人数
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                type="number"
                defaultValue={reserve.guestNumber}
                {...UpdateReserveData("guestNumber", { valueAsNumber: true })}
                size="lg"
                borderRadius="md"
                w={{ base: "100%", md: "6rem" }}
              />
              <FormErrorMessage>{errors.guestNumber?.message}</FormErrorMessage>
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
              onClick={() => navigate(routePath.Reserves)}
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
              form="updateReserveForm"
              borderRadius="md"
              isDisabled={submitIsLoading}
            >
              登録
            </Button>
          </HStack>
        </Box>
      </Box>
    </AdminLayoutComponent>
  );
}
