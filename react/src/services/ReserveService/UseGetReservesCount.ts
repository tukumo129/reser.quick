import { useQuery } from "react-query";
import { callGet } from "../ApiCallBase";
import { ApiPath } from "../ApiPath";

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

type useGetReservesCountProps = {
  date_time: string;
};

export const useGetReservesCount = (params?: useGetReservesCountProps) => {
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
