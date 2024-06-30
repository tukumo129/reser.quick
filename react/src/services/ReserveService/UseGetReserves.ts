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
  total: 10,
  last_page: 20,
  page: 10,
};

type useGetReservesProps = {
  sorts?: string;
  page?: string;
  limit?: string;  
}

export const useGetReserves = (params?: useGetReservesProps) => {
  const { data, isLoading, error } = useQuery<GetReservesData, Error>(
    [ApiPath.RESERVES, params], () => callGet(ApiPath.RESERVES, params));
  return {
    reserves: data?.reserves || [],
    pagination: data?.pagination || defaultPagination,
    isLoading,
    error,
  };
};
