import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useReserveCreateForm } from "../../container/Reserves/ReserveCreateFormContainer";
import { routePath } from "../../enums/routePath";

export function CreateReserveForm() {
  const navigate = useNavigate()
  const { ReserveCreateData, handleSubmit, onSubmit , errors} = useReserveCreateForm();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={{base: 4, md: 8}} mx="right" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="createReserveForm">
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name} id="name">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                名前<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input
                {...ReserveCreateData('name')}
                placeholder="名前を入力してください"
                w="full"
                maxW={{ base: "100%", md: "20rem" }}
              />
            </Flex>
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <Box borderWidth="1px" borderColor="bray.300" />

          <HStack spacing={4} align="start">
            <FormControl isInvalid={!!errors.startDate} id="startDate" w={{ base: "100%", md: "auto" }}>
              <Flex direction={isMobile ? 'column' : 'row'}>
                <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                  開始日時<Text as="span" color="red">*</Text>
                </FormLabel>
                <Input type="date" {...ReserveCreateData('startDate')} flex="1" minHeight="2.5rem"/>
              </Flex>
              <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.startTime} id="startTime" w={{ base: "100%", md: "auto" }}>
              <Flex direction={isMobile ? 'column' : 'row'}>
                {isMobile ? (
                  <FormLabel w="auto" m="auto 2">開始時刻<Text as="span" color="red">*</Text></FormLabel>
                ) : (
                  <FormLabel>&nbsp;</FormLabel>
                )}
                <Input {...ReserveCreateData('startTime')} placeholder="00:00" flex="1" minHeight="2.5rem"/>
              </Flex>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Box borderWidth="1px" borderColor="bray.300" />

          <HStack spacing={4} align="start">
            <FormControl isInvalid={!!errors.endDate} id="endDate" w={{ base: "100%", md: "auto" }}>
              <Flex direction={isMobile ? 'column' : 'row'}>
                <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
                終了日時<Text as="span" color="red">*</Text>
                </FormLabel>
                <Input type="date" {...ReserveCreateData('endDate')} flex="1" minHeight="2.5rem"/>
              </Flex>
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.endTime} id="endTime" w={{ base: "100%", md: "auto" }}>
              <Flex direction={isMobile ? 'column' : 'row'}>
                {isMobile ? (
                  <FormLabel w="auto" m="auto 2">終了時刻<Text as="span" color="red">*</Text></FormLabel>
                ) : (
                  <FormLabel>&nbsp;</FormLabel>
                )}
                <Input {...ReserveCreateData('endTime')} placeholder="00:00" flex="1" minHeight="2.5rem"/>
              </Flex>
              <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Box borderWidth="1px" borderColor="bray.300" />

          <FormControl isInvalid={!!errors.guestNumber} id="guestNumber">
            <Flex direction={isMobile ? 'column' : 'row'}>
              <FormLabel w={isMobile ? "auto" : 40} m={isMobile ? "auto 2" : "auto 0"}>
              人数<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input
                w="full"
                type="number"
                defaultValue={0}
                {...ReserveCreateData('guestNumber', { valueAsNumber: true })}
                maxW={{ base: "100%", md: "5rem" }}
              />
              <FormErrorMessage>{errors.guestNumber?.message}</FormErrorMessage>
            </Flex>
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
