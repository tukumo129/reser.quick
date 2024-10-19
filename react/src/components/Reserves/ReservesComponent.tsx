import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useGetReserves } from "../../services/ReserveService/UseGetReserves";
import { LoadingSpinner } from "../LoadingSpinnerComponent";
import { routePath } from "../../enums/routePath";
import { PaginationContainer, ReserveList } from "../../container/Reserves/ReservesContainer";
import { AddIcon } from "@chakra-ui/icons";

// TODO #24 検索機能実装
export const ReservesContents = (  ) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { reserves, pagination,isLoading, error } = useGetReserves({page: String(page), limit:String(limit)});
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner/>
  if (error) return <div>Error reserves</div>

  return (
    <>
      <Flex>
        <Input
          placeholder="検索"
          borderWidth="1px"
          bg="white"
          p={2}
          flex={1}
        />
        <Button
          colorScheme="blue"
          borderWidth="1px"
          ml={2}
          w="64px"
        >
          検索
        </Button>
      </Flex>
      <Button
        onClick={() => navigate(routePath.ReserveCreate)}
        leftIcon={<AddIcon />}
        colorScheme="blue"
        p={2}
        mt={4}
        mb={4}
        display="flex"
        alignItems="center"
      >
        新規登録
      </Button>
      <Box>
        <ReserveList reserves={reserves}/>
        <div className="mt-4">
          <PaginationContainer pagination={pagination} setPage={setPage} limit={limit} setLimit={setLimit}/>
        </div>
      </Box>
    </>
  )
};
