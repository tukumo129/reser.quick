import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getRoutePath, routePath } from "../../../enums/routePath";
import { useAppCreateReserveForm } from "../../container/Reserve/useAppCreateReserveContainer";
import { useGetReserveAvailableTimes } from "../../api/UseGetReserveAvailableTimes";
import { useAppUuidRecoil } from "../../recoils/AppUuidRecoil";
import { LoadingSpinner } from "../../../components/LoadingSpinnerComponent";
import { useEffect } from "react";
import { useAppSettingsRecoil } from "../../recoils/AppSettingsRecoil";

type AppCreateReserveFormComponentProps = {
  startDate: string
}
export function AppCreateReserveFormComponent({ startDate }: AppCreateReserveFormComponentProps) {
  const { appUuid } = useAppUuidRecoil()
  const { appSettings } = useAppSettingsRecoil()
  const currentDate = new Date(startDate);
  const { AppCreateReserveData, handleSubmit, onSubmit, errors, reset } = useAppCreateReserveForm(startDate);
  const { availableTimes, isLoading, error } = useGetReserveAvailableTimes(appUuid, { date: currentDate.toISOString() });
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const maxReserveNumber = appSettings.maxReserveNumber || 100

  useEffect(() => {
    if (availableTimes.length > 0 && availableTimes.filter((availableTime) => availableTime.available).length === 0) {
      navigate(getRoutePath(routePath.AppTop, appUuid))
    }
    reset()
  }, [availableTimes])

  if (isLoading) return <LoadingSpinner />
  if (error) navigate(getRoutePath(routePath.AppErrorPage, appUuid))

  return (
    <Box maxWidth="md" margin="auto" mt={8} p={{ base: 2, md: 6 }} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="createReserveForm">
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.name} id="name">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 20} m={isMobile ? "auto 2" : "auto 0"}>
                名前<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input
                {...AppCreateReserveData('name', {
                  required: { value: true, message: '名前を入力してください' },
                  maxLength: { value: 20, message: '20文字以内で入力してください' }
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
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 20} m={isMobile ? "auto 2" : "auto 0"}>
                時刻<Text as="span" color="red">*</Text>
              </FormLabel>
              <Select
                {...AppCreateReserveData('startTime')}
                maxW={{ base: "100%", md: "20rem" }}
              >
                {availableTimes.map((availableTime) => {
                  return (
                    <option
                      key={availableTime.startTime}
                      value={availableTime.startTime}
                      disabled={!availableTime.available}
                      style={{ backgroundColor: availableTime.available ? "white" : "#D6D6D6" }}
                    >
                      {availableTime.startTime}{availableTime.available ? ' ✔' : ' ✖'}
                    </option>
                  )
                })}
              </Select>
            </Flex>
            <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
          </FormControl>

          <Box borderWidth="1px" borderColor="bray.300" />

          <FormControl isInvalid={!!errors.guestNumber} id="guestNumber">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 20} m={isMobile ? "auto 2" : "auto 0"}>
                人数<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input
                w="full"
                type="number"
                defaultValue={0}
                {...AppCreateReserveData('guestNumber', {
                  setValueAs: (value) => {
                    return value ? parseInt(value, 10) : undefined
                  },
                  max: { value: maxReserveNumber, message: `${maxReserveNumber}以下の値を設定してください` },
                  min: { value: 1, message: '1以上の値を設定してください' },
                })}
                maxW={{ base: "100%", md: "5rem" }}
              />
              <FormErrorMessage>{errors.guestNumber?.message}</FormErrorMessage>
            </Flex>
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
          >
            キャンセル
          </Button>
          <Button
            colorScheme="blue"
            borderWidth="1px"
            type="submit"
            w={{ base: "100%", md: "10rem" }}
            form="createReserveForm"
          >
            登録
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
