import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useReserveCreateForm } from "../container/ReserveCreateFormContainer";
import { useNavigate } from "react-router-dom";
import { routePath } from "../enums/routePath";

const getTimes = (activeTimes:{start: string, end: string}[], interval: number) => {
  const Times:Array<string> = [];
  activeTimes.map((activeTime) => {
    const startTime = new Date(`1970-01-01T${activeTime.start}:00Z`);
    const endTime = new Date(`1970-01-01T${activeTime.end}:00Z`);
    const currentTime = new Date(startTime);
  
    while (currentTime <= endTime) {
      const hours = String(currentTime.getUTCHours()).padStart(2, '0');
      const minutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
      Times.push(`${hours}:${minutes}`);
      currentTime.setUTCMinutes(currentTime.getUTCMinutes() + interval);
    }
  })
  return Times;
};

export function CreateReserveForm() {
  const navigate = useNavigate()
  const { ReserveCreateData, handleSubmit, onSubmit , errors} = useReserveCreateForm();

  // 各種設定は設定画面から取得する
  const TimeInterval = 15;
  const activeTimes = [
    { start: '00:00', end: '01:00'},
    { start: '10:00', end: '13:45'},
    { start: '23:00', end: '24:00'},
  ]
  const timeOptions = getTimes(activeTimes, TimeInterval);

  return (
    <Box p={{base: 4, md: 8}} mx="right" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="createReserveForm">
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name} id="name">
            <FormLabel>
              名前<Text as="span" color="red">*</Text>
            </FormLabel>
            <Input
              {...ReserveCreateData('name')}
              placeholder="名前を入力してください"
              w="full"
              maxW={{ base: "100%", md: "20rem" }}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <Box borderWidth="1px" borderColor="bray.300" />

          <HStack spacing={4} align="start">
            <FormControl isInvalid={!!errors.startDate} id="startDate" w={{ base: "100%", md: "10rem" }}>
              <FormLabel>
                開始日時<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input type="date" {...ReserveCreateData('startDate')} />
              <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.startTime} id="startTime"  w={{ base: "100%", md: "9rem" }}>
              <FormLabel visibility={{ base: "hidden", md: "visible" }}>
                開始時刻<Text as="span" color="red">*</Text>
              </FormLabel>
              <Select {...ReserveCreateData('startTime')}>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Box borderWidth="1px" borderColor="bray.300" />

          <HStack spacing={4} align="start">
            <FormControl isInvalid={!!errors.endDate} id="endDate" w={{ base: "100%", md: "10rem" }}>
              <FormLabel>
                終了日時<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input type="date" {...ReserveCreateData('endDate')} />
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.endTime} id="endTime" w={{ base: "100%", md: "9rem" }}>
              <FormLabel visibility={{ base: "hidden", md: "visible" }}>
                終了時刻<Text as="span" color="red">*</Text>
              </FormLabel>
              <Select {...ReserveCreateData('endTime')} >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Box borderWidth="1px" borderColor="bray.300" />

          <FormControl isInvalid={!!errors.guestNumber} id="guestNumber">
            <FormLabel>
              人数<Text as="span" color="red">*</Text>
            </FormLabel>
            <Input
              w="full"
              type="number"
              defaultValue={0}
              {...ReserveCreateData('guestNumber')}
              maxW={{ base: "100%", md: "5rem" }}
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
            form="createReserveForm"
          >
            登録
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
