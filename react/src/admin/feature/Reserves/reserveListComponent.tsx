import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateReserveStatusForm } from "./updateReserveStatusFormContainer";
import { reserveStatus } from "@/enums/reserveStatus";
import { routePath } from "@/enums/routePath";
import { Reserve } from "@/types/Reserve";

type ReserveListComponentProps = {
  reserves: Reserve[];
};

export const ReserveListComponent = ({
  reserves,
}: ReserveListComponentProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {},
  );
  const handleCheck = (id: number, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  useEffect(() => {
    setCheckedItems(() => {
      return reserves.reduce(
        (acc, reserve) => {
          if (reserve.status === reserveStatus.Complete) {
            acc[reserve.id] = true;
          }
          return acc;
        },
        {} as { [key: number]: boolean },
      );
    });
  }, [reserves]);

  const { onSubmit, isLoading } = useUpdateReserveStatusForm();

  return reserves.length === 0 ? (
    <Box
      bg="yellow.100"
      p={4}
      borderRadius="md"
      textAlign="center"
      role="alert"
    >
      <Text fontWeight="bold" color="gray.600">
        予約がありません
      </Text>
    </Box>
  ) : (
    <Box>
      <Grid templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={4}>
        {reserves.map((reserve) => {
          const isChecked = checkedItems[reserve.id] ?? false;
          return (
            <Box
              key={reserve.id}
              position="relative"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              bg={isChecked ? "gray.400" : "white"}
              borderColor="gray.300"
              boxShadow="md"
              _hover={{ boxShadow: "lg", borderColor: "blue.400" }}
            >
              <Flex align="center">
                <Checkbox
                  mr={3}
                  colorScheme="blue"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    handleCheck(reserve.id, e.target.checked);
                    onSubmit(reserve.id, e.target.checked);
                  }}
                  isChecked={isChecked}
                  isDisabled={isLoading}
                />

                <Stack
                  spacing={2}
                  flex="1"
                  cursor="pointer"
                  onClick={() =>
                    navigate(
                      routePath.ReserveDetail.replace(
                        ":reserveId",
                        String(reserve.id),
                      ),
                    )
                  }
                >
                  <Text fontWeight="bold" fontSize="lg">
                    予約番号: {reserve.reserveId}
                  </Text>
                  <Text fontSize="md">名前: {reserve.name}</Text>
                  <Text fontSize="md">人数: {reserve.guestNumber} 人</Text>
                  <Text fontSize="sm" color="gray.600">
                    予約時間:{" "}
                    {format(
                      new Date(reserve.startDateTime),
                      "yyyy/MM/dd HH:mm",
                    )}{" "}
                    ～{" "}
                    {format(new Date(reserve.endDateTime), "yyyy/MM/dd HH:mm")}
                  </Text>
                </Stack>
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
