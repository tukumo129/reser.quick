import { useQuery } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

type GetReserveSetting = {
  reserveSetting: GetReserveSettingData
}

export type GetReserveSettingData = {
  maxConcurrentReserve: number | undefined,
  reserveSlotTime: string,
  defaultStayTime: string,
  maxReserveNumber: number | undefined,
  reserveMonthsLimit: number | undefined,
}

const defaultValues = {
  maxConcurrentReserve: undefined,
  reserveSlotTime: '00:30',
  defaultStayTime: '01:00',
  maxReserveNumber: undefined,
  reserveMonthsLimit: undefined,
}

export const useGetReserveSetting = () => {
  const { data, isLoading, error } = useQuery<GetReserveSetting, Error>(
    [ApiPath.RESERVE_SETTING], () => callGet(ApiPath.RESERVE_SETTING));
  return {
    reserveSetting: data?.reserveSetting || defaultValues,
    isLoading,
    error,
  };
};
