import { useQuery } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";
import { Pagination } from "../../types/Pagination";

export type GetReservesData = {
  reserves: Reserve[];
  pagination: Pagination;
};

const defaultPagination: Pagination = {
  total: 1000,
  last_page: 20,
  current_page: 10,
};

export const useGetReserves = () => {
  const { data, isLoading, error } = useQuery<GetReservesData, Error>('reserves', () => callGet(ApiPath.RESERVES));
  return {
    reserves: data?.reserves || [],
    pagination: data?.pagination || defaultPagination,
    isLoading,
    error,
  };
};