import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayoutComponent } from "../AdminLayout/adminLayoutComponent";
import { ErrorComponent } from "../ErrorPage/errorComponent";
import { PaginationComponent } from "./paginationComponent";
import { useDeleteReserveOptionMutation } from "@/admin/api/ReserveOption/deleteReserveOption";
import { useGetReserveOptions } from "@/admin/api/ReserveOption/getReserveOptions";
import { ReserveOptionListComponent } from "@/admin/feature/ReserveOptions/reserveOptionListComponent";
import { routePath } from "@/enums/routePath";
import { LoadingSpinner } from "@/feature/LoadingSpinner/loadingSpinnerComponent";

export const ReserveOptionsComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchKey, setSearchKey] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const { reserveOptions, pagination, isLoading, error } = useGetReserveOptions(
    {
      page: String(page),
      limit: String(limit),
      search_key: searchKey,
    },
  );
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorComponent />;

  return (
    <AdminLayoutComponent pageName={"予約オプション一覧"}>
      <Flex gap={2} align="center">
        <Input
          placeholder="検索"
          borderWidth="1px"
          bg="white"
          p={3}
          flex={1}
          borderRadius="full"
          boxShadow="sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          _focus={{
            borderColor: "blue.400",
            boxShadow: "0 0 5px rgba(0, 122, 255, 0.5)",
          }}
        />
        <Button
          colorScheme="blue"
          borderRadius="full"
          px={4}
          py={3}
          boxShadow="md"
          leftIcon={<SearchIcon />}
          onClick={() => {
            setSearchKey(inputValue);
          }}
        >
          検索
        </Button>
      </Flex>

      <Flex justify="space-between" align="center">
        <Button
          onClick={() => navigate(routePath.ReserveOptionCreate)}
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
      </Flex>
      <Box>
        <ReserveOptionListComponent
          reserveOptions={reserveOptions}
          key={reserveOptions.length}
        />
        <div className="mt-4">
          <PaginationComponent
            pagination={pagination}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
          />
        </div>
      </Box>
    </AdminLayoutComponent>
  );
};

export const useReserveUpdateStatusForm = () => {
  const { mutate, isLoading } = useDeleteReserveOptionMutation();
  const toast = useToast();

  const onSubmit = (reserveOptionId: number) => {
    const params = {
      reserveOptionId: reserveOptionId,
    };
    mutate(params, {
      onSuccess: () => {
        toast({
          title: "削除しました",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
      onError: () => {
        toast({
          title: "削除に失敗しました",
          description: "予期しないエラーが発生しました",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return { onSubmit, isLoading };
};
