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
import { DayOpenTime } from "../../services/SettingService/UseGetStoreSetting";

type DayOpenTimesComponentProps = {
  dayOpenTimes: DayOpenTime[];
  onChange: (updatedTimes: DayOpenTime[]) => void;
};

export const DayOpenTimesContainer = ({ dayOpenTimes, onChange }: DayOpenTimesComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const addDayOpenTime = () => {
    const newDayOpenTime: DayOpenTime = { date: "", openTime: "09:00", closeTime: "18:00" };
    onChange([...dayOpenTimes, newDayOpenTime]);
  };

  const handleDayOpenTime = (index: number, newTime: Partial<DayOpenTime>) => {
    const updatedDayOpenTimes = dayOpenTimes.map((time, i) =>
      i === index ? { ...time, ...newTime } : time
    );
    onChange(updatedDayOpenTimes);
  };

  const removeDayOpenTime = (index: number) => {
    const updatedDayOpenTimes = dayOpenTimes.filter((_, i) => i !== index);
    onChange(updatedDayOpenTimes);
  };

  return (
    <Box>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
          営業時間（日付）
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
              {dayOpenTimes.map((openTime, index) => (
                <Flex
                  key={index}
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
                  <Input
                    type="date"
                    value={openTime.date}
                    onChange={e => handleDayOpenTime(index, { date: e.target.value })}
                    width={isMobile ? "100%" : "45%"}
                  />
                  <Flex width={isMobile ? "100%" : "40%"} justifyContent="space-between" m={2}>
                    <Input
                      type="time"
                      value={openTime.openTime}
                      onChange={e => handleDayOpenTime(index, { openTime: e.target.value })}
                      width="45%"
                    />
                    <Text alignSelf="center" px={2}>to</Text>
                    <Input
                      type="time"
                      value={openTime.closeTime}
                      onChange={e => handleDayOpenTime(index, { closeTime: e.target.value })}
                      width="45%"
                    />
                  </Flex>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeDayOpenTime(index)}
                    alignSelf={isMobile ? "flex-end" : "center"} 
                  >
                    削除
                  </Button>
                </Flex>
              ))}
              <Button size="sm" onClick={addDayOpenTime} colorScheme="blue" mt={2}>
                営業時間追加
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} borderWidth="1px" onClick={onClose}>
              保存
            </Button>
            <Button colorScheme="gray" borderColor="gray.300" borderWidth="1px" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};