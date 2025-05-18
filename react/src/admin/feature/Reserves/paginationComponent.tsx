import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import { Pagination } from "@/types/Pagination";

type PaginationComponentProps = {
  pagination: Pagination;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};
export const PaginationComponent = ({
  pagination,
  setPage,
  limit,
  setLimit,
}: PaginationComponentProps) => {
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
