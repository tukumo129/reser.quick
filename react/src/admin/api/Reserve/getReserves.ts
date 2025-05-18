import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Pagination } from "@/types/Pagination";
import { Reserve } from "@/types/Reserve";

export type GetReservesData = {
  reserves: Reserve[];
  pagination: Pagination;
};

const defaultPagination: Pagination = {
  total: 10,
  last_page: 1,
  page: 1,
};

type GetReservesParams = {
  criteria?: {
    status?: string;
  };
  period_criteria?: {
    start_date_time?: string;
    end_date_time?: string;
  };
  search_key?: string;
  sorts?: string;
  page?: string;
  limit?: string;
};

export const useGetReserves = (params?: GetReservesParams) => {
  const { data, isLoading, error } = useQuery<GetReservesData, Error>(
    [ApiPath.RESERVES, params],
    () => callGet(ApiPath.RESERVES, params),
  );
  return {
    reserves: data?.reserves || [],
    pagination: data?.pagination || defaultPagination,
    isLoading,
    error,
  };
};
