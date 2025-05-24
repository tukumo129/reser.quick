import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import {
  openTimesSchema,
  useUpdateSettingSchema,
} from "./updateSettingFormContainer";
import { dayOfWeek } from "@/enums/dayOfWeek";
import { openTimeType } from "@/enums/openTimeType";

type WeekOpenTimesComponentProps = {
  control: Control<useUpdateSettingSchema>;
};

export const WeekOpenTimesComponent = ({
  control,
}: WeekOpenTimesComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { fields, replace } = useFieldArray({
    control,
    name: "openTimes",
    keyName: "key",
  });

  const [tempOpenTimes, setTempOpenTimes] = useState<openTimesSchema[]>(fields);

  const handleOpen = () => {
    setTempOpenTimes([...fields]);
    onOpen();
  };

  const handleAddTime = (week: string) => {
    setTempOpenTimes((prev) => [
      ...prev,
      {
        id: null,
        type: openTimeType.Week,
        week: dayOfWeek[week],
        date: "",
        startTime: "09:00",
        endTime: "18:00",
        maxAvailableReserve: null,
      },
    ]);
  };

  const handleRemoveTime = (index: number) => {
    setTempOpenTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    replace(tempOpenTimes);
    onClose();
  };

  return (
    <Box>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormLabel
          w={isMobile ? "auto" : 40}
          m={isMobile ? "auto 2" : "auto 0"}
        >
          営業時間（曜日）
        </FormLabel>
        <Button onClick={handleOpen} colorScheme="blue">
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
              {Object.keys(dayOfWeek).map((week) => {
                const openTimes = tempOpenTimes.filter(
                  (openTime) =>
                    dayOfWeek[week] === openTime.week &&
                    openTime.type === openTimeType.Week,
                );
                return (
                  <Box
                    key={week}
                    borderWidth={1}
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                    bg={openTimes.length === 0 ? "gray.300" : "white"}
                  >
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold" mb={2}>
                        {week}
                      </Text>
                      {openTimes.length === 0 && (
                        <Text color="gray.500">定休日</Text>
                      )}
                    </Flex>
                    {tempOpenTimes.map((time, index) => {
                      if (
                        dayOfWeek[week] === time.week &&
                        time.type === openTimeType.Week
                      ) {
                        return (
                          <Flex
                            key={`${week}-${index}`}
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
                                value={time.startTime ?? ""}
                                onChange={(e) =>
                                  setTempOpenTimes((prev) =>
                                    prev.map((t, i) =>
                                      i ===
                                      tempOpenTimes.findIndex(
                                        (_, idx) => idx === index,
                                      )
                                        ? { ...t, startTime: e.target.value }
                                        : t,
                                    ),
                                  )
                                }
                                width="45%"
                              />
                              <Text alignSelf="center" px={2}>
                                to
                              </Text>
                              <Input
                                type="time"
                                value={time.endTime ?? ""}
                                onChange={(e) =>
                                  setTempOpenTimes((prev) =>
                                    prev.map((t, i) =>
                                      i ===
                                      tempOpenTimes.findIndex(
                                        (_, idx) => idx === index,
                                      )
                                        ? { ...t, endTime: e.target.value }
                                        : t,
                                    ),
                                  )
                                }
                                width="45%"
                              />
                            </Flex>
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => handleRemoveTime(index)}
                              m={2}
                              alignSelf={isMobile ? "flex-end" : "center"}
                            >
                              削除
                            </Button>
                          </Flex>
                        );
                      }
                    })}
                    <Button
                      size="sm"
                      onClick={() => handleAddTime(week)}
                      mt={2}
                      colorScheme="blue"
                    >
                      時間追加
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              borderColor="gray.300"
              borderWidth="1px"
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
