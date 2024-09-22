import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { routePath } from "../../enums/routePath";
import { useNavigate } from "react-router-dom";
import { GetReserveSettingData } from "../../services/SettingService/UseGetReserveSetting";
import { useReserveSettingUpdateForm } from "../../container/Settings/ReserveSettingUpdateFormContainer";
import { useEffect } from "react";

export const ReserveSettingComponent = (reserveSetting: GetReserveSettingData) => {
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { ReserveSettingUpdateData, handleSubmit, onSubmit , errors, reset} = useReserveSettingUpdateForm()

  useEffect(() => {
    if (reserveSetting) {
      reset(reserveSetting)
    }
  }, [reserveSetting])

  return (
    <Box p={{base: 4, md: 8}} mx="right" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="updateReserveSettingForm">
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.maxConcurrentReserve} id="maxConcurrentReserve">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                同時予約可能数
              </FormLabel>
              <Flex align="center">
                <Input
                  defaultValue={reserveSetting.maxConcurrentReserve}
                  {...ReserveSettingUpdateData('maxConcurrentReserve', {setValueAs: (value) => {
                    return value ? parseInt(value, 10) : undefined
                  }})}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>組</Text>
              </Flex>
            </Flex>
            <FormErrorMessage>{errors.maxConcurrentReserve?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.reserveSlotTime} id="reserveSlotTime">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                予約枠単位<Text as="span" color="red"> *</Text>
              </FormLabel>

              <Input
                defaultValue={reserveSetting.reserveSlotTime}
                {...ReserveSettingUpdateData('reserveSlotTime')}
                w="full"
                maxW="5rem"
                placeholder="00:00"
              />
            </Flex>
            <FormErrorMessage>{errors.reserveSlotTime?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.defaultStayTime} id="defaultStayTime">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                標準滞在時間<Text as="span" color="red"> *</Text>
              </FormLabel>

              <Input
                defaultValue={reserveSetting.defaultStayTime}
                {...ReserveSettingUpdateData('defaultStayTime')}
                w="full"
                maxW="5rem"
                placeholder="00:00"
              />
            </Flex>
            <FormErrorMessage>{errors.defaultStayTime?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.maxReserveNumber} id="maxReserveNumber">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                最大予約人数
              </FormLabel>

              <Flex align="center">
                <Input
                  defaultValue={reserveSetting.maxReserveNumber}
                  {...ReserveSettingUpdateData('maxReserveNumber', {setValueAs: (value) => {
                    return value ? parseInt(value, 10) : undefined
                  }})}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>人</Text>
              </Flex>
            </Flex>
            <FormErrorMessage>{errors.maxReserveNumber?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.reserveMonthsLimit} id="reserveMonthsLimit">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                予約月数上限
              </FormLabel>
              <Flex align="center">
                <Input
                  defaultValue={reserveSetting.reserveMonthsLimit}
                  {...ReserveSettingUpdateData('reserveMonthsLimit', {setValueAs: (value) => {
                    return value ? parseInt(value, 10) : undefined
                  }})}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>カ月先</Text>
              </Flex>
            </Flex>
            <FormErrorMessage>{errors.reserveMonthsLimit?.message}</FormErrorMessage>
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
            onClick={() => navigate(routePath.Reserves)}
          >
            キャンセル
          </Button>
          <Button
            colorScheme="blue"
            borderWidth="1px"
            type="submit"
            w={{ base: "100%", md: "10rem" }}
            form="updateReserveSettingForm"
          >
            登録
          </Button>
        </HStack>
      </Box>
    </Box>
  )
};
