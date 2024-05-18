import { useMutation } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";
import { Pagination } from "../../types/Pagination";

export type GetReservesData = {
  reserves: Reserve[];
  pagination: Pagination;
};

export const useGetReserves = () => {
  return useMutation<GetReservesData, Error>(() => callGet(ApiPath.RESERVES));
};
