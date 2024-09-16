import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useReserveUpdateForm } from "../../container/Reserves/ReserveUpdateFormContainer";
import { routePath } from "../../enums/routePath";

export type ReserveFormProps = {
  reserve: {
    id: number
    name: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    guestNumber: number,
  }
}

export function UpdateReserveForm({reserve}: ReserveFormProps) {
  const navigate = useNavigate()
  const { ReserveUpdateData, handleSubmit, onSubmit , errors} = useReserveUpdateForm(reserve.id);

  return (
    <Box p={{base: 4, md: 8}} mx="right" bg="white">
      <form onSubmit={handleSubmit(onSubmit)} id="createReserveForm">
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name} id="name">
            <FormLabel>
              名前<Text as="span" color="red">*</Text>
            </FormLabel>
            <Input
              defaultValue={reserve.name}
              {...ReserveUpdateData('name')}
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
              <Input type="date" {...ReserveUpdateData('startDate')} defaultValue={reserve.startDate}/>
              <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.startTime} id="startTime"  w={{ base: "100%", md: "9rem" }}>
              <FormLabel visibility={{ base: "hidden", md: "visible" }}>
                開始時刻<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input {...ReserveUpdateData('startTime')} defaultValue={reserve.startTime} placeholder="00:00"/>
              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>
          </HStack>

          <Box borderWidth="1px" borderColor="bray.300" />

          <HStack spacing={4} align="start">
            <FormControl isInvalid={!!errors.endDate} id="endDate" w={{ base: "100%", md: "10rem" }}>
              <FormLabel>
                終了日時<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input type="date" {...ReserveUpdateData('endDate')} defaultValue={reserve.endDate}/>
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.endTime} id="endTime" w={{ base: "100%", md: "9rem" }}>
              <FormLabel visibility={{ base: "hidden", md: "visible" }}>
                終了時刻<Text as="span" color="red">*</Text>
              </FormLabel>
              <Input {...ReserveUpdateData('endTime')} defaultValue={reserve.endTime} placeholder="00:00" />
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
              defaultValue={reserve.guestNumber}
              {...ReserveUpdateData('guestNumber')}
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
