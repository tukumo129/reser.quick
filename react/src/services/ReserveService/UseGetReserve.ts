import { useQuery } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";
import { Reserve } from "../../types/Reserve";

export type GetReserveData = {
  reserve: Reserve;
};

const defaultValues = {
  id: 0,
  contract_id: 0,
  name: '',
  guest_number: 0,
  start_date_time: '',
  end_date_time: '',
  uuid: '',
}

export const useGetReserve = (reserveId: number) => {
  const path = ApiPath.RESERVE.replace(':reserveId', reserveId.toString())
  const { data, isLoading, error } = useQuery<GetReserveData, Error>(
    [ApiPath.RESERVE, reserveId], () => callGet(path));
  return {
    reserve: data?.reserve || defaultValues,
    isLoading,
    error,
  };
};
