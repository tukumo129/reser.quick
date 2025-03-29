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
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { Control, useFieldArray } from "react-hook-form";
import {
  openTimesSchema,
  useUpdateSettingSchema,
} from "./SettingUpdateFormContainer";
import { openTimeType } from "../../enums/openTimeType";
import { useState } from "react";

type DayOpenTimesComponentProps = {
  control: Control<useUpdateSettingSchema>;
};

export const DayOpenTimesContainer = ({
  control,
}: DayOpenTimesComponentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { fields, replace } = useFieldArray({
    control,
    name: "openTimes",
    keyName: "key",
  });

  const [tempOpenTimes, setTempOpenTimes] = useState<openTimesSchema[]>(fields);

  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const handleOpen = () => {
    setTempOpenTimes([...fields]);
    onOpen();
  };

  const handleAddTime = () => {
    setTempOpenTimes((prev) => [
      ...prev,
      {
        id: null,
        type: openTimeType.Day,
        week: null,
        date: null,
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
    const newErrors: { [key: number]: string } = {};
    tempOpenTimes.forEach((tempOpenTime, index) => {
      if (tempOpenTime.type == openTimeType.Day && !tempOpenTime.date) {
        newErrors[index] = "日付は必須です";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length != 0) return;

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
          営業時間（日付）
        </FormLabel>
        <Button onClick={handleOpen} colorScheme="blue">
          設定
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent maxWidth="800px">
          <ModalHeader>
            営業時間設定
            <Text color="gray.500" mt={2} fontSize="xs">
              同じ時間で設定することでその日を定休日にできます
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {tempOpenTimes.map((openTime, index) => {
                if (openTime.type === openTimeType.Day) {
                  return (
                    <div key={`date-${index}`}>
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
                        <FormControl
                          id={`openTimes.${index}.date`}
                          isInvalid={!!errors[index]}
                        >
                          <Input
                            type="date"
                            width={isMobile ? "100%" : "45%"}
                            value={openTime.date ?? ""}
                            onChange={(e) => {
                              if (errors[index]) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors[index];
                                  return newErrors;
                                });
                              }
                              setTempOpenTimes((prev) =>
                                prev.map((t, i) =>
                                  i === index
                                    ? { ...t, date: e.target.value }
                                    : t,
                                ),
                              );
                            }}
                          />
                          <FormErrorMessage>
                            {errors[index] && errors[index]}
                          </FormErrorMessage>
                        </FormControl>
                        <Flex
                          width={isMobile ? "100%" : "40%"}
                          justifyContent="space-between"
                          m={2}
                        >
                          <Input
                            type="time"
                            width="45%"
                            value={openTime.startTime ?? ""}
                            onChange={(e) =>
                              setTempOpenTimes((prev) =>
                                prev.map((t, i) =>
                                  i === index
                                    ? { ...t, startTime: e.target.value }
                                    : t,
                                ),
                              )
                            }
                          />
                          <Text alignSelf="center" px={2}>
                            to
                          </Text>
                          <Input
                            type="time"
                            width="45%"
                            required={false}
                            value={openTime.endTime ?? ""}
                            onChange={(e) =>
                              setTempOpenTimes((prev) =>
                                prev.map((t, i) =>
                                  i === index
                                    ? { ...t, endTime: e.target.value }
                                    : t,
                                ),
                              )
                            }
                          />
                        </Flex>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleRemoveTime(index)}
                          alignSelf={isMobile ? "flex-end" : "center"}
                        >
                          削除
                        </Button>
                      </Flex>
                    </div>
                  );
                }
              })}
              <Button
                size="sm"
                onClick={handleAddTime}
                colorScheme="blue"
                mt={2}
              >
                営業時間追加
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              borderWidth="1px"
              onClick={handleSave}
            >
              保存
            </Button>
            <Button
              colorScheme="gray"
              borderColor="gray.300"
              borderWidth="1px"
              onClick={onClose}
            >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
