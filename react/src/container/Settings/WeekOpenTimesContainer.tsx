import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
  FormLabel,
} from "@chakra-ui/react";
import { dayOfWeek } from "../../enums/dayOfWeek";
import { WeekOpenTime } from "../../services/SettingService/UseGetStoreSetting";

type DayOfWeek = "月曜日" | "火曜日" | "水曜日" | "木曜日" | "金曜日" | "土曜日" | "日曜日";

type WeekOpenTimesComponentProps = {
  weekOpenTimes: WeekOpenTime[];
  onChange: (updatedTimes: WeekOpenTime[]) => void;
};

export const WeekOpenTimesContainer = ({ weekOpenTimes, onChange }: WeekOpenTimesComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const addWeekOpenTime = (week: number) => {
    const newWeekOpenTime: WeekOpenTime = { week, openTime: "09:00", closeTime: "18:00" };
    const updatedWeekOpenTimes = [...weekOpenTimes, newWeekOpenTime];
    onChange(updatedWeekOpenTimes);
  };

  const handleWeekOpenTime = (index: number, newTime: Partial<WeekOpenTime>) => {
    const updatedWeekOpenTimes = weekOpenTimes.map((time, i) => 
      i === index ? { ...time, ...newTime } : time
    );
    onChange(updatedWeekOpenTimes);
  };

  const removeWeekOpenTime = (week: number, index: number) => {
    const updatedWeekOpenTimes = weekOpenTimes.filter((time, i) => 
      !(time.week === week && i === index)
    );
    onChange(updatedWeekOpenTimes);
  };

  const getOpenTimesForDay = (day: DayOfWeek) => {
    return weekOpenTimes.filter(time => {
      const dayName = Object.keys(dayOfWeek).find(key => dayOfWeek[key as DayOfWeek] === time.week);
      return dayName === day;
    });
  };

  return (
    <Box>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
          営業時間（曜日）
        </FormLabel>
        <Button onClick={onOpen} colorScheme="blue">
          設定
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent maxWidth="800px">
          <ModalHeader>営業時間設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {Object.keys(dayOfWeek).map(day => {
                const openTimes = getOpenTimesForDay(day as DayOfWeek);

                return (
                  <Box
                    key={day}
                    borderWidth={1}
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                    bg={openTimes.length === 0 ? "gray.300" : "white"}
                  >
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" mb={2}>{day}</Text>
                      {openTimes.length === 0 && (
                        <Text color="gray.500">定休日</Text>
                      )}
                    </Flex>

                    {openTimes.map((time, index) => (
                      <Flex
                        key={`${day}-${index}`}
                        alignItems="center"
                        justifyContent="space-between"
                        p={2}
                        mb={2}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="sm"
                        direction={isMobile ? "column" : "row"}
                        width="100%"
                      >
                        <Flex width="100%" justifyContent="space-between">
                          <Input
                            type="time"
                            value={time.openTime}
                            onChange={(e) => handleWeekOpenTime(weekOpenTimes.indexOf(time), { openTime: e.target.value })}
                            width="45%"
                          />
                          <Text alignSelf="center" px={2}>to</Text>
                          <Input
                            type="time"
                            value={time.closeTime}
                            onChange={(e) => handleWeekOpenTime(weekOpenTimes.indexOf(time), { closeTime: e.target.value })}
                            width="45%"
                          />
                        </Flex>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => removeWeekOpenTime(time.week, weekOpenTimes.indexOf(time))}
                          m={2}
                          alignSelf={isMobile ? "flex-end" : "center"} 
                        >
                          削除
                        </Button>
                      </Flex>

                    ))}

                    <Button size="sm" onClick={() => addWeekOpenTime(dayOfWeek[day as DayOfWeek])} mt={2} colorScheme="blue">
                      時間追加
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} borderWidth="1px" onClick={onClose}>
              保存
            </Button>
            <Button colorScheme="gray" borderColor="gray.300" borderWidth="1px" onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};