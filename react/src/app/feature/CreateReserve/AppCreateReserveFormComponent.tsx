import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppLayoutComponent } from "../AppLayout/AppLayoutComponent";
import { AppCreateReserveForm } from "./AppCreateReserveContainer";
import { useGetReserveAvailableTimes } from "@/app/api/UseAppGetReserveAvailableTimes";
import { useAppSettingsRecoil } from "@/app/recoils/AppSettingsRecoil";
import { useAppUuidRecoil } from "@/app/recoils/AppUuidRecoil";
import { getRoutePath, routePath } from "@/enums/routePath";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";

export function AppCreateReserveComponent() {
  const { date } = useParams();
  const startDate = date ?? "";
  const { appUuid } = useAppUuidRecoil();
  const { appSettings } = useAppSettingsRecoil();
  const currentDate = new Date(startDate);
  const {
    AppCreateReserveData,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isLoading: submitIsLoading,
  } = AppCreateReserveForm(startDate);
  const { availableTimes, isLoading, error } = useGetReserveAvailableTimes(
    appUuid,
    { date: currentDate.toISOString() },
  );
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const maxReserveNumber = appSettings.maxReserveNumber || 10;
  const reserveBlockMinutes = appSettings.reserveBlockMinutes || 30;
  const now = new Date();
  const limitDate = new Date(now.getTime() + reserveBlockMinutes * 60 * 1000);
  const isToday = currentDate.toDateString() === now.toDateString();
  const toast = useToast();

  useEffect(() => {
    const hasAvailableSlot = availableTimes.some((availableTime) => {
      if (!availableTime.available) return false;
      const time = new Date(`${startDate}T${availableTime.startTime}`);
      return !isToday || time.getTime() >= limitDate.getTime();
    });

    if (!hasAvailableSlot && availableTimes.length > 0) {
      toast({
        title: "予約可能な時間帯がありませんでした",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate(getRoutePath(routePath.AppTop, appUuid));
      }, 1000);
    }
    reset();
  }, [availableTimes]);

  if (isLoading) return <LoadingSpinner />;
  if (error) navigate(getRoutePath(routePath.AppErrorPage, appUuid));

  return (
    <AppLayoutComponent pageName={"予約登録"}>
      <Box
        maxWidth="md"
        margin="auto"
        mt={8}
        p={{ base: 2, md: 6 }}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <form onSubmit={handleSubmit(onSubmit)} id="createReserveForm">
          <VStack spacing={6}>
            <FormControl isInvalid={!!errors.name} id="name">
              <Flex direction={isMobile ? "column" : "row"}>
                <FormLabel
                  w={isMobile ? "auto" : 20}
                  m={isMobile ? "auto 2" : "auto 0"}
                >
                  名前
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  {...AppCreateReserveData("name", {
                    required: {
                      value: true,
                      message: "名前を入力してください",
                    },
                    maxLength: {
                      value: 20,
                      message: "20文字以内で入力してください",
                    },
                  })}
                  placeholder="名前を入力してください"
                  w="full"
                  maxW={{ base: "100%", md: "20rem" }}
                />
              </Flex>
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <Box borderWidth="1px" borderColor="bray.300" />

            <FormControl isInvalid={!!errors.startTime} id="startTime">
              <Flex direction={isMobile ? "column" : "row"}>
                <FormLabel
                  w={isMobile ? "auto" : 20}
                  m={isMobile ? "auto 2" : "auto 0"}
                >
                  時刻
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Select
                  {...AppCreateReserveData("startTime", {
                    required: {
                      value: true,
                      message: "時刻を選択してください",
                    },
                  })}
                  maxW={{ base: "100%", md: "20rem" }}
                >
                  {availableTimes.map((availableTime) => {
                    const time = new Date(
                      `${startDate}T${availableTime.startTime}`,
                    );
                    const shouldDisable =
                      !availableTime.available ||
                      (isToday && time.getTime() < limitDate.getTime());

                    if (shouldDisable) return;
                    return (
                      <option
                        key={availableTime.startTime}
                        value={availableTime.startTime}
                        disabled={shouldDisable}
                        style={{
                          backgroundColor: shouldDisable ? "#D6D6D6" : "white",
                        }}
                      >
                        {availableTime.startTime}
                        {shouldDisable ? " ✖" : " ✔"}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>

            <Box borderWidth="1px" borderColor="bray.300" />

            <FormControl isInvalid={!!errors.guestNumber} id="guestNumber">
              <Flex direction={isMobile ? "column" : "row"}>
                <FormLabel
                  w={isMobile ? "auto" : 20}
                  m={isMobile ? "auto 2" : "auto 0"}
                >
                  人数
                  <Text as="span" color="red">
                    *
                  </Text>
                </FormLabel>
                <Input
                  w="full"
                  type="number"
                  defaultValue={0}
                  {...AppCreateReserveData("guestNumber", {
                    setValueAs: (value) => {
                      return value ? parseInt(value, 10) : undefined;
                    },
                    required: {
                      value: true,
                      message: "人数を入力してください",
                    },
                    max: {
                      value: maxReserveNumber,
                      message: `${maxReserveNumber}以下の値を設定してください`,
                    },
                    min: { value: 1, message: "1以上の値を設定してください" },
                  })}
                  maxW={{ base: "100%", md: "5rem" }}
                />
              </Flex>
              <FormErrorMessage>{errors.guestNumber?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </form>

        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="white"
          borderTopWidth="1px"
          borderTopColor="gray.300"
          p={4}
          display="flex"
          justifyContent="right"
          alignItems="center"
          boxShadow="md"
        >
          <HStack spacing={4}>
            <Button
              colorScheme="gray"
              borderWidth="1px"
              borderColor="gray.300"
              w={{ base: "100%", md: "10rem" }}
              onClick={() => navigate(getRoutePath(routePath.AppTop, appUuid))}
              isDisabled={submitIsLoading}
            >
              キャンセル
            </Button>
            <Button
              colorScheme="blue"
              borderWidth="1px"
              type="submit"
              w={{ base: "100%", md: "10rem" }}
              form="createReserveForm"
              isDisabled={submitIsLoading}
            >
              登録
            </Button>
          </HStack>
        </Box>
      </Box>
    </AppLayoutComponent>
  );
}
