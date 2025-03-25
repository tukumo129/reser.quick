import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useGetReserves } from "../../services/ReserveService/UseGetReserves";
import { LoadingSpinner } from "../LoadingSpinnerComponent";
import { routePath } from "../../enums/routePath";
import { PaginationContainer, ReserveList } from "../../container/Reserves/ReservesContainer";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

// TODO #24 検索機能実装
export const ReservesContents = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { reserves, pagination, isLoading, error } = useGetReserves({ page: String(page), limit: String(limit) });
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error reserves</div>

  return (
    <>
      <Flex gap={2} align="center">
        <Input
          placeholder="検索"
          borderWidth="1px"
          bg="white"
          p={3}
          flex={1}
          borderRadius="full"
          boxShadow="sm"
          _focus={{ borderColor: "blue.400", boxShadow: "0 0 5px rgba(0, 122, 255, 0.5)" }}
        />
        <Button
          colorScheme="blue"
          borderRadius="full"
          px={4}
          py={3}
          boxShadow="md"
          leftIcon={<SearchIcon />}
        >
          検索
        </Button>
      </Flex>

      <Button
        onClick={() => navigate(routePath.ReserveCreate)}
        leftIcon={<AddIcon />}
        colorScheme="blue"
        size="lg"
        px={6}
        py={4}
        mt={4}
        mb={4}
        borderRadius="full"
        boxShadow="lg"
        _hover={{ bg: "blue.600" }}
      >
        新規登録
      </Button>
      <Box>
        <ReserveList reserves={reserves} />
        <div className="mt-4">
          <PaginationContainer pagination={pagination} setPage={setPage} limit={limit} setLimit={setLimit} />
        </div>
      </Box>
    </>
  )
};
