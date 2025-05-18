import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type GetReserveAvailableTimesParams = {
  date: string;
};

export type GetReserveAvailableTimesData = {
  availableTimes: {
    date: string;
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
};

export const useGetReserveAvailableTimes = (
  uuid: string,
  params: GetReserveAvailableTimesParams,
) => {
  const path = ApiPath.APP_RESERVE_TIMES.replace(":uuid", uuid.toString());

  const { data, isLoading, error } = useQuery<
    GetReserveAvailableTimesData,
    Error
  >([ApiPath.APP_RESERVE_TIMES, uuid, params], () => callGet(path, params));
  return {
    availableTimes: data?.availableTimes || [],
    isLoading,
    error,
  };
};
