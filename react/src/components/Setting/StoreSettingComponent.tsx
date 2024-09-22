import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { routePath } from "../../enums/routePath";
import { useNavigate } from "react-router-dom";
import { useStoreSettingUpdateForm } from "../../container/Settings/StoreSettingUpdateFormContainer";
import { DayOpenTime, GetStoreSettingData, WeekOpenTime } from "../../services/SettingService/UseGetStoreSetting";
import { useEffect, useState } from "react";
import { WeekOpenTimesContainer } from "../../container/Settings/WeekOpenTimesContainer";
import { DayOpenTimesContainer } from "../../container/Settings/DayOpenTimesContainer";

export const StoreSettingComponent = (storeSetting: GetStoreSettingData) => {
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { StoreSettingUpdateData, setValue, handleSubmit, onSubmit , errors, reset} = useStoreSettingUpdateForm()
  const [weekOpenTimes, setWeekOpenTimes] = useState<WeekOpenTime[]>([]);
  const [dayOpenTimes, setDayOpenTimes] = useState<DayOpenTime[]>([]);
  const handleWeekOpenTimesChange = (updateTimes: WeekOpenTime[]) => {
    setWeekOpenTimes(updateTimes);
  }
  const handleDayOpenTimesChange = (updateTimes: DayOpenTime[]) => {
    setDayOpenTimes(updateTimes);
  }
  useEffect(() => {
    if (storeSetting) {
      reset(storeSetting)
      setWeekOpenTimes(storeSetting.weekOpenTimes)
      setDayOpenTimes(storeSetting.dayOpenTimes)
    }
  }, [storeSetting]);

  useEffect(() => {
    setValue('weekOpenTimes', weekOpenTimes);
  }, [weekOpenTimes]);

  useEffect(() => {
    setValue('dayOpenTimes', dayOpenTimes);
  }, [dayOpenTimes]);

  return (
    <Box p={{base: 4, md: 8}} mx="right" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="updateStoreSettingForm">
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.storeName} id="name">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                店舗名<Text as="span" color="red"> *</Text>
              </FormLabel>

              <Input
                defaultValue={storeSetting.storeName}
                {...StoreSettingUpdateData('storeName')}
                placeholder="店舗名を入力してください"
                w="full"
                maxW={{ base: "100%", md: "20rem" }}
              />
            </Flex>
            <FormErrorMessage>{errors.storeName?.message}</FormErrorMessage>
          </FormControl>

          <Box borderWidth="1px" borderColor="bray.300" />
          <WeekOpenTimesContainer weekOpenTimes={weekOpenTimes} onChange={handleWeekOpenTimesChange}/>

          <Box borderWidth="1px" borderColor="bray.300" />
          <DayOpenTimesContainer dayOpenTimes={dayOpenTimes} onChange={handleDayOpenTimesChange}/>
          {errors.dayOpenTimes && Array.isArray(errors.dayOpenTimes) && (
            errors.dayOpenTimes.map((error) => (
              <>
                {error?.date && (<Text color="red.500">{error.date.message}</Text>)}
                {error?.openTime && (<Text color="red.500">{error.openTime.message}</Text>)}
                {error?.closeTime && (<Text color="red.500">{error.closeTime.message}</Text>)}
              </>
            ))
          )}
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
            form="updateStoreSettingForm"
          >
            登録
          </Button>
        </HStack>
      </Box>
    </Box>
  )
};
