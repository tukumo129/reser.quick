import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { routePath } from "../../enums/routePath";
import { useNavigate } from "react-router-dom";
import { WeekOpenTimesContainer } from "../../container/Settings/WeekOpenTimesContainer";
import { GetSetting } from "../../services/SettingService/UseGetSetting";
import { useSettingUpdateForm } from "../../container/Settings/SettingUpdateFormContainer";
import { DayOpenTimesContainer } from "../../container/Settings/DayOpenTimesContainer";
import { useEffect } from "react";

export const SettingComponent = ({ setting, reserveSiteUrl }: GetSetting) => {
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { SettingUpdateData, control, handleSubmit, onSubmit, errors, reset } = useSettingUpdateForm()

  useEffect(() => {
    if (setting) {
      reset(setting)
    }
  }, [setting])

  return (
    <Box p={{ base: 4, md: 8 }} mx="right" mb={20} bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="updateSettingForm">
        <Stack spacing={2}>
          <FormControl isInvalid={!!errors.storeName} id="name">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                予約サイトURL
              </FormLabel>
              <a href={reserveSiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                {reserveSiteUrl}
              </a>
            </Flex>
            <FormErrorMessage>{errors.storeName?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.storeName} id="name">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                店舗名<Text as="span" color="red"> *</Text>
              </FormLabel>

              <Input
                {...SettingUpdateData('storeName', {
                  required: { value: true, message: '店舗名を入力してください' },
                  maxLength: { value: 50, message: '50文字以内で入力してください' }
                })}
                w="full"
                maxW={{ base: "100%", md: "20rem" }}
              />
            </Flex>
            <Text color='gray.500' ml={isMobile ? "auto" : 40} mt={2} fontSize='xs'>
              予約ページに表示される店舗名を設定します
            </Text>
            <FormErrorMessage>{errors.storeName?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.reserveSlotTime} id="reserveSlotTime">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                予約枠単位
              </FormLabel>
              <Select
                {...SettingUpdateData('reserveSlotTime')}
                borderRadius="md"
                borderColor="gray.300"
                bg="white"
                w='auto'
              >
                <option value={'5'}>5分</option>
                <option value={'10'}>10分</option>
                <option value={'15'}>15分</option>
                <option value={'30'}>30分</option>
                <option value={'60'}>60分</option>
              </Select>
            </Flex>
            <Text color='gray.500' ml={isMobile ? "auto" : 40} mt={2} fontSize='xs'>
              何分毎に予約を受け付けるかを設定します
            </Text>
            <FormErrorMessage>{errors.reserveSlotTime?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.maxReserveNumber} id="maxReserveNumber">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                最大予約人数
              </FormLabel>

              <Flex align="center">
                <Input
                  {...SettingUpdateData('maxReserveNumber', {
                    setValueAs: (value) => {
                      return value ? parseInt(value, 10) : undefined
                    },
                    max: { value: 100, message: '100以下の値を設定してください' },
                    min: { value: 1, message: '1以上の値を設定してください' },
                  })}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>人</Text>
              </Flex>
            </Flex>
            <Text color='gray.500' ml={isMobile ? "auto" : 40} mt={2} fontSize='xs'>
              1回の予約で何人まで予約できるかを設定します
            </Text>
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
                  {...SettingUpdateData('reserveMonthsLimit', {
                    setValueAs: (value) => {
                      return value ? parseInt(value, 10) : undefined
                    },
                    max: { value: 100, message: '100以下の値を設定してください' },
                    min: { value: 1, message: '1以上の値を設定してください' },
                  })}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>カ月先</Text>
              </Flex>
            </Flex>
            <Text color='gray.500' ml={isMobile ? "auto" : 40} mt={2} fontSize='xs'>
              何カ月先まで予約を受け付けるかを設定します
            </Text>
            <FormErrorMessage>{errors.reserveMonthsLimit?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <FormControl isInvalid={!!errors.maxAvailableReserve} id="maxAvailableReserve">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                同時予約可能数
              </FormLabel>
              <Flex align="center">
                <Input
                  {...SettingUpdateData('maxAvailableReserve', {
                    setValueAs: (value) => {
                      return value ? parseInt(value, 10) : undefined
                    },
                    max: { value: 100, message: '100以下の値を設定してください' },
                    min: { value: 1, message: '1以上の値を設定してください' },
                  })}
                  type="number"
                  w="full"
                  maxW="5rem"
                />
                <Text ml={2}>組</Text>
              </Flex>
            </Flex>
            <Text color='gray.500' ml={isMobile ? "auto" : 40} mt={2} fontSize='xs'>
              同時に何組まで予約を受け付けるかを設定します
            </Text>
            <FormErrorMessage>{errors.maxAvailableReserve?.message}</FormErrorMessage>
          </FormControl>
          <Box borderWidth="1px" borderColor="bray.300" />
          <WeekOpenTimesContainer control={control} />
          <Box borderWidth="1px" borderColor="bray.300" />
          <DayOpenTimesContainer control={control} />
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
            form="updateSettingForm"
          >
            登録
          </Button>
        </HStack>
      </Box>
    </Box>
  )
};
