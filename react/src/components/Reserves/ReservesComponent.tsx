import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useGetReserves } from "../../services/ReserveService/UseGetReserves";
import { LoadingSpinner } from "../LoadingSpinnerComponent";
import { routePath } from "../../enums/routePath";
import { PaginationContainer, ReserveList } from "../../container/Reserves/ReservesContainer";

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
      <div className="flex">
        <input
          type="text"
          placeholder="検索"
          className="border border-borderColor p-2 w-full"
        />
        <button className="bg-subMain text-fontBase border border-borderColor ml-2 w-16"> 
          検索
        </button>
      </div>
      <button onClick={() => navigate(routePath.ReserveCreate)} className="flex items-center border bg-subMain border-borderColor p-2 my-4">
        <span className="mr-2">＋</span>
            新規登録
      </button>
      <Box>
        <ReserveList reserves={reserves}/>
        <div className="mt-4">
          <PaginationContainer pagination={pagination} setPage={setPage} limit={limit} setLimit={setLimit}/>
        </div>
      </Box>
    </>
  )
};
