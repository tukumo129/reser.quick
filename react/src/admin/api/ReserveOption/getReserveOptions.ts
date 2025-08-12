import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";
import { Pagination } from "@/types/Pagination";
import { ReserveOption } from "@/types/ReserveOption";

export type GetReserveOptionsData = {
  reserveOptions: ReserveOption[];
  pagination: Pagination;
};

const defaultPagination: Pagination = {
  total: 10,
  last_page: 1,
  page: 1,
};

type GetReserveOptionsParams = {
  search_key?: string;
  sorts?: string;
  page?: string;
  limit?: string;
};

export const useGetReserveOptions = (params?: GetReserveOptionsParams) => {
  const { data, isLoading, error } = useQuery<GetReserveOptionsData, Error>(
    [ApiPath.RESERVE_OPTIONS, params],
    () => callGet(ApiPath.RESERVE_OPTIONS, params),
  );
  return {
    reserveOptions: data?.reserveOptions || [],
    pagination: data?.pagination || defaultPagination,
    isLoading,
    error,
  };
};
