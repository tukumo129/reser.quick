import { useQuery } from "react-query";
import { callGet } from "@/api/ApiCallBase";
import { ApiPath } from "@/enums/ApiPath";

export type GetReservesCountData = {
  reservesCount: {
    dailyReserveCountPerHour: {
      dateTime: string;
      count: number;
    }[];
    weeklyReserveCountPerDay: {
      dateTime: string;
      count: number;
    }[];
    monthlyReserveCountPerDay: {
      dateTime: string;
      count: number;
    }[];
  };
};

type GetReservesCountParams = {
  date_time: string;
};

export const useGetReservesCount = (params?: GetReservesCountParams) => {
  const { data, isLoading, error } = useQuery<GetReservesCountData, Error>(
    [ApiPath.RESERVES_COUNT, params],
    () => callGet(ApiPath.RESERVES_COUNT, params),
  );
  return {
    dailyReserveCountPerHour:
      data?.reservesCount.dailyReserveCountPerHour || [],
    weeklyReserveCountPerDay:
      data?.reservesCount.weeklyReserveCountPerDay || [],
    monthlyReserveCountPerDay:
      data?.reservesCount.monthlyReserveCountPerDay || [],
    isLoading,
    error,
  };
};
