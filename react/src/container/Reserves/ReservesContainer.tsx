import { format } from "date-fns";
import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  Button,
  Select,
  Stack,
  Checkbox,
  Grid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Reserve } from "../../types/Reserve";
import { routePath } from "../../enums/routePath";
import { Pagination } from "../../types/Pagination";
import { useReserveUpdateStatusForm } from "./ReserveUpdateStatusFormContainer";
import { reserveStatus } from "../../enums/reserveStatus";
import { useEffect, useState } from "react";

type ReserveListProps = {
  reserves: Reserve[];
};

export const ReserveList = ({ reserves }: ReserveListProps) => {
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

  const { onSubmit } = useReserveUpdateStatusForm();

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

type PaginationContainerProps = {
  pagination: Pagination;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};
export const PaginationContainer = ({
  pagination,
  setPage,
  limit,
  setLimit,
}: PaginationContainerProps) => {
  const pageNumbers = [];
  pageNumbers.push(1);

  if (pagination.last_page > 1) {
    if (pagination.page > 4) {
      pageNumbers.push("...");
    }

    const startPage = Math.max(2, pagination.page - 2);
    const endPage = Math.min(pagination.last_page - 1, pagination.page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (pagination.page + 2 < pagination.last_page - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(pagination.last_page);
  }

  return (
    <Flex direction="row" align="center" justify="space-between" mt={6} px={4}>
      <Box flex="1" />
      <Flex direction="row" align="center" justify="center" flex="1" gap={2}>
        <Button
          onClick={() => setPage(pagination.page - 1)}
          colorScheme="blue"
          isDisabled={pagination.page === 1}
          borderRadius="full"
          variant="ghost"
          size="sm"
          _hover={{ bg: "blue.100" }}
        >
          &lt;
        </Button>

        {pageNumbers.map((number, index) =>
          typeof number === "number" ? (
            <Button
              key={index}
              onClick={() => setPage(number)}
              colorScheme={number === pagination.page ? "blue" : "gray"}
              bg={number === pagination.page ? "blue.400" : "gray.100"}
              color={number === pagination.page ? "white" : "black"}
              isDisabled={number === pagination.page}
              borderRadius="full"
              variant={number === pagination.page ? "solid" : "ghost"}
              size="sm"
              px={4}
              boxShadow={number === pagination.page ? "md" : "none"}
              _hover={{
                bg: number === pagination.page ? "blue.500" : "gray.200",
              }}
            >
              {number}
            </Button>
          ) : (
            <Text
              key={index}
              px={2}
              py={1}
              borderRadius="full"
              color="gray.500"
              fontSize="sm"
            >
              {number}
            </Text>
          ),
        )}

        <Button
          onClick={() => setPage(pagination.page + 1)}
          isDisabled={pagination.page === pagination.last_page}
          colorScheme="blue"
          borderRadius="full"
          variant="ghost"
          size="sm"
          _hover={{ bg: "blue.100" }}
        >
          &gt;
        </Button>
      </Flex>
      <Box flex="1" />

      <Select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
        borderRadius="full"
        borderColor="gray.300"
        bg="white"
        size="sm"
        fontWeight="semibold"
        boxShadow="sm"
        _focus={{
          borderColor: "blue.400",
          boxShadow: "0 0 5px rgba(0, 122, 255, 0.5)",
        }}
        w="auto"
        minW="80px"
      >
        <option value={10}>10件</option>
        <option value={50}>50件</option>
        <option value={100}>100件</option>
      </Select>
    </Flex>
  );
};
